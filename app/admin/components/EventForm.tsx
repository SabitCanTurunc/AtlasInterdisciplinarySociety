'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, UploadCloud, CalendarIcon, User } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/app/context/LanguageContext';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Calendar } from '@/app/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';

export default function EventForm() {
    const { t: allTranslations } = useLanguage();
    const t = allTranslations.admin.events;
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [imageFile, setImageFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        locationLink: '',
        imageUrl: '',
        requiresRegistration: false,
    });

    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("00:00");

    const [speakers, setSpeakers] = useState<{ name: string, title: string, imageUrl: string, imageFile?: File | null }[]>([]);

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

            const speakersWithUrls = await Promise.all(speakers.map(async (s) => {
                if (s.imageFile) {
                    const uploadData = new FormData();
                    uploadData.append('file', s.imageFile);
                    const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadData });
                    if (!uploadRes.ok) throw new Error('Konuşmacı resmi yüklenemedi');
                    const uploadResult = await uploadRes.json();
                    return { name: s.name, title: s.title, imageUrl: uploadResult.url };
                }
                return { name: s.name, title: s.title, imageUrl: s.imageUrl };
            }));

            const res = await fetch('/api/admin/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    date: startDate.toISOString(),
                    endDate: endDateObj ? endDateObj.toISOString() : undefined,
                    imageUrl: uploadedImageUrl,
                    speakers: speakersWithUrls
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || allTranslations.admin.gallery.errorMsg);
            } else {
                toast.success(t.successAdded);
                setFormData({ title: '', description: '', location: '', locationLink: '', imageUrl: '', requiresRegistration: false });
                setDateRange(undefined);
                setStartTime("00:00");
                setEndTime("00:00");
                setSpeakers([]);
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
                    <div className="flex flex-col gap-1">
                        <label className="block text-sm font-medium text-[#cbd5e1]">{t.eventDate}</label>

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
                                    title="Bitiş Saati (Opsiyonel)"
                                />
                            </div>
                        </div>
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

                    <div className="md:col-span-2 mt-4 p-4 border border-[#1e3a5f] rounded-lg bg-[#0a1628]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-semibold text-white">Konuşmacılar / Konuklar (Opsiyonel)</h3>
                            <button
                                type="button"
                                onClick={() => setSpeakers([...speakers, { name: '', title: '', imageUrl: '', imageFile: null }])}
                                className="text-xs bg-[#1a2744] hover:bg-[#1e3a5f] text-[#cbd5e1] hover:text-white py-1 px-3 rounded-lg border border-[#1e3a5f] transition-colors"
                            >
                                + Yeni Konuşmacı
                            </button>
                        </div>

                        {speakers.length === 0 ? (
                            <p className="text-xs text-[#64748b]">Etkinliğe henüz konuşmacı eklenmedi.</p>
                        ) : (
                            <div className="space-y-3">
                                {speakers.map((speaker, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row gap-4 p-3 border border-[#1e3a5f] rounded-lg bg-[#111d32] relative">
                                        <button
                                            type="button"
                                            onClick={() => setSpeakers(speakers.filter((_, i) => i !== index))}
                                            className="absolute top-2 right-2 text-[#94a3b8] hover:text-red-500 transition-colors"
                                            title="Kaldır"
                                        >
                                            ✕
                                        </button>

                                        <div className="w-full sm:w-16 shrink-0 flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-full bg-[#0a1628] border border-[#1e3a5f] overflow-hidden flex items-center justify-center shrink-0">
                                                {(speaker.imageUrl || speaker.imageFile) ? (
                                                    <img src={speaker.imageFile ? URL.createObjectURL(speaker.imageFile) : speaker.imageUrl} alt="preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <User className="w-5 h-5 text-[#64748b]" />
                                                )}
                                            </div>
                                            <label className="cursor-pointer text-[9px] text-[#d4af37] hover:underline text-center">
                                                Fotoğraf
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        if (e.target.files && e.target.files[0]) {
                                                            const newSpeakers = [...speakers];
                                                            newSpeakers[index].imageFile = e.target.files[0];
                                                            setSpeakers(newSpeakers);
                                                        }
                                                    }}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>

                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 pr-6">
                                            <div>
                                                <label className="block text-[10px] text-[#cbd5e1] mb-1">İsim Soyisim</label>
                                                <input
                                                    type="text"
                                                    value={speaker.name}
                                                    onChange={(e) => {
                                                        const newSpeakers = [...speakers];
                                                        newSpeakers[index].name = e.target.value;
                                                        setSpeakers(newSpeakers);
                                                    }}
                                                    className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded py-1 px-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] text-[#cbd5e1] mb-1">Ünvan / Çalıştığı Yer</label>
                                                <input
                                                    type="text"
                                                    value={speaker.title}
                                                    onChange={(e) => {
                                                        const newSpeakers = [...speakers];
                                                        newSpeakers[index].title = e.target.value;
                                                        setSpeakers(newSpeakers);
                                                    }}
                                                    className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded py-1 px-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
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
