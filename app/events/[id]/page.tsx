import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/db';
import Event from '@/lib/models/Event';
import User from '@/lib/models/User';
import { auth } from '@/auth';
import EventDetailClient from './EventDetailClient';


export const dynamic = 'force-dynamic';

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    await connectToDatabase();
    const session = await auth();

    let sessionUserObjectId: string | null = null;
    if (session?.user?.email) {
        const user = await User.findOne({ email: session.user.email });
        if (user) {
            sessionUserObjectId = user._id.toString();
        }
    }

    let event = null;
    try {
        const dbEvent = await Event.findById(id).lean();
        if (dbEvent) {
            // Use JSON parsing to safely strip out deep Mongoose ObjectIDs (like in speakers array)
            event = JSON.parse(JSON.stringify({
                ...dbEvent,
                _id: dbEvent._id.toString(),
                participants: dbEvent.participants?.map((p: any) => p.toString()) || [],
                speakers: dbEvent.speakers || []
            }));
        }
    } catch (error) {
        console.error("Invalid Event ID:", error);
    }

    if (!event) {
        notFound();
    }

    return (
        <EventDetailClient
            event={event as any}
            sessionUserObjectId={sessionUserObjectId}
            sessionExists={!!session}
        />
    );
}
