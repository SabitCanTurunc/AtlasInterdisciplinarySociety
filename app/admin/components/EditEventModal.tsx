'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, UploadCloud, CalendarIcon, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/app/context/LanguageContext';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Calendar } from '@/app/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';

export default function EditEventModal({ event }: { event: any }) {
    const { t: allTranslations } = useLanguage();
    // Assuming edit phrases will reuse 'addTitle' loosely or we can hardcode for now
    // In genuine translations we would use t.editTitle but we only have addTitle, let's use a generic word or 'Etkinlik Düzenle'
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const initialStartDate = new Date(event.date);
    const initialEndDate = event.endDate ? new Date(event.endDate) : undefined;

    const [formData, setFormData] = useState({
        title: event.title || '',
        description: event.description || '',
        location: event.location || '',
        locationLink: event.locationLink || '',
        imageUrl: event.imageUrl || '',
        requiresRegistration: event.requiresRegistration || false,
    });

    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: initialStartDate,
        to: initialEndDate
    });

    const getHHMM = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

    const [startTime, setStartTime] = useState(getHHMM(initialStartDate));
    const [endTime, setEndTime] = useState(initialEndDate ? getHHMM(initialEndDate) : "00:00");

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

            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append('file', imageFile);

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadData,
                });

                const uploadResult = await uploadRes.json();

                if (!uploadRes.ok) {
                    throw new Error(uploadResult.error || uploadResult.message || 'Resim yüklenemedi');
                }

                uploadedImageUrl = uploadResult.url;
            }

            if (!dateRange?.from) {
                toast.error("Lütfen başlangıç tarihi seçin.");
                setLoading(false);
                return;
            }

            const startDate = new Date(dateRange.from);
            const [startHour, startMinute] = startTime.split(':').map(Number);
            startDate.setHours(startHour, startMinute);

            let endDateObj: Date | undefined = undefined;
            if (dateRange?.to) {
                endDateObj = new Date(dateRange.to);
                const [endHour, endMinute] = endTime.split(':').map(Number);
                endDateObj.setHours(endHour, endMinute);
            } else if (endTime !== "00:00") {
                endDateObj = new Date(dateRange.from);
                const [endHour, endMinute] = endTime.split(':').map(Number);
                endDateObj.setHours(endHour, endMinute);
            }

            const res = await fetch('/api/admin/events', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    id: event._id.toString(),
                    date: startDate.toISOString(),
                    endDate: endDateObj ? endDateObj.toISOString() : undefined,
                    imageUrl: uploadedImageUrl
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || 'Güncellenirken bir hata oluştu');
            } else {
                toast.success('Etkinlik başarıyla güncellendi!');
                setOpen(false);
                router.refresh();
            }
        } catch (err: any) {
            toast.error(err.message || 'Bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="p-1.5 bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 rounded hover:bg-[#d4af37]/30 transition-colors"
                >
                    <Pencil className="w-4 h-4" />
                </button>
            </DialogTrigger>
            <DialogContent className="bg-[#111d32] border-[#1e3a5f] text-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-white">Etkinlik Düzenle</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#cbd5e1] mb-1">Etkinlik Başlığı</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#d4af37]"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm font-medium text-[#cbd5e1]">Tarih</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button
                                            type="button"
                                            className={cn(
                                                "flex-1 flex justify-start items-center text-left font-normal bg-[#0a1628] border border-[#1e3a5f] rounded-lg py-2 px-3 text-white hover:border-[#d4af37] transition-colors",
                                                !dateRange && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                                            {dateRange?.from ? (
                                                dateRange.to ? (
                                                    <>
                                                        {format(dateRange.from, "LLL dd, y", { locale: tr })} -{" "}
                                                        {format(dateRange.to, "LLL dd, y", { locale: tr })}
                                                    </>
                                                ) : (
                                                    format(dateRange.from, "LLL dd, y", { locale: tr })
                                                )
                                            ) : (
                                                <span>Tarih aralığı seçin</span>
                                            )}
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 z-[100]" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={dateRange?.from}
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            numberOfMonths={2}
                                            locale={tr}
                                        />
                                    </PopoverContent>
                                </Popover>

                                <div className="flex gap-2 md:min-w-40 w-full sm:w-auto">
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg py-2 px-2 text-white focus:outline-none focus:border-[#d4af37]"
                                        title="Başlangıç Saati"
                                        required
                                    />
                                    <span className="text-[#64748b] self-center">-</span>
                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg py-2 px-2 text-white focus:outline-none focus:border-[#d4af37]"
                                        title="Bitiş Saati"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-[#cbd5e1] mb-1">Konum</label>
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
                            <label className="block text-sm font-medium text-[#cbd5e1] mb-1">Konum Linki (Opsiyonel)</label>
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
                            <label className="block text-sm font-medium text-[#cbd5e1] mb-1">Etkinlik Görseli</label>
                            <div className="flex items-center gap-4">
                                <label className="cursor-pointer bg-[#0a1628] border border-[#1e3a5f] hover:border-[#d4af37] transition-colors rounded-lg py-2 px-4 flex items-center gap-2 text-[#cbd5e1]">
                                    <UploadCloud className="w-5 h-5 text-[#d4af37]" />
                                    <span>{imageFile ? imageFile.name : "Yeni Görsel Seç"}</span>
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
                                    placeholder="Veya görsel linki..."
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-[#cbd5e1] mb-1">Açıklama</label>
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
                                Kayıt Gereklidir
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="bg-[#1a2744] hover:bg-[#1e3a5f] text-white py-2 px-4 rounded-lg font-medium transition-colors"
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary py-2 px-6 rounded-lg font-medium flex items-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Güncelle"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
