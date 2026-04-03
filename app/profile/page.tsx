import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';
import Event from '@/lib/models/Event';
import ProfileClient from './ProfileClient';

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect('/login');
    }

    await connectToDatabase();

    const dbUser = await User.findOne({ email: session.user.email }).lean();

    if (!dbUser) {
        redirect('/login');
    }

    // Find events that this user has registered for
    const myEvents = await Event.find({
        requiresRegistration: true,
        participants: dbUser._id
    }).sort({ date: 1 }).lean();

    const formattedEvents = myEvents?.map((e: any) => ({
        _id: e._id.toString(),
        title: e.title,
        date: e.date ? new Date(e.date).toISOString() : new Date().toISOString(),
    })) || [];

    // Separate upcoming vs past for better display
    const now = new Date();
    const upcomingEvents = formattedEvents.filter((e: any) => new Date(e.date) >= now);
    const pastEvents = formattedEvents.filter((e: any) => new Date(e.date) < now);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-[#0a1628] text-white">
            <div className="container-custom max-w-6xl mx-auto">
                <ProfileClient
                    initialImage={dbUser.image}
                    initialPhoneNumber={dbUser.phoneNumber}
                    initialSchool={dbUser.school}
                    initialDepartment={dbUser.department}
                    name={dbUser.name}
                    email={dbUser.email}
                    role={dbUser.role}
                    createdAt={dbUser.createdAt?.toISOString() || new Date().toISOString()}
                    upcomingEvents={upcomingEvents}
                    pastEvents={pastEvents}
                />
            </div>
        </div>
    );
}
