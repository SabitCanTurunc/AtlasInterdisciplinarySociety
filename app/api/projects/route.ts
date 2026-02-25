import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Project from '@/lib/models/Project';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectToDatabase();

        // Fetch projects sorted by creation date (newest first)
        const projects = await Project.find({}).sort({ createdAt: -1 }).lean();

        // Ensure featured project is at the top of the combined array if logic demands it,
        // however sorting on frontend is already handling the separation of featured and secondary.
        return NextResponse.json({ status: 'success', projects }, { status: 200 });
    } catch (error: any) {
        console.error('Projects fetch error:', error);
        return NextResponse.json({ message: 'Projeler yüklenemedi', error: error.message }, { status: 500 });
    }
}
