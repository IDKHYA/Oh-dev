import fs from 'fs';
import path from 'path';

const ROOT_PATH = path.join(process.cwd(), 'react_contents');

// 초기 디렉토리 생성
if (!fs.existsSync(ROOT_PATH)) {
    fs.mkdirSync(ROOT_PATH, { recursive: true });
}

export async function getContentsByFolder(folder = '') {
    const targetPath = path.join(ROOT_PATH, folder);
    if (!fs.existsSync(targetPath)) return [];

    const items = fs.readdirSync(targetPath, { withFileTypes: true });
    const contents = [];

    for (const item of items) {
        if (item.isDirectory()) {
            const metadataPath = path.join(targetPath, item.name, 'metadata.json');
            if (fs.existsSync(metadataPath)) {
                try {
                    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
                    contents.push({
                        id: item.name,
                        folder: folder,
                        ...metadata
                    });
                } catch (e) {
                    console.error(`Failed to parse metadata for ${item.name}`, e);
                }
            } else {
                // 폴더 자체가 아티스트나 카테고리일 수 있음 (재귀적으로 하위 탐색 가능하지만 일단 1단계만)
                // 하위 폴더가 있다는 것만 표시
                contents.push({
                    id: item.name,
                    isFolder: true,
                    folder: folder
                });
            }
        }
    }
    return contents;
}

export async function getAllFolders() {
    if (!fs.existsSync(ROOT_PATH)) return [];
    const items = fs.readdirSync(ROOT_PATH, { withFileTypes: true });
    return items
        .filter(item => item.isDirectory())
        .map(item => item.name)
        .sort((a, b) => a.localeCompare(b, 'ko'));
}

export async function renameFolder(oldName, newName) {
    const oldPath = path.join(ROOT_PATH, oldName);
    const newPath = path.join(ROOT_PATH, newName);
    if (!fs.existsSync(oldPath)) throw new Error('Source folder not found');
    if (fs.existsSync(newPath)) throw new Error('Target folder already exists');
    
    fs.renameSync(oldPath, newPath);
    return { oldName, newName };
}

export async function deleteFolder(folderName) {
    const targetPath = path.join(ROOT_PATH, folderName);
    if (!fs.existsSync(targetPath)) throw new Error('Folder not found');
    
    fs.rmSync(targetPath, { recursive: true, force: true });
    return { success: true };
}

export async function moveContent(id, fromFolder, toFolder) {
    const oldPath = path.join(ROOT_PATH, fromFolder || 'default', id);
    const newParentPath = path.join(ROOT_PATH, toFolder || 'default');
    const newPath = path.join(newParentPath, id);

    if (!fs.existsSync(oldPath)) throw new Error('Source content not found');
    if (!fs.existsSync(newParentPath)) {
        fs.mkdirSync(newParentPath, { recursive: true });
    }
    if (fs.existsSync(newPath)) throw new Error('Target already exists in destination folder');

    fs.renameSync(oldPath, newPath);
    return { id, fromFolder, toFolder };
}

export async function saveContent(folder, title, description, code) {
    const folderPath = path.join(ROOT_PATH, folder || 'default');
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const contentId = `content_${Date.now()}`;
    const itemPath = path.join(folderPath, contentId);
    fs.mkdirSync(itemPath, { recursive: true });

    const metadata = {
        title,
        description,
        createdAt: new Date().toISOString(),
        size: Buffer.byteLength(code, 'utf8'),
    };

    fs.writeFileSync(path.join(itemPath, 'metadata.json'), JSON.stringify(metadata, null, 2));
    fs.writeFileSync(path.join(itemPath, 'content.jsx'), code);

    return { id: contentId, ...metadata };
}

export async function getContentById(folder, id) {
    const itemPath = path.join(ROOT_PATH, folder || 'default', id);
    if (!fs.existsSync(itemPath)) return null;

    const metadata = JSON.parse(fs.readFileSync(path.join(itemPath, 'metadata.json'), 'utf8'));
    const code = fs.readFileSync(path.join(itemPath, 'content.jsx'), 'utf8');

    return { id, folder, ...metadata, code };
}

export async function updateContent(folder, id, code, title, description) {
    const itemPath = path.join(ROOT_PATH, folder || 'default', id);
    if (!fs.existsSync(itemPath)) throw new Error('Content not found');

    const metadataPath = path.join(itemPath, 'metadata.json');
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

    // 업데이트할 내용 반영
    if (title) metadata.title = title;
    if (description) metadata.description = description;
    metadata.updatedAt = new Date().toISOString();
    metadata.size = Buffer.byteLength(code, 'utf8');

    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    fs.writeFileSync(path.join(itemPath, 'content.jsx'), code);

    return { id, ...metadata, code };
}

export async function createDirectFolder(folder) {
    const folderPath = path.join(ROOT_PATH, folder);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        return { success: true, folder };
    }
    return { success: false, message: 'Folder already exists' };
}
