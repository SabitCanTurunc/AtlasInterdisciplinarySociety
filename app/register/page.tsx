'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { login } from '@/app/actions/auth';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Bir hata oluştu.');
                setLoading(false);
                return;
            }

            // Auto login or redirect to login? Let's redirect to login for simplicity or auto login
            router.push('/login');
        } catch (err) {
            setError('Bir hata oluştu.');
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        await login();
    };

    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-[#0a1628]">
            <div className="bg-[#111d32] border border-[#1e3a5f] rounded-2xl p-8 w-full max-w-md shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Kayıt Ol</h1>
                    <p className="text-[#94a3b8]">A.I.S. ailesine katılmak için hesap oluşturun.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#cbd5e1] mb-1">Ad Soyad</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                                placeholder="Adınız Soyadınız"
                                required
                            />
                        </div>
                    </div>

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
                                minLength={6}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Kayıt Ol'}
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

                <form action={handleGoogleLogin}>
                    <button
                        type="submit"
                        className="w-full bg-white text-[#0a1628] py-3 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
                    >
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                        Google ile Kayıt Ol
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-[#94a3b8]">
                    Zaten hesabınız var mı?{' '}
                    <Link href="/login" className="text-[#d4af37] hover:underline">
                        Giriş Yap
                    </Link>
                </div>
            </div>
        </div>
    );
}
