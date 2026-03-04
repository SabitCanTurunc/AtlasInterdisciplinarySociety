import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Sponsor from '@/lib/models/Sponsor';
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
        if (!body.imageUrl || !body.name) {
            return NextResponse.json({ message: 'Lütfen sponsor adı ve görselini girin' }, { status: 400 });
        }

        await connectToDatabase();

        const newSponsor = await Sponsor.create(body);

        return NextResponse.json({ status: 'success', data: newSponsor }, { status: 201 });
    } catch (error: any) {
        console.error('Sponsor creation error:', error);
        return NextResponse.json({ message: 'Sponsor eklenemedi', error: error.message }, { status: 500 });
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
            return NextResponse.json({ message: 'Sponsor ID belirtilmedi' }, { status: 400 });
        }

        await connectToDatabase();
        const deletedSponsor = await Sponsor.findByIdAndDelete(id);

        if (!deletedSponsor) {
            return NextResponse.json({ message: 'Sponsor bulunamadı' }, { status: 404 });
        }

        return NextResponse.json({ status: 'success', message: 'Sponsor silindi' }, { status: 200 });
    } catch (error: any) {
        console.error('Sponsor deletion error:', error);
        return NextResponse.json({ message: 'Sponsor silinemedi', error: error.message }, { status: 500 });
    }
}
