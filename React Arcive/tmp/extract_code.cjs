const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join('c:', 'Users', 'dheod', 'Downloads', 'dev', 'React Arcive', 'react-archive.db');
const db = new Database(dbPath);

const row = db.prepare('SELECT code FROM contents WHERE id = ?').get('content_1774035491925');

if (row) {
    fs.writeFileSync(path.join('c:', 'Users', 'dheod', 'Downloads', 'dev', 'React Arcive', 'tmp', 'content_debug.jsx'), row.code);
    console.log('Code extracted to tmp/content_debug.jsx');
} else {
    // If not found, let's just dump ALL IDs to see what exists
    const rows = db.prepare('SELECT id FROM contents').all();
    console.log('Content not found. Available IDs:');
    rows.forEach(r => console.log(r.id));
}
db.close();
