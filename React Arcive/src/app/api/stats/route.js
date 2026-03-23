import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const stats = db.prepare(`
            SELECT 
                (SELECT COUNT(*) FROM contents) as totalContents,
                (SELECT COUNT(DISTINCT folder_name) FROM contents) as totalFolders
        `).get();
        
        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
