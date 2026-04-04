'use client';

import { Calendar, MapPin, Clock } from 'lucide-react';
import EventJoinButton from './EventJoinButton';
import { useLanguage } from '@/app/context/LanguageContext';

export default function EventsClient({ upcomingEvents, pastEvents, sessionUserObjectId, sessionExists }: any) {
    const { t: allTranslations } = useLanguage();
    const t = allTranslations.eventsPage;

    return (
        <div className="pt-32 pb-20 min-h-screen bg-[#f8fafc]">
            <div className="container-custom">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="section-label text-[#d4af37]">{t.label}</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
                        {t.headline}
                    </h1>
                    <p className="text-lg text-[#64748b]">
                        {t.desc}
                    </p>
                </div>

                {/* Upcoming Events */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-[#0a1628] mb-8 border-b border-gray-200 pb-4">
                        {t.upcoming}
                    </h2>

                    {upcomingEvents.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingEvents.map((event: any) => (
                                <EventCard
                                    key={event._id}
                                    event={event}
                                    isPast={false}
                                    sessionUserObjectId={sessionUserObjectId}
                                    sessionExists={sessionExists}
                                    badgeText={t.badgeUpcoming}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm">
                            <p className="text-[#64748b]">{t.emptyUpcoming}</p>
                        </div>
                    )}
                </div>

                {/* Past Events */}
                {pastEvents.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-[#0a1628] mb-8 border-b border-gray-200 pb-4 opacity-80">
                            {t.past}
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pastEvents.map((event: any) => (
                                <EventCard
                                    key={event._id}
                                    event={event}
                                    isPast={true}
                                    sessionUserObjectId={sessionUserObjectId}
                                    sessionExists={sessionExists}
                                    badgeText={t.badgeUpcoming}
                                />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

const EventCard = ({ event, isPast, sessionUserObjectId, sessionExists, badgeText }: { event: any, isPast: boolean, sessionUserObjectId: string | null, sessionExists: boolean, badgeText: string }) => (
    <div className={`bg-white rounded-xl shadow-sm border ${isPast ? 'border-gray-200' : 'border-[#d4af37]/30'} overflow-hidden flex flex-col hover:shadow-md transition-shadow`}>
        {event.imageUrl ? (
            <div className="h-48 w-full overflow-hidden relative">
                <img src={event.imageUrl} alt={event.title} className={`w-full h-full object-cover ${isPast ? 'grayscale' : ''}`} />
            </div>
        ) : (
            <div className={`h-48 w-full flex items-center justify-center ${isPast ? 'bg-gray-100' : 'bg-[#0a1628]/5'}`}>
                <Calendar className={`w-12 h-12 ${isPast ? 'text-gray-300' : 'text-[#0a1628]/20'}`} />
            </div>
        )}

        <div className="p-6 flex flex-col flex-grow">
            {!isPast && (
                <span className="inline-block px-3 py-1 bg-[#d4af37]/10 text-[#d4af37] text-xs font-bold rounded-full mb-3 self-start">
                    {badgeText}
                </span>
            )}

            <h3 className={`text-xl font-bold mb-3 ${isPast ? 'text-gray-600' : 'text-[#0a1628]'}`}>
                {event.title}
            </h3>

            <p className={`text-sm mb-6 flex-grow ${isPast ? 'text-gray-500' : 'text-[#64748b]'}`}>
                {event.description}
            </p>

            <div className="space-y-2 mt-auto pt-4 border-t border-gray-100">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-[#64748b]">
                        <Calendar className="w-4 h-4 text-[#d4af37]" />
                        <span>
                            {new Date(event.date).toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            {event.endDate && new Date(event.date).toDateString() !== new Date(event.endDate).toDateString() && (
                                <>
                                    {' - '}
                                    {new Date(event.endDate).toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </>
                            )}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#64748b]">
                        <Clock className="w-4 h-4 text-[#d4af37]" />
                        <span>
                            {new Date(event.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                            {event.endDate && (
                                <>
                                    {' - '}
                                    {new Date(event.endDate).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                </>
                            )}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#64748b]">
                    <MapPin className="w-4 h-4 text-[#d4af37]" />
                    {event.locationLink ? (
                        <a href={event.locationLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] hover:underline transition-colors line-clamp-1">
                            {event.location}
                        </a>
                    ) : (
                        <span className="line-clamp-1">{event.location}</span>
                    )}
                </div>
                {event.requiresRegistration && (
                    <div className="px-6 pb-6 mt-auto">
                        <EventJoinButton
                            eventId={event._id}
                            isParticipating={sessionUserObjectId ? event.participants?.includes(sessionUserObjectId) : false}
                            isLoggedIn={sessionExists}
                            isPast={isPast}
                        />
                    </div>
                )}
            </div>
        </div>
    </div>
);
