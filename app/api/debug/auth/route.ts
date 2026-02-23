import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const session = await auth();

        return NextResponse.json({
            status: 'success',
            env: {
                hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
                hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
                hasAuthSecret: !!process.env.AUTH_SECRET,
                hasAuthUrl: !!process.env.AUTH_URL,
                hasMongoDb: !!process.env.MONGODB_URI,
                hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
                hasGoogleSecret: !!process.env.GOOGLE_CLIENT_SECRET
            },
            session: session ? 'exists' : 'null',
            sessionDetails: session
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
