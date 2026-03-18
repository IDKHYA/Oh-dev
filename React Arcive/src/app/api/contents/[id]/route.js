import { NextResponse } from 'next/server';
import { getContentById } from '@/lib/file-system';

export async function GET(request, { params }) {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'default';

    try {
        const content = await getContentById(folder, id);
        if (!content) {
            return NextResponse.json({ error: 'Content not found' }, { status: 404 });
        }
        return NextResponse.json(content);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
