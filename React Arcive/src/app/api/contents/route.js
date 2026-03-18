import { NextResponse } from 'next/server';
import { getContentsByFolder, saveContent } from '@/lib/file-system';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || '';
    
    try {
        const contents = await getContentsByFolder(folder);
        return NextResponse.json(contents);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { folder, title, description, code } = await request.json();
        const newContent = await saveContent(folder, title, description, code);
        return NextResponse.json(newContent);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
