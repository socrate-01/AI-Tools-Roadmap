import { NextResponse } from 'next/server';
import data from '@/data/tools.json';

export async function GET() {
    return NextResponse.json(data);
}
