'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/app/context/LanguageContext';

export default function EventForm() {
    const { t: allTranslations } = useLanguage();
    const t = allTranslations.admin.events;
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [imageFile, setImageFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        locationLink: '',
        imageUrl: '',
        requiresRegistration: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let uploadedImageUrl = formData.imageUrl;

            // If a file is selected, upload it first
            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append('file', imageFile);

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadData,
                });

                const uploadResult = await uploadRes.json();

                if (!uploadRes.ok) {
                    throw new Error(uploadResult.error || uploadResult.message || allTranslations.admin.gallery.errorMsg);
                }

                uploadedImageUrl = uploadResult.url;
                toast.success(allTranslations.admin.gallery.successAdded);
            }

            const res = await fetch('/api/admin/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, imageUrl: uploadedImageUrl }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || allTranslations.admin.gallery.errorMsg);
            } else {
                toast.success(t.successAdded);
                setFormData({ title: '', description: '', date: '', location: '', locationLink: '', imageUrl: '', requiresRegistration: false });
                setImageFile(null);
                router.refresh(); // Refresh to show new event in the list
            }
        } catch (err: any) {
            toast.error(err.message || allTranslations.admin.gallery.errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#111d32] rounded-xl p-6 border border-[#1e3a5f] mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">{t.addTitle}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#cbd5e1] mb-1">{t.eventTitle}</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#d4af37]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#cbd5e1] mb-1">{t.eventDate}</label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            onClick={(e) => {
                                try {
                                    e.currentTarget.showPicker();
                                } catch (err) { }
                            }}
                            className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                            required
                        />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-[#cbd5e1] mb-1">{t.eventLocation}</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#d4af37]"
                            required
                        />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-[#cbd5e1] mb-1">{t.eventLocationLink}</label>
                        <input
                            type="url"
                            name="locationLink"
                            value={formData.locationLink}
                            onChange={handleChange}
                            className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#d4af37]"
                            placeholder="https://maps.google.com/..."
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#cbd5e1] mb-1">{t.eventImage}</label>
                        <div className="flex items-center gap-4">
                            <label className="cursor-pointer bg-[#0a1628] border border-[#1e3a5f] hover:border-[#d4af37] transition-colors rounded-lg py-2 px-4 flex items-center gap-2 text-[#cbd5e1]">
                                <UploadCloud className="w-5 h-5 text-[#d4af37]" />
                                <span>{imageFile ? imageFile.name : allTranslations.admin.gallery.imageFile}</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                            <span className="text-[#64748b] text-sm">-</span>
                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                disabled={!!imageFile}
                                className="flex-1 bg-[#0a1628] border border-[#1e3a5f] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#d4af37] disabled:opacity-50"
                                placeholder="..."
                            />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#cbd5e1] mb-1">{t.eventDesc}</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#d4af37]"
                            required
                        ></textarea>
                    </div>
                    <div className="md:col-span-2">
                        <label className="flex items-center gap-2 cursor-pointer w-fit text-sm font-medium text-[#cbd5e1] hover:text-white transition-colors">
                            <input
                                type="checkbox"
                                name="requiresRegistration"
                                checked={formData.requiresRegistration}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-[#1e3a5f] bg-[#0a1628] text-[#d4af37] focus:ring-[#d4af37] focus:ring-offset-[#111d32]"
                            />
                            {t.requiresReg}
                        </label>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary py-2 px-6 rounded-lg font-medium flex items-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t.submitBtn}
                    </button>
                </div>
            </form>
        </div>
    );
}
