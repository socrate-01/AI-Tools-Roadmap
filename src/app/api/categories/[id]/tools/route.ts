import { NextResponse } from 'next/server';
import data from '@/data/tools.json';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    // @ts-ignore
    const category = data.categories.find(c => c.id === id);

    if (category) {
        return NextResponse.json(category.tools);
    }

    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
}
