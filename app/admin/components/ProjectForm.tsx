'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Upload, AlertCircle, Plus, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

export default function ProjectForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        shortDescription: '',
        description: '',
        metrics: '',
        status: '',
        imageUrl: '',
        featured: false,
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        setError('');

        const form = new FormData();
        form.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: form,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Resim yüklenemedi');
            }

            setFormData(prev => ({ ...prev, imageUrl: data.url }));
            toast.success('Görsel başarıyla yüklendi');
        } catch (err: any) {
            const errorMessage = err.message || 'Resim yükleme hatası';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.imageUrl) {
            setError('Lütfen bir proje görseli yükleyin.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/admin/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Proje oluşturulamadı');
            }

            setFormData({
                title: '',
                category: '',
                shortDescription: '',
                description: '',
                metrics: '',
                status: '',
                imageUrl: '',
                featured: false,
            });

            toast.success('Proje başarıyla oluşturuldu!');
            router.refresh();
        } catch (err: any) {
            const errorMessage = err.message || 'Bir hata oluştu';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#111d32] border border-[#1e3a5f] rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#d4af37]" />
                Yeni Proje Ekle
            </h2>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg mb-6 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-[#cbd5e1] mb-2">Proje Başlığı</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37]"
                            placeholder="Örn: Autonomous Drone Swarm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#cbd5e1] mb-2">Kategori</label>
                        <input
                            type="text"
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37]"
                            placeholder="Örn: Robotics / AI"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#cbd5e1] mb-2">Metrikler / Sayısal Değerler</label>
                        <input
                            type="text"
                            required
                            value={formData.metrics}
                            onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                            className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37]"
                            placeholder="Örn: 94% accuracy | 6mo lead time"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#cbd5e1] mb-2">Durum</label>
                        <input
                            type="text"
                            required
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37]"
                            placeholder="Örn: In Production"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#cbd5e1] mb-2">Kısa Açıklama (Kart Gösterimi)</label>
                    <textarea
                        required
                        value={formData.shortDescription}
                        onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                        className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37] min-h-[80px]"
                        placeholder="Örn: 50+ drone ile ortak zeka ağı..."
                        maxLength={150}
                    />
                    <p className="text-xs text-[#64748b] mt-1 text-right">{formData.shortDescription.length}/150</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#cbd5e1] mb-2">Detaylı Açıklama (Proje Sayfası)</label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37] min-h-[150px]"
                        placeholder="Projenin işleyişi, amacı, detayları..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#cbd5e1] mb-2">Proje Görseli</label>
                    <div className="flex items-start gap-6">
                        {formData.imageUrl ? (
                            <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-[#1e3a5f]">
                                <Image src={formData.imageUrl} alt="Project image" fill className="object-cover" />
                            </div>
                        ) : (
                            <div className="w-40 h-24 rounded-lg border border-dashed border-[#1e3a5f] flex flex-col items-center justify-center bg-[#0a1628]/50">
                                <ImageIcon className="w-6 h-6 text-[#64748b] mb-2" />
                                <span className="text-xs text-[#64748b]">Görsel Yok</span>
                            </div>
                        )}

                        <div className="flex-1">
                            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] hover:bg-[#2a4a7f] text-white rounded-lg transition-colors text-sm font-medium">
                                {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                {uploadingImage ? 'Yükleniyor...' : (formData.imageUrl ? 'Değiştir' : 'Görsel Seç')}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploadingImage}
                                />
                            </label>
                            <p className="text-xs text-[#64748b] mt-2">
                                Maksimum dosya boyutu: 5MB. Önerilen boyut 16:9 (Örn: 1920x1080)
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-[#0a1628]/50 p-4 rounded-lg border border-[#1e3a5f]">
                    <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-5 h-5 rounded border-[#1e3a5f] bg-[#0a1628] text-[#d4af37] focus:ring-[#d4af37] focus:ring-offset-[#111d32]"
                    />
                    <label htmlFor="featured" className="text-sm cursor-pointer select-none">
                        <span className="font-medium text-white block">Vitrin Projesi Olarak İşaretle (Featured)</span>
                        <span className="text-[#94a3b8] text-xs">Bu proje anasayfada ve projeler sayfasında en üstte büyük olarak sergilenir. Zaten bir vitrin projesi varsa, onun yerini alır.</span>
                    </label>
                </div>

                <div className="pt-4 border-t border-[#1e3a5f]">
                    <button
                        type="submit"
                        disabled={loading || uploadingImage}
                        className="px-6 py-2.5 btn-primary rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? 'Oluşturuluyor...' : 'Projeyi Kaydet'}
                    </button>
                </div>
            </form>
        </div>
    );
}
