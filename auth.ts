import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import bcrypt from 'bcryptjs';
import clientPromise from './lib/mongodb'; // We need a direct mongodb client for the adapter, dependent on mongoose
import connectToDatabase from './lib/db';
import User from './lib/models/User';

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    session: { strategy: 'jwt' },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectToDatabase();

                const user = await User.findOne({ email: credentials.email }).select('+password');

                if (!user) {
                    throw new Error('E-posta veya şifre hatalı.');
                }

                if (!user.password) {
                    throw new Error('Lütfen Google ile giriş yapın.');
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isPasswordCorrect) {
                    throw new Error('E-posta veya şifre hatalı.');
                }

                return user;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            // Initial sign in
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user && token?.email) {
                // Fetch latest role from DB to ensure it's up to date
                await connectToDatabase();
                const dbUser = await User.findOne({ email: token.email });
                if (dbUser) {
                    (session.user as any).role = dbUser.role;
                    (session.user as any).id = dbUser._id.toString();
                    if (dbUser.image) {
                        session.user.image = dbUser.image;
                    }
                }
            }
            return session;
        },
    },
    events: {
        createUser: async ({ user }) => {
            // Check if this is the first user
            await connectToDatabase();
            const count = await User.countDocuments();
            if (count === 1) {
                // This is the first user (was just created, so count is 1)
                await User.findByIdAndUpdate(user.id, { role: 'super_admin' });
                console.log(`First user ${user.email} promoted to super_admin.`);
            }
        }
    }
});
