import fs from 'fs';
import path from 'path';
import db from './db';

const ROOT_PATH = path.join(process.cwd(), 'react_contents');

// 초기 디렉토리 생성 (백업/호환성 용도)
if (!fs.existsSync(ROOT_PATH)) {
    fs.mkdirSync(ROOT_PATH, { recursive: true });
}

export async function getContentsByFolder(folder = '') {
    const safeFolder = folder || 'default';
    const rows = db.prepare('SELECT * FROM contents WHERE folder_name = ? ORDER BY updated_at DESC').all(safeFolder);
    
    return rows.map(row => ({
        id: row.id,
        folder: row.folder_name,
        title: row.title,
        summary: row.summary,
        description: row.description,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        size: row.size
    }));
}

export async function getAllFolders() {
    const rows = db.prepare('SELECT DISTINCT folder_name FROM contents').all();
    const dbFolders = rows.map(row => row.folder_name);
    
    // 파일 시스템의 폴더와 병합 (마이그레이션 전 대비)
    const fsFolders = fs.readdirSync(ROOT_PATH, { withFileTypes: true })
        .filter(item => item.isDirectory())
        .map(item => item.name);
        
    const combined = Array.from(new Set([...dbFolders, ...fsFolders]));
    return combined.sort((a, b) => a.localeCompare(b, 'ko'));
}

export async function renameFolder(oldName, newName) {
    const update = db.prepare('UPDATE contents SET folder_name = ? WHERE folder_name = ?');
    update.run(newName, oldName);
    
    // 파일 시스템도 같이 변경 (호환성)
    const oldPath = path.join(ROOT_PATH, oldName);
    const newPath = path.join(ROOT_PATH, newName);
    if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
        fs.renameSync(oldPath, newPath);
    }
    
    return { oldName, newName };
}

export async function deleteFolder(folderName) {
    const del = db.prepare('DELETE FROM contents WHERE folder_name = ?');
    del.run(folderName);
    
    // 파일 시스템 삭제 (선택 사항이지만 README는 구조 정리를 원함)
    const targetPath = path.join(ROOT_PATH, folderName);
    if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true, force: true });
    }
    
    return { success: true };
}

export async function moveContent(id, fromFolder, toFolder) {
    const update = db.prepare('UPDATE contents SET folder_name = ? WHERE id = ?');
    update.run(toFolder || 'default', id);
    return { id, fromFolder, toFolder };
}

export async function saveContent(folder, title, description, code) {
    const contentId = `content_${Date.now()}`;
    const now = new Date().toISOString();
    const safeFolder = folder || 'default';
    const size = Buffer.byteLength(code, 'utf8');

    const insert = db.prepare(`
        INSERT INTO contents (id, title, summary, description, code, folder_name, size, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(contentId, title || 'Untitled', description || '', description || '', code, safeFolder, size, now, now);

    return { 
        id: contentId, 
        folder: safeFolder, 
        title, 
        summary: description, 
        description, 
        createdAt: now, 
        updatedAt: now, 
        size 
    };
}

export async function getContentById(folder, id) {
    const row = db.prepare('SELECT * FROM contents WHERE id = ?').get(id);
    if (!row) return null;

    return {
        id: row.id,
        folder: row.folder_name,
        title: row.title,
        summary: row.summary,
        description: row.description,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        size: row.size,
        code: row.code
    };
}

export async function updateContent(folder, id, code, title, description) {
    const now = new Date().toISOString();
    
    if (code !== undefined) {
        const size = Buffer.byteLength(code, 'utf8');
        db.prepare('UPDATE contents SET code = ?, size = ?, updated_at = ? WHERE id = ?')
          .run(code, size, now, id);
    }
    
    if (title !== undefined) {
        db.prepare('UPDATE contents SET title = ?, updated_at = ? WHERE id = ?')
          .run(title, now, id);
    }
    
    if (description !== undefined) {
        db.prepare('UPDATE contents SET description = ?, summary = ?, updated_at = ? WHERE id = ?')
          .run(description, description, now, id);
    }

    return getContentById(folder, id);
}

export async function deleteContent(id) {
    const del = db.prepare('DELETE FROM contents WHERE id = ?');
    del.run(id);
    return { success: true, id };
}

export async function createDirectFolder(folder) {
    // DB에는 폴더 테이블이 따로 없으므로 FS에만 생성하거나 더미 데이터 유도
    const folderPath = path.join(ROOT_PATH, folder);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
    return { success: true, folder };
}

export async function getRecentContents(limit = 10) {
    const rows = db.prepare('SELECT * FROM contents ORDER BY updated_at DESC LIMIT ?').all(limit);
    return rows.map(row => ({
        id: row.id,
        folder: row.folder_name,
        title: row.title,
        summary: row.summary,
        description: row.description,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        size: row.size
    }));
}
