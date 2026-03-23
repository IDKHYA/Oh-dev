import { NextResponse } from 'next/server';
import { getContentById, updateContent, moveContent, deleteContent } from '@/lib/file-system';

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

export async function PUT(request, { params }) {
    const { id } = params;
    try {
        const { folder, code, title, description, toFolder } = await request.json();
        
        // 폴더 이동이 필요한 경우
        if (toFolder && toFolder !== folder) {
            await moveContent(id, folder, toFolder);
            
            // 추가 정보(코드, 제목 등)도 같이 업데이트해야 하는 경우
            if (code || title || description) {
                const updated = await updateContent(toFolder, id, code, title, description);
                return NextResponse.json(updated);
            }
            
            return NextResponse.json({ success: true, id, fromFolder: folder, toFolder });
        }

        // 일반 업데이트 (메타데이터 또는 코드)
        const updateData = { title, description };
        if (code !== undefined) updateData.code = code;

        const updated = await updateContent(folder, id, updateData.code, updateData.title, updateData.description);
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;
    try {
        await deleteContent(id);
        return NextResponse.json({ success: true, id });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
