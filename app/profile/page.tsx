import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';
import Event from '@/lib/models/Event';
import ProfileClient from './ProfileClient';

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect('/login');
    }

    await connectToDatabase();

    const dbUser = await User.findOne({ email: session.user.email });

    if (!dbUser) {
        redirect('/login');
    }

    // Find events that this user has registered for
    const myEvents = await Event.find({
        requiresRegistration: true,
        participants: dbUser._id
    }).sort({ date: 1 });

    // Separate upcoming vs past for better display
    const now = new Date();
    const upcomingEvents = myEvents.filter(e => new Date(e.date) >= now);
    const pastEvents = myEvents.filter(e => new Date(e.date) < now);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-[#0a1628] text-white">
            <div className="container-custom max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <h1 className="text-3xl font-bold text-[#d4af37]">Profilim</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        {/* Profile Info Card (Client Component to handle image upload) */}
                        <ProfileClient
                            initialImage={dbUser.image}
                            name={dbUser.name}
                            email={dbUser.email}
                            role={dbUser.role}
                            createdAt={dbUser.createdAt}
                        />
                    </div>

                    <div className="md:col-span-2 space-y-8">
                        {/* My Events Section */}
                        <div className="bg-[#111d32] border border-[#1e3a5f] rounded-xl p-6 shadow-lg">
                            <h2 className="text-xl font-bold mb-6 border-b border-[#1e3a5f] pb-3">Kayıtlı Olduğum Etkinlikler</h2>

                            {myEvents.length === 0 ? (
                                <p className="text-[#94a3b8] text-center py-4 bg-[#1a2744]/30 rounded-lg">Şu an için kayıtlı olduğunuz bir etkinlik bulunmuyor.</p>
                            ) : (
                                <div className="space-y-6">
                                    {upcomingEvents.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-[#d4af37] mb-3 uppercase tracking-wider">Yaklaşan Etkinlikler</h3>
                                            <div className="space-y-3">
                                                {upcomingEvents.map(event => (
                                                    <div key={event._id.toString()} className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                        <div>
                                                            <h4 className="font-semibold">{event.title}</h4>
                                                            <p className="text-xs text-[#94a3b8] mt-1">🗓️ {new Date(event.date).toLocaleDateString('tr-TR')}</p>
                                                        </div>
                                                        <span className="text-xs bg-[#1e3a5f] text-white px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">Kayıtlısın</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {pastEvents.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-[#64748b] mb-3 uppercase tracking-wider">Geçmiş Etkinlikler</h3>
                                            <div className="space-y-3">
                                                {pastEvents.map(event => (
                                                    <div key={event._id.toString()} className="bg-[#1a2744]/50 border border-[#1e3a5f]/50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-70">
                                                        <div>
                                                            <h4 className="font-medium text-[#cbd5e1]">{event.title}</h4>
                                                            <p className="text-xs text-[#64748b] mt-1">🗓️ {new Date(event.date).toLocaleDateString('tr-TR')}</p>
                                                        </div>
                                                        <span className="text-xs bg-[#0a1628] text-[#94a3b8] px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">Tamamlandı</span>
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
            </div>
        </div>
    );
}
