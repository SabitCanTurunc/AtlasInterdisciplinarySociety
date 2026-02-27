'use server'

import connectToDatabase from '@/lib/db';
import Gallery from '@/lib/models/Gallery';

export async function getGalleryImages() {
    try {
        await connectToDatabase();
        const images = await Gallery.find({}).sort({ createdAt: -1 }).lean();

        return images.map(img => ({
            _id: img._id.toString(),
            title: img.title,
            imageUrl: img.imageUrl,
        }));
    } catch (error) {
        console.error("Error fetching gallery images:", error);
        return [];
    }
}
