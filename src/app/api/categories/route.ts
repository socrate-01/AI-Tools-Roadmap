import { NextResponse } from 'next/server';
import data from '@/data/tools.json';

export async function GET() {
    // Return categories summary without tools list for lighter payload
    // @ts-ignore
    const categories = data.categories.map((c) => {
        const { tools, ...rest } = c;
        return { ...rest, toolCount: tools.length };
    });
    return NextResponse.json(categories);
}
