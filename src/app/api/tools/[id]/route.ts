import { NextResponse } from 'next/server';
import data from '@/data/tools.json';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    // @ts-ignore
    const allTools = data.categories.flatMap((c) => c.tools);
    // @ts-ignore
    const tool = allTools.find((t) => t.id === id);

    if (tool) {
        return NextResponse.json(tool);
    }

    return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
}
