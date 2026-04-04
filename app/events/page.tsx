import connectToDatabase from '@/lib/db';
import Event from '@/lib/models/Event';
import { auth } from '@/auth';
import EventsClient from './components/EventsClient';
import User from '@/lib/models/User';

export const dynamic = 'force-dynamic'; // Ensure fresh data on every request

export default async function EventsPage() {
    await connectToDatabase();
    const session = await auth();

    // We need the user's ObjectId to check participation
    let sessionUserObjectId: string | null = null;
    if (session?.user?.email) {
        const user = await User.findOne({ email: session.user.email });
        if (user) {
            sessionUserObjectId = user._id.toString();
        }
    }

    // Fetch all events sorted by date ascending
    const dbEvents = await Event.find({}).sort({ date: 1 }).lean();

    const allEvents = dbEvents.map(e => ({
        ...e,
        _id: e._id.toString(),
        participants: e.participants?.map((p: any) => p.toString()) || []
    }));

    const now = new Date();

    // Categorize events
    const upcomingEvents = allEvents.filter(event => new Date(event.endDate || event.date) >= now);
    // For past events, we might want them sorted descending (newest past event first)
    const pastEvents = allEvents.filter(event => new Date(event.date) < now).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <EventsClient
            upcomingEvents={upcomingEvents}
            pastEvents={pastEvents}
            sessionUserObjectId={sessionUserObjectId}
            sessionExists={!!session}
        />
    );
}
