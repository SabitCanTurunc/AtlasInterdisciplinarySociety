'use server';

import { signIn, signOut } from '@/auth';

export async function login() {
    await signIn('google', { redirectTo: '/profile' });
}

export async function logout() {
    await signOut();
}
