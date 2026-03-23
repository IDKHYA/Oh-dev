const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.join(process.cwd(), 'react-archive.db');
const db = new Database(dbPath);

try {
    const row = db.prepare('SELECT code FROM contents WHERE id = ?').get('CONTENT_1774035491925');
    if (row) {
        console.log('--- CODE START ---');
        console.log(row.code);
        console.log('--- CODE END ---');
    } else {
        console.log('Content not found at ' + dbPath);
    }
} catch (error) {
    console.error(error);
} finally {
    db.close();
}
