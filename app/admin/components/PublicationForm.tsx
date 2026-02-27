'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function PublicationForm() {
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
                throw new Error(data.message || 'Yayın kaydedilemedi');
            }

            toast.success('Yayın başarıyla eklendi');

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
            <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">Yeni Yayın Ekle</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1 text-[#cbd5e1]">Yayın Başlığı</label>
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
                    <label className="block text-sm font-medium mb-1 text-[#cbd5e1]">Yayın Tipi (Kategori)</label>
                    <select
                        required
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37] text-white"
                    >
                        <option value="Dergi">Dergi (Mavi Mavi Kitap İkonu)</option>
                        <option value="Rapor">Rapor (Yeşil Dosya İkonu)</option>
                        <option value="Bülten">Bülten (Turuncu Gazete İkonu)</option>
                        <option value="Makale">Makale (Mor Yazı İkonu)</option>
                        <option value="Kitap">Kitap (Sarı Defter İkonu)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-[#cbd5e1]">Yayın Tarihi (Metin)</label>
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
                    <label className="block text-sm font-medium mb-1 text-[#cbd5e1]">Yönlendirme Linki (Opsiyonel)</label>
                    <input
                        type="url"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37] text-white"
                        placeholder="Örn: https://atlas.edu.tr/pdf/sayi1.pdf veya #"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1 text-[#cbd5e1]">Kısa Açıklama (Özet)</label>
                <textarea
                    required
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37] text-white min-h-[80px]"
                    placeholder="Yayının içeriği hakkında ziyaretçilere kısa bilgi verin..."
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
                    <span className="font-medium text-white block">Hemen Yayınla (Aktif)</span>
                    <span className="text-[#94a3b8] text-xs">Bu seçenek işaretliyse eklendiği an "Yayınlar" sayfasında görünür. Kapalıysa taslak olarak kalır.</span>
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
                    'Yayını Kaydet'
                )}
            </button>
        </form>
    );
}
