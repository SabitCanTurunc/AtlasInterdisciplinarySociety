'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Loader2, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function EventDetailClient({ event, sessionUserObjectId, sessionExists }: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const isPast = new Date(event.endDate || event.date) < new Date();
    const isParticipant = sessionUserObjectId && event.participants.includes(sessionUserObjectId);

    const handleJoinEvent = async () => {
        if (!sessionExists) {
            router.push('/login');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/events/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventId: event._id }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Kayıt işlemi başarısız');
            }

            toast.success(isParticipant ? "Kayıt iptal edildi" : "Kayıt başarılı");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const dateStr = event.endDate && new Date(event.date).toDateString() !== new Date(event.endDate).toDateString()
        ? `${new Date(event.date).toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })} - ${new Date(event.endDate).toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`
        : new Date(event.date).toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

    const timeStr = event.endDate
        ? `${new Date(event.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.endDate).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`
        : new Date(event.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="bg-[#0a1628] min-h-screen pt-32 pb-24 text-white">
            <div className="container-custom max-w-4xl mx-auto">
                <Link href="/events" className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-[#d4af37] transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Etkinliklere Dön
                </Link>

                <div className="mb-8 relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-[#1e3a5f] bg-[#1a2744]">
                    {event.imageUrl ? (
                        <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Calendar className="w-20 h-20 text-[#1e3a5f]" />
                        </div>
                    )}
                    {isPast && (
                        <div className="absolute top-4 right-4 px-4 py-1.5 bg-[#1a2744]/90 border border-[#1e3a5f] text-[#94a3b8] text-sm font-medium rounded-full shadow-lg backdrop-blur-sm z-10">
                            Gerçekleşti
                        </div>
                    )}
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">{event.title}</h1>

                        <div className="flex flex-wrap items-center gap-6 mb-8 text-[#94a3b8]">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[#d4af37]" />
                                <span>{dateStr}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-[#d4af37]" />
                                <span>{timeStr}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-[#d4af37]" />
                                {event.locationLink ? (
                                    <a href={event.locationLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] hover:underline transition-colors shrink-0">
                                        {event.location}
                                    </a>
                                ) : (
                                    <span className="shrink-0">{event.location}</span>
                                )}
                            </div>
                            {event.requiresRegistration && (
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-[#d4af37]" />
                                    <span>{event.participants.length} Katılımcı</span>
                                </div>
                            )}
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none prose-p:text-[#cbd5e1] prose-p:leading-relaxed mb-12">
                            {event.description.split('\n').map((paragraph: string, index: number) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        {event.speakers && event.speakers.length > 0 && (
                            <div className="mb-12">
                                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-[#d4af37] rounded-full"></span>
                                    Konuşmacılar & Konuklar
                                </h3>
                                <div className="flex flex-col gap-12 mt-10 w-full lg:max-w-3xl lg:mx-auto">
                                    {event.speakers.map((speaker: any, idx: number) => (
                                        <div key={idx} className="group relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-[#0a1628] shadow-2xl border border-[#1e3a5f]">
                                            {/* Arkaplan Görseli */}
                                            {speaker.imageUrl ? (
                                                <img src={speaker.imageUrl} alt={speaker.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <UserIcon className="w-32 h-32 text-[#1e3a5f]" />
                                                </div>
                                            )}
                                            {/* Zemin Koyuluğu (Yazı Okunabilirliği İçin) */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent opacity-90" />

                                            {/* Bilgi Katmanı (Paralelkenarlar) - Resim kutusunun TAMAMEN İÇİNDE. Taşmalar kutunun kenarıyla kusursuz jilet gibi kesilir. */}
                                            <div className="absolute bottom-6 -left-2 flex flex-col gap-1.5 items-start z-10 w-[calc(100%+1rem)] pointer-events-none">
                                                {/* İsim Paralelkenarı */}
                                                <div className="bg-white pl-4 pr-6 py-2 -skew-x-12 border-l-[6px] border-l-[#d4af37] shadow-xl ml-4 pointer-events-auto inline-block shrink-0">
                                                    <div className="skew-x-12 flex items-center">
                                                        <h4 className="font-bold text-[#0a1628] text-lg sm:text-xl md:text-2xl tracking-wide whitespace-nowrap">{speaker.name}</h4>
                                                    </div>
                                                </div>

                                                {/* Ünvan Paralelkenarı (Biraz daha sağda) */}
                                                <div className="bg-white/95 pl-4 pr-6 py-1.5 -skew-x-12 border-l-[4px] border-l-[#1e3a5f] shadow-lg ml-6 pointer-events-auto inline-block shrink-0">
                                                    <div className="skew-x-12 flex items-center">
                                                        <p className="text-sm sm:text-base font-bold text-[#64748b] tracking-wider uppercase whitespace-nowrap">{speaker.title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {!isPast && (
                        <div className="w-full md:w-80 shrink-0">
                            <div className="bg-[#111d32] border border-[#1e3a5f] rounded-2xl p-6 sticky top-32">
                                <h3 className="text-xl font-semibold text-white mb-4">Etkinliğe Katıl</h3>
                                <p className="text-[#94a3b8] text-sm mb-6">
                                    {event.requiresRegistration
                                        ? "Bu etkinliğe katılmak için kayıt olmanız gerekmektedir. Kontenjan dolmadan yerinizi ayırtın."
                                        : "Bu etkinlik herkese açıktır. Kayıt olarak katılımcı listesinde yerinizi alabilirsiniz."}
                                </p>
                                <button
                                    onClick={handleJoinEvent}
                                    disabled={loading}
                                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${isParticipant
                                        ? 'bg-transparent border border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white'
                                        : 'bg-[#d4af37] text-[#0a1628] hover:bg-[#f59e0b]'
                                        } disabled:opacity-70 disabled:cursor-not-allowed`}
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : isParticipant ? (
                                        'Kayıt İptal Et'
                                    ) : (
                                        'Hemen Kaydol'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
