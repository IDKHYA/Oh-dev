import { NextResponse } from 'next/server';
import { getRecentContents } from '@/lib/file-system';

export async function GET() {
    try {
        const contents = await getRecentContents(10);
        return NextResponse.json(contents);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
