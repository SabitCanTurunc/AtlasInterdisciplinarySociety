'use server'

import connectToDatabase from '@/lib/db';
import Publication from '@/lib/models/Publication';

export async function getActivePublications() {
    try {
        await connectToDatabase();
        // Sadece aktif (yayında) olanları getir, Yeniden eskiye sırala
        const publications = await Publication.find({ isActive: true }).sort({ createdAt: -1 }).lean();

        return publications.map(pub => ({
            _id: pub._id.toString(),
            title: pub.title,
            desc: pub.desc,
            type: pub.type,
            date: pub.date,
            link: pub.link,
            isActive: pub.isActive
        }));
    } catch (error) {
        console.error("Error fetching active publications:", error);
        return [];
    }
}
