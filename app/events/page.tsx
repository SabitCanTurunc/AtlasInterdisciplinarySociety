import connectToDatabase from '@/lib/db';
import Event from '@/lib/models/Event';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { auth } from '@/auth';
import EventJoinButton from './components/EventJoinButton';
import User from '@/lib/models/User';

export const dynamic = 'force-dynamic'; // Ensure fresh data on every request

export default async function EventsPage() {
    await connectToDatabase();
    const session = await auth();

    // We need the user's ObjectId to check participation
    let sessionUserObjectId: string | null = null;
    if (session?.user?.email) {
        const user = await User.findOne({ email: session.user.email });
        if (user) {
            sessionUserObjectId = user._id.toString();
        }
    }

    // Fetch all events sorted by date ascending
    const allEvents = await Event.find({}).sort({ date: 1 }).lean();

    const now = new Date();

    // Categorize events
    const upcomingEvents = allEvents.filter(event => new Date(event.date) >= now);
    // For past events, we might want them sorted descending (newest past event first)
    const pastEvents = allEvents.filter(event => new Date(event.date) < now).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const EventCard = ({ event, isPast }: { event: any, isPast: boolean }) => (
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
                        YAKLAŞAN
                    </span>
                )}

                <h3 className={`text-xl font-bold mb-3 ${isPast ? 'text-gray-600' : 'text-[#0a1628]'}`}>
                    {event.title}
                </h3>

                <p className={`text-sm mb-6 flex-grow ${isPast ? 'text-gray-500' : 'text-[#64748b]'}`}>
                    {event.description}
                </p>

                <div className="space-y-2 mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-[#64748b]">
                        <Clock className="w-4 h-4 text-[#d4af37]" />
                        <span>
                            {new Date(event.date).toLocaleString('tr-TR', {
                                day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                        </span>
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
                                eventId={event._id.toString()}
                                isParticipating={event.participants?.some((p: any) => p.toString() === sessionUserObjectId)}
                                isLoggedIn={!!session}
                                isPast={isPast}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="pt-32 pb-20 min-h-screen bg-[#f8fafc]">
            <div className="container-custom">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="section-label text-[#d4af37]">Etkinlikler</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
                        Bilgiyi Eyleme Dönüştür
                    </h1>
                    <p className="text-lg text-[#64748b]">
                        Teorik bilginin ötesine geçen, interaktif ve geliştirici etkinliklerimizi buradan takip edebilirsiniz.
                    </p>
                </div>

                {/* Upcoming Events */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-[#0a1628] mb-8 border-b border-gray-200 pb-4">
                        Yaklaşan Etkinlikler
                    </h2>

                    {upcomingEvents.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingEvents.map(event => (
                                <EventCard key={event._id.toString()} event={event} isPast={false} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm">
                            <p className="text-[#64748b]">Şu an için planlanmış bir etkinlik bulunmuyor. Takipte kalın!</p>
                        </div>
                    )}
                </div>

                {/* Past Events */}
                {pastEvents.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-[#0a1628] mb-8 border-b border-gray-200 pb-4 opacity-80">
                            Geçmiş Etkinlikler
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pastEvents.map(event => (
                                <EventCard key={event._id.toString()} event={event} isPast={true} />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
