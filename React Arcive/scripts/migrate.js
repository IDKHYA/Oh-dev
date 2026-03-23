import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const ROOT_PATH = path.join(process.cwd(), 'react_contents');
const DB_PATH = path.join(process.cwd(), 'react-archive.db');

async function migrate() {
    console.log('🚀 마이그레이션을 시작합니다...');
    
    if (!fs.existsSync(ROOT_PATH)) {
        console.log('❌ react_contents 폴더를 찾을 수 없습니다.');
        return;
    }

    const db = new Database(DB_PATH);
    
    const insert = db.prepare(`
        INSERT OR REPLACE INTO contents (id, title, summary, description, code, folder_name, size, created_at, updated_at)
        VALUES (@id, @title, @summary, @description, @code, @folder_name, @size, @created_at, @updated_at)
    `);

    const folders = fs.readdirSync(ROOT_PATH, { withFileTypes: true })
        .filter(item => item.isDirectory())
        .map(item => item.name);

    let count = 0;

    for (const folder of folders) {
        const folderPath = path.join(ROOT_PATH, folder);
        const contents = fs.readdirSync(folderPath, { withFileTypes: true })
            .filter(item => item.isDirectory() && item.name.startsWith('content_'));

        for (const contentItem of contents) {
            const itemPath = path.join(folderPath, contentItem.name);
            const metadataPath = path.join(itemPath, 'metadata.json');
            const codePath = path.join(itemPath, 'content.jsx');

            if (fs.existsSync(metadataPath) && fs.existsSync(codePath)) {
                try {
                    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
                    const code = fs.readFileSync(codePath, 'utf8');

                    insert.run({
                        id: contentItem.name,
                        title: metadata.title || 'Untitled',
                        summary: metadata.summary || metadata.description || '',
                        description: metadata.description || metadata.summary || '',
                        code: code,
                        folder_name: folder,
                        size: metadata.size || Buffer.byteLength(code, 'utf8'),
                        created_at: metadata.createdAt || metadata.created_at || new Date().toISOString(),
                        updated_at: metadata.updatedAt || metadata.updated_at || metadata.createdAt || new Date().toISOString()
                    });

                    count++;
                } catch (e) {
                    console.error(`❌ ${contentItem.name} 마이그레이션 실패:`, e.message);
                }
            }
        }
    }

    console.log(`✅ 마이그레이션 완료! 총 ${count}개의 콘텐츠가 DB로 이전되었습니다.`);
    db.close();
}

migrate();
