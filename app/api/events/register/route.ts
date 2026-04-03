import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectToDatabase from '@/lib/db';
import Event from '@/lib/models/Event';
import User from '@/lib/models/User';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json({ message: 'Lütfen önce giriş yapın.' }, { status: 401 });
        }

        const body = await request.json();
        const { eventId } = body;

        if (!eventId) {
            return NextResponse.json({ message: 'Etkinlik ID gerekli.' }, { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ message: 'Kullanıcı bulunamadı.' }, { status: 404 });
        }

        if (!user.phoneNumber || user.phoneNumber.replace(/\D/g, '').length < 10) {
            return NextResponse.json({
                error: 'PHONE_REQUIRED',
                message: 'Etkinliğe kaydolmak için profilinizden telefon numaranızı eklemelisiniz.'
            }, { status: 403 });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return NextResponse.json({ message: 'Etkinlik bulunamadı.' }, { status: 404 });
        }

        if (!event.requiresRegistration) {
            return NextResponse.json({ message: 'Bu etkinlik için kayıt gerekmiyor.' }, { status: 400 });
        }

        const userIdStr = user._id.toString();
        const isParticipating = event.participants.some((p: any) => p.toString() === userIdStr);

        if (isParticipating) {
            // Unregister
            event.participants = event.participants.filter((p: any) => p.toString() !== userIdStr);
        } else {
            // Register
            event.participants.push(user._id);
        }

        await event.save();

        revalidatePath('/events');
        revalidatePath('/admin'); // Update admin dashboard counts too

        return NextResponse.json({
            message: isParticipating ? 'Kayıt iptal edildi.' : 'Kayıt başarılı.',
            isParticipating: !isParticipating
        }, { status: 200 });

    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: 'Bir hata oluştu.', error: error.message }, { status: 500 });
    }
}
