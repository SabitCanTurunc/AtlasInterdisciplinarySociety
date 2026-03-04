'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useLanguage } from '@/app/context/LanguageContext';

export default function SponsorForm() {
    const { t: allTranslations } = useLanguage();
    const t = allTranslations.admin.sponsors;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
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
                publicId = uploadData.url; // Assuming url as publicId fallback
            } else {
                toast.error(t.sponsorImage); // Just an indicator for "image is required"
                setIsLoading(false);
                return;
            }

            const res = await fetch('/api/admin/sponsors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    imageUrl,
                    websiteUrl,
                    publicId,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Sponsor eklenemedi');
            }

            toast.success(t.successAdded);

            // Reset
            setName('');
            setWebsiteUrl('');
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
                <label className="block text-sm font-medium mb-1">{t.sponsorName}</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37]"
                    placeholder={t.sponsorName}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">{t.sponsorWebsite}</label>
                <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37]"
                    placeholder="https://..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">{t.sponsorImage}</label>
                <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                    className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#1a2744] file:text-white hover:file:bg-[#1e3a5f]"
                />
                {imagePreview && (
                    <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden border border-[#1e3a5f]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
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
