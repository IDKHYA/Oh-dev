import { NextResponse } from 'next/server';
import { getAllFolders, createDirectFolder } from '@/lib/file-system';

export async function GET() {
    try {
        const folders = await getAllFolders();
        return NextResponse.json(folders);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { folder } = await request.json();
        const result = await createDirectFolder(folder);
        if (result.success) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json({ error: result.message }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
