'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Loader2, Camera } from 'lucide-react';

interface ProfileClientProps {
    initialImage?: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export default function ProfileClient({ initialImage, name, email, role, createdAt }: ProfileClientProps) {
    const router = useRouter();
    const [image, setImage] = useState(initialImage);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const file = e.target.files[0];
        setUploading(true);
        setError('');

        try {
            // 1. Upload to Cloudinary via our existing /api/upload route
            const formData = new FormData();
            formData.append('file', file);

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const uploadData = await uploadRes.json();

            if (!uploadRes.ok) {
                throw new Error(uploadData.message || 'Resim yüklenemedi.');
            }

            // 2. Update user profile via our new /api/profile route
            const profileRes = await fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: uploadData.url }),
            });

            if (!profileRes.ok) {
                const profileData = await profileRes.json();
                throw new Error(profileData.message || 'Profil güncellenemedi.');
            }

            // Success
            setImage(uploadData.url);

            // Note: In Next.js App Router, router.refresh() will re-fetch Server Components 
            // and merge the updated state, which is enough to force the Navbar or Session to see the newly updated DB image if configured correctly.
            router.refresh();

        } catch (err: any) {
            console.error('Upload Error:', err);
            setError(err.message || 'Bir hata oluştu.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-[#111d32] border border-[#1e3a5f] rounded-xl p-6 shadow-lg text-center relative overflow-hidden">
            {/* Header Background */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-[#1e3a5f] to-[#111d32] z-0"></div>

            <div className="relative z-10 flex flex-col items-center mt-8">
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#0a1628] bg-[#0a1628] shadow-xl relative flex items-center justify-center text-3xl font-bold">
                        {image ? (
                            <Image
                                src={image}
                                alt={name}
                                fill
                                className="object-cover"
                                sizes="128px"
                            />
                        ) : (
                            <span>{name.charAt(0)}</span>
                        )}

                        {/* Overlay with Camera Icon */}
                        <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            {uploading ? (
                                <Loader2 className="w-8 h-8 text-white animate-spin" />
                            ) : (
                                <>
                                    <Camera className="w-8 h-8 text-white mb-1" />
                                    <span className="text-xs text-white/90 font-medium">Değiştir</span>
                                </>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                                disabled={uploading}
                            />
                        </label>
                    </div>
                </div>

                {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

                <h2 className="text-2xl font-bold mt-4">{name}</h2>
                <p className="text-[#94a3b8] text-sm mb-6">{email}</p>

                <div className="w-full space-y-3 text-left">
                    <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-3 flex justify-between items-center">
                        <span className="text-sm text-[#94a3b8]">Rol</span>
                        <span className="text-sm font-medium text-[#d4af37] capitalize">
                            {role === 'super_admin' ? 'Super Admin' : role}
                        </span>
                    </div>
                    <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-3 flex justify-between items-center">
                        <span className="text-sm text-[#94a3b8]">Kayıt Tarihi</span>
                        <span className="text-sm font-medium text-white">{new Date(createdAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
