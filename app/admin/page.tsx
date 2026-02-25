import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';
import Image from 'next/image';
import Link from 'next/link';
import Event from '@/lib/models/Event';
import Project from '@/lib/models/Project';
import EventForm from './components/EventForm';
import ProjectForm from './components/ProjectForm';
import DeleteEventButton from './components/DeleteEventButton';
import DeleteProjectButton from './components/DeleteProjectButton';
import ParticipantsModal from './components/ParticipantsModal';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

export default async function AdminDashboard(props: Props) {
    const session = await auth();

    if (!session?.user || ((session.user as any).role !== 'admin' && (session.user as any).role !== 'super_admin')) {
        redirect('/');
    }

    const searchParams = await props.searchParams;
    const tab = searchParams.tab || 'users';

    await connectToDatabase();
    const dbUsers = await User.find({}).sort({ createdAt: -1 }).lean();
    const dbEvents = await Event.find({}).populate('participants', 'name email').sort({ date: 1 }).lean();
    const dbProjects = await Project.find({}).sort({ createdAt: -1 }).lean();

    const users = dbUsers.map(u => ({ ...u, _id: u._id.toString() }));
    const projects = dbProjects.map(p => ({ ...p, _id: p._id.toString() }));
    const events = dbEvents.map(e => ({
        ...e,
        _id: e._id.toString(),
        participants: e.participants?.map((p: any) => ({
            _id: p._id.toString(),
            name: p.name,
            email: p.email
        })) || []
    }));

    return (
        <div className="min-h-screen bg-[#0a1628] text-white pt-24 pb-12">
            <div className="container-custom">
                <h1 className="text-3xl font-bold mb-8 text-[#d4af37]">Admin Paneli</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 shrink-0">
                        <div className="bg-[#111d32] border border-[#1e3a5f] rounded-xl overflow-hidden flex flex-col shadow-lg sticky top-24">
                            <Link href="/admin?tab=users" className={`p-4 border-b border-[#1e3a5f] transition-all flex items-center gap-3 ${tab === 'users' ? 'bg-[#1a2744] text-white border-l-4 border-l-[#d4af37] font-medium' : 'text-[#94a3b8] hover:bg-[#1a2744]/50 border-l-4 border-l-transparent'}`}>
                                <span>👥</span> Kullanıcı Yönetimi
                            </Link>
                            <Link href="/admin?tab=events" className={`p-4 border-b border-[#1e3a5f] transition-all flex items-center gap-3 ${tab === 'events' ? 'bg-[#1a2744] text-white border-l-4 border-l-[#d4af37] font-medium' : 'text-[#94a3b8] hover:bg-[#1a2744]/50 border-l-4 border-l-transparent'}`}>
                                <span>📅</span> Etkinlik Yönetimi
                            </Link>
                            <Link href="/admin?tab=projects" className={`p-4 transition-all flex items-center gap-3 ${tab === 'projects' ? 'bg-[#1a2744] text-white border-l-4 border-l-[#d4af37] font-medium' : 'text-[#94a3b8] hover:bg-[#1a2744]/50 border-l-4 border-l-transparent'}`}>
                                <span>🚀</span> Projeler
                            </Link>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        {tab === 'projects' && (
                            <div>
                                <ProjectForm />

                                <div className="bg-[#111d32] rounded-xl p-6 border border-[#1e3a5f] mt-8 mb-8">
                                    <h2 className="text-xl font-semibold mb-4 text-white">Ekli Projeler</h2>
                                    {projects.length === 0 ? (
                                        <p className="text-[#94a3b8]">Henüz hiç proje eklenmemiş.</p>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {projects.map((project) => (
                                                <div key={project._id.toString()} className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-4 relative group flex flex-col">
                                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                        <DeleteProjectButton projectId={project._id.toString()} projectTitle={project.title} />
                                                    </div>

                                                    {project.imageUrl && (
                                                        <div className="relative w-full h-32 rounded-lg overflow-hidden mb-4 border border-[#1e3a5f]">
                                                            <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                                                            {project.featured && (
                                                                <div className="absolute top-2 left-2 bg-[#d4af37] text-[#0a1628] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                                                    Vitrin
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    <h3 className="font-semibold text-white mb-1 pr-8 text-lg">{project.title}</h3>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="text-[10px] uppercase tracking-wider bg-[#1a2744] text-[#cbd5e1] px-2 py-0.5 rounded">
                                                            {project.category}
                                                        </span>
                                                        <span className="text-[10px] uppercase tracking-wider bg-[#1e3a5f]/50 text-[#94a3b8] px-2 py-0.5 rounded">
                                                            {project.status}
                                                        </span>
                                                    </div>

                                                    <p className="text-sm text-[#cbd5e1] mb-4 line-clamp-3 flex-1">{project.description}</p>
                                                    <p className="text-xs text-[#d4af37] font-mono mt-auto pt-3 border-t border-[#1e3a5f]">{project.metrics}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {tab === 'events' && (
                            <div>
                                <EventForm />

                                <div className="bg-[#111d32] rounded-xl p-6 border border-[#1e3a5f] mb-8">
                                    <h2 className="text-xl font-semibold mb-4 text-white">Ekli Etkinlikler</h2>
                                    {events.length === 0 ? (
                                        <p className="text-[#94a3b8]">Henüz hiç etkinlik eklenmemiş.</p>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {events.map((event) => (
                                                <div key={event._id.toString()} className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-4 relative group">
                                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <DeleteEventButton eventId={event._id.toString()} />
                                                    </div>
                                                    <h3 className="font-semibold text-white mb-1 pr-8">{event.title}</h3>
                                                    <p className="text-xs text-[#d4af37] mb-2">
                                                        {new Date(event.date).toLocaleString('tr-TR', {
                                                            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                                        })}
                                                    </p>
                                                    <p className="text-sm text-[#cbd5e1] mb-2 line-clamp-2">{event.description}</p>
                                                    <p className="text-xs text-[#94a3b8] flex items-center gap-1 mb-2">
                                                        📍 {event.locationLink ? (
                                                            <a href={event.locationLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] hover:underline transition-colors line-clamp-1">
                                                                {event.location}
                                                            </a>
                                                        ) : (
                                                            <span className="line-clamp-1">{event.location}</span>
                                                        )}
                                                    </p>

                                                    {event.requiresRegistration && (
                                                        <div className="pt-3 border-t border-[#1e3a5f] mt-3 flex items-center justify-between text-xs">
                                                            <span className="text-[#94a3b8]">Üye Kaydı Açık</span>
                                                            <ParticipantsModal participants={event.participants || []} />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {tab === 'users' && (
                            <div className="bg-[#111d32] rounded-xl p-6 border border-[#1e3a5f] shadow-lg">
                                <h2 className="text-xl font-semibold mb-4 text-white">Kullanıcı Yönetimi</h2>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="text-sm text-[#94a3b8] uppercase bg-[#1a2744]">
                                            <tr>
                                                <th className="px-6 py-3 rounded-tl-lg">Kullanıcı</th>
                                                <th className="px-6 py-3">Email</th>
                                                <th className="px-6 py-3">Rol</th>
                                                <th className="px-6 py-3">Kayıt Tarihi</th>
                                                <th className="px-6 py-3 rounded-tr-lg">İşlemler</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user._id.toString()} className="border-b border-[#1e3a5f] hover:bg-[#1a2744]/50 transition-colors last:border-0">
                                                    <td className="px-6 py-4 flex items-center gap-3">
                                                        {user.image && (
                                                            <Image
                                                                src={user.image}
                                                                alt={user.name}
                                                                width={32}
                                                                height={32}
                                                                className="rounded-full ring-2 ring-[#1e3a5f]"
                                                            />
                                                        )}
                                                        <span className="font-medium text-white">{user.name}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-[#cbd5e1]">{user.email}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${user.role === 'super_admin'
                                                            ? 'bg-[#a1f65e]/20 text-[#a1f65e] border border-[#a1f65e]/30'
                                                            : user.role === 'admin'
                                                                ? 'bg-[#d4af37]/20 text-[#d4af37]'
                                                                : 'bg-[#94a3b8]/20 text-[#94a3b8]'
                                                            }`}>
                                                            {user.role === 'super_admin' ? 'Süper Admin' : user.role === 'admin' ? 'Admin' : 'Üye'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-[#64748b]">
                                                        {new Date(user.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {user.role !== 'super_admin' && (
                                                            <form action="/api/admin/users/toggle-role" method="POST">
                                                                <input type="hidden" name="userId" value={user._id.toString()} />
                                                                <input type="hidden" name="newRole" value={user.role === 'admin' ? 'user' : 'admin'} />
                                                                <button
                                                                    type="submit"
                                                                    className="text-xs text-[#a1f65e] hover:underline disabled:opacity-50 transition-colors"
                                                                    disabled={user.email === session.user?.email}
                                                                >
                                                                    {user.role === 'admin' ? 'Yetkiyi Al' : 'Admin Yap'}
                                                                </button>
                                                            </form>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
