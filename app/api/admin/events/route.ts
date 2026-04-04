import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectToDatabase from '@/lib/db';
import Event from '@/lib/models/Event';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
    try {
        const session = await auth();
        const role = (session?.user as any)?.role;

        if (!session?.user || (role !== 'admin' && role !== 'super_admin')) {
            return NextResponse.json({ message: 'Yetkisiz erişim.' }, { status: 401 });
        }

        const body = await request.json();
        const { title, description, date, endDate, location, locationLink, imageUrl, requiresRegistration, speakers } = body;

        if (!title || !description || !date || !location) {
            return NextResponse.json({ message: 'Lütfen zorunlu alanları doldurun.' }, { status: 400 });
        }

        await connectToDatabase();

        const newEvent = await Event.create({
            title,
            description,
            date: new Date(date),
            endDate: endDate ? new Date(endDate) : undefined,
            location,
            locationLink,
            imageUrl,
            requiresRegistration: Boolean(requiresRegistration),
            speakers: Array.isArray(speakers) ? speakers : [],
        });

        revalidatePath('/admin');
        revalidatePath('/events');

        return NextResponse.json({ message: 'Etkinlik başarıyla eklendi.', event: newEvent }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating event:', error);
        return NextResponse.json({ message: 'Bir hata oluştu.', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await auth();
        const role = (session?.user as any)?.role;

        if (!session?.user || (role !== 'admin' && role !== 'super_admin')) {
            return NextResponse.json({ message: 'Yetkisiz erişim.' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'Etkinlik ID gerekli.' }, { status: 400 });
        }

        await connectToDatabase();
        await Event.findByIdAndDelete(id);

        revalidatePath('/admin');
        revalidatePath('/events');

        return NextResponse.json({ message: 'Etkinlik silindi.' }, { status: 200 });
    } catch (error: any) {
        console.error('Error deleting event:', error);
        return NextResponse.json({ message: 'Bir hata oluştu.', error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const session = await auth();
        const role = (session?.user as any)?.role;

        if (!session?.user || (role !== 'admin' && role !== 'super_admin')) {
            return NextResponse.json({ message: 'Yetkisiz erişim.' }, { status: 401 });
        }

        const body = await request.json();
        const { id, title, description, date, endDate, location, locationLink, imageUrl, requiresRegistration, speakers } = body;

        if (!id || !title || !description || !date || !location) {
            return NextResponse.json({ message: 'Lütfen zorunlu alanları doldurun.' }, { status: 400 });
        }

        await connectToDatabase();

        const updatedEvent = await Event.findByIdAndUpdate(id, {
            title,
            description,
            date: new Date(date),
            endDate: endDate ? new Date(endDate) : undefined,
            location,
            locationLink,
            imageUrl,
            requiresRegistration: Boolean(requiresRegistration),
            speakers: Array.isArray(speakers) ? speakers : [],
        }, { new: true });

        if (!updatedEvent) {
            return NextResponse.json({ message: 'Etkinlik bulunamadı.' }, { status: 404 });
        }

        revalidatePath('/admin');
        revalidatePath('/events');

        return NextResponse.json({ message: 'Etkinlik başarıyla güncellendi.', event: updatedEvent }, { status: 200 });
    } catch (error: any) {
        console.error('Error updating event:', error);
        return NextResponse.json({ message: 'Bir hata oluştu.', error: error.message }, { status: 500 });
    }
}
