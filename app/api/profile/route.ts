import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json({ message: 'Yetkisiz erişim.' }, { status: 401 });
        }

        const body = await request.json();
        const { imageUrl } = body;

        if (!imageUrl) {
            return NextResponse.json({ message: 'Resim URLsi gerekli.' }, { status: 400 });
        }

        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { image: imageUrl },
            { new: true } // Returns the updated document
        );

        if (!updatedUser) {
            return NextResponse.json({ message: 'Kullanıcı bulunamadı.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Profil fotoğrafı güncellendi.', image: updatedUser.image }, { status: 200 });

    } catch (error: any) {
        console.error('Profile update error:', error);
        return NextResponse.json({ message: 'Bir hata oluştu.', error: error.message }, { status: 500 });
    }
}
