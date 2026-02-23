import { auth } from '@/auth';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
    const session = await auth();

    // Check if the current user is an admin or super_admin
    const currentUserRole = session?.user && (session.user as any).role;
    if (currentUserRole !== 'admin' && currentUserRole !== 'super_admin') {
        return new Response('Unauthorized', { status: 401 });
    }

    const formData = await request.formData();
    const userId = formData.get('userId');
    const newRole = formData.get('newRole'); // 'user' or 'admin'

    if (!userId || !newRole) {
        return new Response('Missing fields', { status: 400 });
    }

    await connectToDatabase();

    // Fetch target user to check their current role
    const targetUser = await User.findById(userId);
    if (!targetUser) {
        return new Response('User not found', { status: 404 });
    }

    // Prevent modifying a super_admin
    if (targetUser.role === 'super_admin') {
        return new Response('Cannot modify Super Admin', { status: 403 });
    }

    // Only super_admin can create other admins (Optional rule? Or admins can create admins?)
    // Requirement says: "normal bir admin yetkisini alamamalı" -> "A normal admin should not be able to take [super admin's] authority"
    // So normal admins can probably manage users, but NOT super admins.

    await User.findByIdAndUpdate(userId, { role: newRole });

    revalidatePath('/admin');
    redirect('/admin');
}
