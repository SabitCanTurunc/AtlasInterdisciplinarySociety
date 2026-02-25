'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { login } from '@/app/actions/auth'; // We might need to adjust this if using client-side signIn for creds
import { toast } from 'sonner';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success('Giriş başarılı! Yönlendiriliyorsunuz...');
                router.push('/profile');
                router.refresh();
            }
        } catch (err) {
            toast.error('Giriş yaparken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        await login(); // Uses the server action which calls signIn('google')
    };

    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-[#0a1628]">
            <div className="bg-[#111d32] border border-[#1e3a5f] rounded-2xl p-8 w-full max-w-md shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Giriş Yap</h1>
                    <p className="text-[#94a3b8]">Hesabınıza erişmek için bilgilerinizi girin.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#cbd5e1] mb-1">E-posta</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                                placeholder="ornek@mail.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#cbd5e1] mb-1">Şifre</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Giriş Yap'}
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#1e3a5f]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-[#111d32] text-[#64748b]">veya</span>
                    </div>
                </div>

                {/* Google Login Button */}
                <form action={handleGoogleLogin}>
                    <button
                        type="submit"
                        className="w-full bg-white text-[#0a1628] py-3 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
                    >
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                        Google ile Giriş Yap
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-[#94a3b8]">
                    Hesabınız yok mu?{' '}
                    <Link href="/register" className="text-[#d4af37] hover:underline">
                        Kayıt Ol
                    </Link>
                </div>
            </div>
        </div>
    );
}
