'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useLanguage } from '@/app/context/LanguageContext';

export default function PublicationForm() {
    const { t: allTranslations } = useLanguage();
    const t = allTranslations.admin.publications;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        type: 'Dergi',
        date: '',
        link: '',
        isActive: true, // Varsayılan olarak anında yayınla
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/admin/publications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || allTranslations.admin.gallery.errorMsg);
            }

            toast.success(t.successAdded);

            // Sıfırla
            setFormData({
                title: '',
                desc: '',
                type: 'Dergi',
                date: '',
                link: '',
                isActive: true,
            });

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1 text-[#cbd5e1]">{t.pubTitle}</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37] text-white"
                        placeholder="Örn: Atlas Bilim Dergisi - Sayı 1"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-[#cbd5e1]">{t.pubType}</label>
                    <select
                        required
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37] text-white"
                    >
                        <option value="Dergi">Dergi</option>
                        <option value="Rapor">Rapor</option>
                        <option value="Bülten">Bülten</option>
                        <option value="Makale">Makale</option>
                        <option value="Kitap">Kitap</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-[#cbd5e1]">{t.pubDate}</label>
                    <input
                        type="text"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37] text-white"
                        placeholder="Örn: Ocak 2026"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-[#cbd5e1]">{t.pubLink}</label>
                    <input
                        type="url"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37] text-white"
                        placeholder="https://..."
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1 text-[#cbd5e1]">{t.pubDesc}</label>
                <textarea
                    required
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37] text-white min-h-[80px]"
                />
            </div>

            <div className="flex items-center gap-3 bg-[#0a1628]/50 p-4 rounded-lg border border-[#1e3a5f]">
                <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-[#1e3a5f] bg-[#0a1628] text-[#d4af37] focus:ring-[#d4af37] focus:ring-offset-[#111d32]"
                />
                <label htmlFor="isActive" className="text-sm cursor-pointer select-none">
                    <span className="font-medium text-white block">Açık / Kapalı</span>
                </label>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="btn-primary px-6 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 mt-4"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    t.submitBtn
                )}
            </button>
        </form>
    );
}
