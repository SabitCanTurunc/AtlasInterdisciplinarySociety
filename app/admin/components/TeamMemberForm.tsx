'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useLanguage } from '@/app/context/LanguageContext';

export default function TeamMemberForm() {
    const { t: allTranslations } = useLanguage();
    const t = allTranslations.admin.team; // Ensure you have this in translations.ts
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [faculty, setFaculty] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let imageUrl = '';
            let publicId = '';

            if (image) {
                const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB sınır
                if (image.size > MAX_FILE_SIZE) {
                    throw new Error(`Dosya boyutu çok büyük! Maksimum 10MB yükleyebilirsiniz. Seçtiğiniz dosya: ${(image.size / (1024 * 1024)).toFixed(2)}MB`);
                }

                const formData = new FormData();
                formData.append('file', image);

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const uploadData = await uploadRes.json();

                if (!uploadRes.ok) {
                    throw new Error(uploadData.error || 'Görsel yüklenemedi');
                }

                imageUrl = uploadData.url;
                publicId = uploadData.url; // Use URL as fallback for publicId here
            } else {
                toast.error(t.memberImage);
                setIsLoading(false);
                return;
            }

            const res = await fetch('/api/admin/team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    role,
                    faculty,
                    instagram,
                    twitter,
                    linkedin,
                    imageUrl,
                    publicId,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Ekip üyesi eklenemedi');
            }

            toast.success(t.successAdded);

            // Reset
            setName('');
            setRole('');
            setFaculty('');
            setInstagram('');
            setTwitter('');
            setLinkedin('');
            setImage(null);
            setImagePreview(null);

            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#111d32] border border-[#1e3a5f] p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">{t.addTitle}</h2>

            <div>
                <label className="block text-sm font-medium mb-1">{t.memberName}</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37]"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">{t.memberRole}</label>
                    <input
                        type="text"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t.memberFaculty}</label>
                    <select
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37] text-white"
                    >
                        <option value="">{t.memberFaculty}</option>
                        {Object.entries(allTranslations.team.faculties).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">{t.memberInstagram}</label>
                    <input
                        type="url"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37]"
                        placeholder="https://instagram.com/..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t.memberTwitter}</label>
                    <input
                        type="url"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37]"
                        placeholder="https://x.com/..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t.memberLinkedin}</label>
                    <input
                        type="url"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37]"
                        placeholder="https://linkedin.com/in/..."
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">{t.memberImage}</label>
                <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                    className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#1a2744] file:text-white hover:file:bg-[#1e3a5f]"
                />
                {imagePreview && (
                    <div className="mt-4 relative w-32 h-32 rounded-lg overflow-hidden border border-[#1e3a5f]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#d4af37] text-[#0a1628] font-semibold py-2 rounded-lg hover:bg-[#b0902c] transition flex justify-center items-center"
            >
                {isLoading ? (
                    <div className="w-6 h-6 border-2 border-[#0a1628] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    t.submitBtn
                )}
            </button>
        </form>
    );
}
