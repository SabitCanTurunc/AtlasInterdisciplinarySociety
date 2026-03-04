'use server'

import connectToDatabase from '@/lib/db';
import Sponsor from '@/lib/models/Sponsor';

export async function getSponsors() {
    try {
        await connectToDatabase();
        const sponsors = await Sponsor.find({}).sort({ createdAt: -1 }).lean();

        return sponsors.map(s => ({
            _id: s._id.toString(),
            name: s.name,
            imageUrl: s.imageUrl,
            websiteUrl: s.websiteUrl || null,
        }));
    } catch (error) {
        console.error("Error fetching sponsors:", error);
        return [];
    }
}
