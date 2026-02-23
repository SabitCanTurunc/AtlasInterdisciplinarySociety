import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Event from '@/lib/models/Event';

export async function GET() {
    try {
        await connectToDatabase();
        const events = await Event.find({}).sort({ date: 1 }); // Sort chronologically (oldest first, or customize based on UI needs)

        return NextResponse.json({ events }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ message: 'Etkinlikler getirilirken hata oluştu.' }, { status: 500 });
    }
}
