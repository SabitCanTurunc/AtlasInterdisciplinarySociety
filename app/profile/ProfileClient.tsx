'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Loader2, Camera, Pencil, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/app/context/LanguageContext';

interface EventType {
    _id: string;
    title: string;
    date: string | Date;
}

interface ProfileClientProps {
    initialImage?: string;
    initialPhoneNumber?: string;
    initialSchool?: string;
    initialDepartment?: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    upcomingEvents: EventType[];
    pastEvents: EventType[];
}

export default function ProfileClient({ initialImage, initialPhoneNumber, initialSchool, initialDepartment, name, email, role, createdAt, upcomingEvents, pastEvents }: ProfileClientProps) {
    const router = useRouter();
    const { t: allTranslations, language } = useLanguage();
    const t = allTranslations.profile;

    const [image, setImage] = useState(initialImage);
    const [uploading, setUploading] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || '');
    const [school, setSchool] = useState(initialSchool || '');
    const [department, setDepartment] = useState(initialDepartment || '');
    const [isEditing, setIsEditing] = useState(false);
    const [savingDetails, setSavingDetails] = useState(false);

    const handleSaveDetails = async () => {
        if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 10) {
            toast.error(language === 'en' ? 'Please enter a valid phone number' : 'Lütfen geçerli bir telefon numarası girin');
            return;
        }
        if (!school || school.trim().length === 0) {
            toast.error(language === 'en' ? 'Please enter your school' : 'Lütfen okulunuzu girin');
            return;
        }
        if (!department || department.trim().length === 0) {
            toast.error(language === 'en' ? 'Please enter your department' : 'Lütfen bölümünüzü girin');
            return;
        }

        setSavingDetails(true);
        try {
            const res = await fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber, school, department }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Error saving details');
            }

            toast.success(language === 'en' ? 'Profile details updated successfully' : 'Kişisel bilgiler başarıyla güncellendi');
            setIsEditing(false);
            router.refresh();
        } catch (err: any) {
            console.error('Details update error:', err);
            toast.error(err.message || 'Bir hata oluştu.');
        } finally {
            setSavingDetails(false);
        }
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const file = e.target.files[0];
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const uploadData = await uploadRes.json();

            if (!uploadRes.ok) {
                throw new Error(uploadData.message || t.uploadError);
            }

            const profileRes = await fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: uploadData.url }),
            });

            if (!profileRes.ok) {
                const profileData = await profileRes.json();
                throw new Error(profileData.message || t.updateProfileError);
            }

            setImage(uploadData.url);
            toast.success(t.successPhoto);

            router.refresh();

        } catch (err: any) {
            console.error('Upload Error:', err);
            toast.error(err.message || 'Bir hata oluştu.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <div className="flex items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold text-[#d4af37]">{t.title}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <div className="bg-[#111d32] border border-[#1e3a5f] rounded-xl p-6 shadow-lg text-center relative overflow-hidden">
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

                                    <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        {uploading ? (
                                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                                        ) : (
                                            <>
                                                <Camera className="w-8 h-8 text-white mb-1" />
                                                <span className="text-xs text-white/90 font-medium">{t.changePhoto}</span>
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

                            <h2 className="text-2xl font-bold mt-4">{name}</h2>
                            <p className="text-[#94a3b8] text-sm mb-6">{email}</p>

                            <div className="w-full space-y-3 text-left">
                                <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-3 flex justify-between items-center">
                                    <span className="text-sm text-[#94a3b8]">{t.role}</span>
                                    <span className="text-sm font-medium text-[#d4af37] capitalize">
                                        {role === 'super_admin' ? t.superAdmin : role}
                                    </span>
                                </div>
                                <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-3 flex flex-col gap-3">
                                    <div className="flex justify-between items-center border-b border-[#1e3a5f]/50 pb-2 mb-1">
                                        <span className="text-sm font-semibold text-[#64748b] uppercase tracking-wider">{language === 'en' ? 'Personal Details' : 'Kişisel Bilgiler'}</span>
                                        {!isEditing && (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="text-[#d4af37] p-1.5 rounded-full hover:bg-[#111d32] transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                        )}
                                        {isEditing && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleSaveDetails}
                                                    disabled={savingDetails}
                                                    className="bg-[#d4af37]/20 text-[#d4af37] p-1.5 rounded-full hover:bg-[#d4af37]/30 transition-colors disabled:opacity-50"
                                                >
                                                    {savingDetails ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        setPhoneNumber(initialPhoneNumber || '');
                                                        setSchool(initialSchool || '');
                                                        setDepartment(initialDepartment || '');
                                                    }}
                                                    disabled={savingDetails}
                                                    className="bg-red-500/20 text-red-500 p-1.5 rounded-full hover:bg-red-500/30 transition-colors disabled:opacity-50"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-[#94a3b8]">{language === 'en' ? 'Phone Number' : 'Telefon Numarası'}</span>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                placeholder="05xxxxxxxxx"
                                                className="bg-[#111d32] border border-[#1e3a5f] rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                                            />
                                        ) : (
                                            <span className={`text-sm font-medium ${phoneNumber ? 'text-white' : 'text-red-400'}`}>
                                                {phoneNumber || (language === 'en' ? 'Missing' : 'Eksik')}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-[#94a3b8]">{language === 'en' ? 'School / University' : 'Okul / Üniversite'}</span>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={school}
                                                onChange={(e) => setSchool(e.target.value)}
                                                placeholder={language === 'en' ? 'Your University' : 'Üniversiteniz'}
                                                className="bg-[#111d32] border border-[#1e3a5f] rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                                            />
                                        ) : (
                                            <span className={`text-sm font-medium ${school ? 'text-white' : 'text-red-400'}`}>
                                                {school || (language === 'en' ? 'Missing' : 'Eksik')}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-[#94a3b8]">{language === 'en' ? 'Department' : 'Bölüm'}</span>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={department}
                                                onChange={(e) => setDepartment(e.target.value)}
                                                placeholder={language === 'en' ? 'Your Department' : 'Bölümünüz'}
                                                className="bg-[#111d32] border border-[#1e3a5f] rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                                            />
                                        ) : (
                                            <span className={`text-sm font-medium ${department ? 'text-white' : 'text-red-400'}`}>
                                                {department || (language === 'en' ? 'Missing' : 'Eksik')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-3 flex justify-between items-center">
                                    <span className="text-sm text-[#94a3b8]">{t.registrationDate}</span>
                                    <span className="text-sm font-medium text-white">{new Date(createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-8">
                    <div className="bg-[#111d32] border border-[#1e3a5f] rounded-xl p-6 shadow-lg">
                        <h2 className="text-xl font-bold mb-6 border-b border-[#1e3a5f] pb-3">{t.myEvents}</h2>

                        {(upcomingEvents.length === 0 && pastEvents.length === 0) ? (
                            <p className="text-[#94a3b8] text-center py-4 bg-[#1a2744]/30 rounded-lg">{t.noEvents}</p>
                        ) : (
                            <div className="space-y-6">
                                {upcomingEvents.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-[#d4af37] mb-3 uppercase tracking-wider">{t.upcomingEvents}</h3>
                                        <div className="space-y-3">
                                            {upcomingEvents.map(event => (
                                                <div key={event._id.toString()} className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <div>
                                                        <h4 className="font-semibold">{event.title}</h4>
                                                        <p className="text-xs text-[#94a3b8] mt-1">🗓️ {new Date(event.date).toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR')}</p>
                                                    </div>
                                                    <span className="text-xs bg-[#1e3a5f] text-white px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">{t.registered}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {pastEvents.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-[#64748b] mb-3 uppercase tracking-wider">{t.pastEvents}</h3>
                                        <div className="space-y-3">
                                            {pastEvents.map(event => (
                                                <div key={event._id.toString()} className="bg-[#1a2744]/50 border border-[#1e3a5f]/50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-70">
                                                    <div>
                                                        <h4 className="font-medium text-[#cbd5e1]">{event.title}</h4>
                                                        <p className="text-xs text-[#64748b] mt-1">🗓️ {new Date(event.date).toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR')}</p>
                                                    </div>
                                                    <span className="text-xs bg-[#0a1628] text-[#94a3b8] px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">{t.completed}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
