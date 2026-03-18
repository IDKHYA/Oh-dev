import { NextResponse } from 'next/server';
import { renameFolder, deleteFolder } from '@/lib/file-system';

export async function PUT(request, { params }) {
    const { name } = params;
    try {
        const { newName } = await request.json();
        const result = await renameFolder(name, newName);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { name } = params;
    try {
        const result = await deleteFolder(name);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
