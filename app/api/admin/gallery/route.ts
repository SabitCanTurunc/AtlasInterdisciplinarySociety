import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Gallery from '@/lib/models/Gallery';
import { auth } from '@/auth';

export async function POST(request: Request) {
    try {
        const session = await auth();

        // Authorization check
        if (!session?.user || (session.user as any).role === 'user') {
            return NextResponse.json({ message: 'Yetkisiz erişim' }, { status: 403 });
        }

        const body = await request.json();

        // Validation check
        if (!body.imageUrl) {
            return NextResponse.json({ message: 'Lütfen bir görsel yükleyin' }, { status: 400 });
        }

        await connectToDatabase();

        const newGalleryImage = await Gallery.create(body);

        return NextResponse.json({ status: 'success', data: newGalleryImage }, { status: 201 });
    } catch (error: any) {
        console.error('Gallery image creation error:', error);
        return NextResponse.json({ message: 'Görsel eklenemedi', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await auth();

        // Authorization check
        if (!session?.user || (session.user as any).role === 'user') {
            return NextResponse.json({ message: 'Yetkisiz erişim' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'Görsel ID belirtilmedi' }, { status: 400 });
        }

        await connectToDatabase();
        const deletedImage = await Gallery.findByIdAndDelete(id);

        if (!deletedImage) {
            return NextResponse.json({ message: 'Görsel bulunamadı' }, { status: 404 });
        }

        return NextResponse.json({ status: 'success', message: 'Görsel silindi' }, { status: 200 });
    } catch (error: any) {
        console.error('Gallery image deletion error:', error);
        return NextResponse.json({ message: 'Görsel silinemedi', error: error.message }, { status: 500 });
    }
}
