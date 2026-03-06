import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import TeamMember from '@/lib/models/TeamMember';
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
        if (!body.imageUrl || !body.name || !body.role) {
            return NextResponse.json({ message: 'Lütfen isim, rol ve fotoğraf alanlarını doldurun' }, { status: 400 });
        }

        await connectToDatabase();

        const newMember = await TeamMember.create(body);

        return NextResponse.json({ status: 'success', data: newMember }, { status: 201 });
    } catch (error: any) {
        console.error('Team Member creation error:', error);
        return NextResponse.json({ message: 'Ekip üyesi eklenemedi', error: error.message }, { status: 500 });
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
            return NextResponse.json({ message: 'Üye ID belirtilmedi' }, { status: 400 });
        }

        await connectToDatabase();
        const deletedMember = await TeamMember.findByIdAndDelete(id);

        if (!deletedMember) {
            return NextResponse.json({ message: 'Ekip üyesi bulunamadı' }, { status: 404 });
        }

        return NextResponse.json({ status: 'success', message: 'Ekip üyesi silindi' }, { status: 200 });
    } catch (error: any) {
        console.error('Team Member deletion error:', error);
        return NextResponse.json({ message: 'Ekip üyesi silinemedi', error: error.message }, { status: 500 });
    }
}
