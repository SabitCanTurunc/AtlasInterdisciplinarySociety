import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Publication from '@/lib/models/Publication';
import { auth } from '@/auth';

export async function POST(request: Request) {
    try {
        const session = await auth();

        // Yetkilendirme kontrolü
        if (!session?.user || (session.user as any).role === 'user') {
            return NextResponse.json({ message: 'Yetkisiz erişim' }, { status: 403 });
        }

        const body = await request.json();

        // Validasyon
        if (!body.title || !body.desc || !body.type || !body.date) {
            return NextResponse.json({ message: 'Lütfen zorunlu alanları doldurun' }, { status: 400 });
        }

        await connectToDatabase();

        const newPublication = await Publication.create({
            title: body.title,
            desc: body.desc,
            type: body.type,
            date: body.date,
            link: body.link || '#',
            isActive: body.isActive !== undefined ? body.isActive : true
        });

        return NextResponse.json({ status: 'success', data: newPublication }, { status: 201 });
    } catch (error: any) {
        console.error('Publication creation error:', error);
        return NextResponse.json({ message: 'Yayın oluşturulamadı', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await auth();

        if (!session?.user || (session.user as any).role === 'user') {
            return NextResponse.json({ message: 'Yetkisiz erişim' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'Yayın ID belirtilmedi' }, { status: 400 });
        }

        await connectToDatabase();
        const deletedPublication = await Publication.findByIdAndDelete(id);

        if (!deletedPublication) {
            return NextResponse.json({ message: 'Yayın bulunamadı' }, { status: 404 });
        }

        return NextResponse.json({ status: 'success', message: 'Yayın başarıyla silindi' }, { status: 200 });
    } catch (error: any) {
        console.error('Publication deletion error:', error);
        return NextResponse.json({ message: 'Yayın silinemedi', error: error.message }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await auth();

        if (!session?.user || (session.user as any).role === 'user') {
            return NextResponse.json({ message: 'Yetkisiz erişim' }, { status: 403 });
        }

        const body = await request.json();
        const { id, isActive } = body;

        if (!id || typeof isActive !== 'boolean') {
            return NextResponse.json({ message: 'Eksik parametre' }, { status: 400 });
        }

        await connectToDatabase();

        const updatedPublication = await Publication.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!updatedPublication) {
            return NextResponse.json({ message: 'Yayın bulunamadı' }, { status: 404 });
        }

        return NextResponse.json({ status: 'success', data: updatedPublication }, { status: 200 });
    } catch (error: any) {
        console.error('Publication update error:', error);
        return NextResponse.json({ message: 'Yayın güncellenemedi', error: error.message }, { status: 500 });
    }
}
