import Team from '../sections/Team';
import connectToDatabase from '@/lib/db';
import TeamMember from '@/lib/models/TeamMember';

export default async function TeamPage() {
    await connectToDatabase();

    // Fetch team members from database
    const dbTeamMembers = await TeamMember.find({}).sort({ createdAt: 1 }).lean();

    // Convert ObjectId to string for client component props
    const teamMembers = dbTeamMembers.map(m => ({
        ...m,
        _id: m._id.toString()
    }));

    return (
        <div className="pt-20">
            <Team initialTeamMembers={teamMembers} />
        </div>
    );
}
