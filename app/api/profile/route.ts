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
        const { imageUrl, phoneNumber, school, department } = body;

        // If all are undefined, then there's nothing to update
        if (imageUrl === undefined && phoneNumber === undefined && school === undefined && department === undefined) {
            return NextResponse.json({ message: 'Güncellenecek veri bulunamadı.' }, { status: 400 });
        }

        const updateData: any = {};
        if (imageUrl !== undefined) updateData.image = imageUrl;
        if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
        if (school !== undefined) updateData.school = school;
        if (department !== undefined) updateData.department = department;

        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { $set: updateData },
            { new: true } // Returns the updated document
        );

        if (!updatedUser) {
            return NextResponse.json({ message: 'Kullanıcı bulunamadı.' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Profiliniz başarıyla güncellendi.',
            image: updatedUser.image,
            phoneNumber: updatedUser.phoneNumber,
            school: updatedUser.school,
            department: updatedUser.department
        }, { status: 200 });

    } catch (error: any) {
        console.error('Profile update error:', error);
        return NextResponse.json({ message: 'Bir hata oluştu.', error: error.message }, { status: 500 });
    }
}
