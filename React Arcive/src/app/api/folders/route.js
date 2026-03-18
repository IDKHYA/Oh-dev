import { NextResponse } from 'next/server';
import { getAllFolders } from '@/lib/file-system';

export async function GET() {
    try {
        const folders = await getAllFolders();
        return NextResponse.json(folders);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
