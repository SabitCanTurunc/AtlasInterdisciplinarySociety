import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';
import Image from 'next/image';
import Link from 'next/link';
import Event from '@/lib/models/Event';
import Project from '@/lib/models/Project';
import Gallery from '@/lib/models/Gallery';
import Publication from '@/lib/models/Publication';
import Sponsor from '@/lib/models/Sponsor';
import TeamMember from '@/lib/models/TeamMember';
import AdminClient from './components/AdminClient';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

export default async function AdminDashboard(props: Props) {
    const session = await auth();

    if (!session?.user || ((session.user as any).role !== 'admin' && (session.user as any).role !== 'super_admin')) {
        redirect('/');
    }

    const searchParams = await props.searchParams;
    const tabStr = searchParams.tab;
    const tab = Array.isArray(tabStr) ? tabStr[0] : (tabStr || 'users');

    await connectToDatabase();
    const dbUsers = await User.find({}).sort({ createdAt: -1 }).lean();
    const dbEvents = await Event.find({}).populate('participants', 'name email').sort({ date: 1 }).lean();
    const dbProjects = await Project.find({}).sort({ createdAt: -1 }).lean();
    const dbGallery = await Gallery.find({}).sort({ createdAt: -1 }).lean();
    const dbPublications = await Publication.find({}).sort({ createdAt: -1 }).lean();
    const dbSponsors = await Sponsor.find({}).sort({ createdAt: -1 }).lean();
    const dbTeamMembers = await TeamMember.find({}).sort({ createdAt: -1 }).lean();

    const users = dbUsers.map(u => ({ ...u, _id: u._id.toString() }));
    const projects = dbProjects.map(p => ({ ...p, _id: p._id.toString() }));
    const galleryItems = dbGallery.map(g => ({ ...g, _id: g._id.toString() }));
    const publications = dbPublications.map(p => ({ ...p, _id: p._id.toString() }));
    const sponsors = dbSponsors.map(s => ({ ...s, _id: s._id.toString() }));
    const teamMembers = dbTeamMembers.map(t => ({ ...t, _id: t._id.toString() }));
    const events = dbEvents.map(e => ({
        ...e,
        _id: e._id.toString(),
        participants: e.participants?.map((p: any) => ({
            _id: p._id.toString(),
            name: p.name,
            email: p.email
        })) || []
    }));

    return (
        <AdminClient
            initialTab={tab}
            currentUserEmail={session.user?.email}
            users={users}
            projects={projects}
            galleryItems={galleryItems}
            publications={publications}
            events={events}
            sponsors={sponsors}
            teamMembers={teamMembers}
        />
    );
}
