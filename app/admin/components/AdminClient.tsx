'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import EventForm from './EventForm';
import ProjectForm from './ProjectForm';
import GalleryForm from './GalleryForm';
import PublicationForm from './PublicationForm';
import DeleteEventButton from './DeleteEventButton';
import DeleteProjectButton from './DeleteProjectButton';
import DeleteGalleryImageButton from './DeleteGalleryImageButton';
import DeletePublicationButton from './DeletePublicationButton';
import TogglePublicationButton from './TogglePublicationButton';
import ParticipantsModal from './ParticipantsModal';
import SponsorForm from './SponsorForm';
import DeleteSponsorButton from './DeleteSponsorButton';

interface AdminClientProps {
    initialTab: string;
    currentUserEmail?: string | null;
    users: any[];
    projects: any[];
    galleryItems: any[];
    publications: any[];
    events: any[];
    sponsors: any[];
}

export default function AdminClient({ initialTab, currentUserEmail, users, projects, galleryItems, publications, events, sponsors }: AdminClientProps) {
    const [tab, setTab] = useState(initialTab);
    const { t: allTranslations, language } = useLanguage();
    const t = allTranslations.admin;

    return (
        <div className="min-h-screen bg-[#0a1628] text-white pt-24 pb-12">
            <div className="container-custom">
                <h1 className="text-3xl font-bold mb-8 text-[#d4af37]">{t.title}</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 shrink-0">
                        <div className="bg-[#111d32] border border-[#1e3a5f] rounded-xl overflow-hidden flex flex-col shadow-lg sticky top-24">
                            <button onClick={() => setTab('users')} className={`w-full text-left p-4 border-b border-[#1e3a5f] transition-all flex items-center gap-3 ${tab === 'users' ? 'bg-[#1a2744] text-white border-l-4 border-l-[#d4af37] font-medium' : 'text-[#94a3b8] hover:bg-[#1a2744]/50 border-l-4 border-l-transparent'}`}>
                                <span>👥</span> {t.sidebar.users}
                            </button>
                            <button onClick={() => setTab('events')} className={`w-full text-left p-4 border-b border-[#1e3a5f] transition-all flex items-center gap-3 ${tab === 'events' ? 'bg-[#1a2744] text-white border-l-4 border-l-[#d4af37] font-medium' : 'text-[#94a3b8] hover:bg-[#1a2744]/50 border-l-4 border-l-transparent'}`}>
                                <span>📅</span> {t.sidebar.events}
                            </button>
                            <button onClick={() => setTab('projects')} className={`w-full text-left p-4 border-b border-[#1e3a5f] transition-all flex items-center gap-3 ${tab === 'projects' ? 'bg-[#1a2744] text-white border-l-4 border-l-[#d4af37] font-medium' : 'text-[#94a3b8] hover:bg-[#1a2744]/50 border-l-4 border-l-transparent'}`}>
                                <span>🚀</span> {t.sidebar.projects}
                            </button>
                            <button onClick={() => setTab('publications')} className={`w-full text-left p-4 border-b border-[#1e3a5f] transition-all flex items-center gap-3 ${tab === 'publications' ? 'bg-[#1a2744] text-white border-l-4 border-l-[#d4af37] font-medium' : 'text-[#94a3b8] hover:bg-[#1a2744]/50 border-l-4 border-l-transparent'}`}>
                                <span>📚</span> {t.sidebar.publications}
                            </button>
                            <button onClick={() => setTab('gallery')} className={`w-full text-left p-4 border-b border-[#1e3a5f] transition-all flex items-center gap-3 ${tab === 'gallery' ? 'bg-[#1a2744] text-white border-l-4 border-l-[#d4af37] font-medium' : 'text-[#94a3b8] hover:bg-[#1a2744]/50 border-l-4 border-l-transparent'}`}>
                                <span>🖼️</span> {t.sidebar.gallery}
                            </button>
                            <button onClick={() => setTab('sponsors')} className={`w-full text-left p-4 transition-all flex items-center gap-3 ${tab === 'sponsors' ? 'bg-[#1a2744] text-white border-l-4 border-l-[#d4af37] font-medium' : 'text-[#94a3b8] hover:bg-[#1a2744]/50 border-l-4 border-l-transparent'}`}>
                                <span>🤝</span> {t.sidebar.sponsors}
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        {tab === 'sponsors' && (
                            <div>
                                <SponsorForm />

                                <div className="bg-[#111d32] rounded-xl p-6 border border-[#1e3a5f] mt-8 mb-8 shadow-lg">
                                    <h2 className="text-xl font-semibold mb-6 text-white">{t.sponsors.title}</h2>
                                    {sponsors.length === 0 ? (
                                        <p className="text-[#94a3b8] bg-[#0a1628] p-4 rounded-lg border border-[#1e3a5f]">{t.sponsors.empty}</p>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                            {sponsors.map((sponsor) => (
                                                <div key={sponsor._id.toString()} className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-4 relative group flex flex-col items-center">
                                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                        <DeleteSponsorButton sponsorId={sponsor._id.toString()} />
                                                    </div>

                                                    <div className="relative w-full h-24 rounded-md overflow-hidden bg-white mb-3 p-2 flex items-center justify-center">
                                                        <Image
                                                            src={sponsor.imageUrl}
                                                            alt={sponsor.name}
                                                            fill
                                                            className="object-contain p-2"
                                                        />
                                                    </div>

                                                    <h3 className="font-semibold text-white mb-1 w-full text-center line-clamp-1">{sponsor.name}</h3>
                                                    {sponsor.websiteUrl && (
                                                        <a href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#3b82f6] hover:underline w-full text-center truncate pr-2 pl-2">
                                                            {sponsor.websiteUrl.replace(/^https?:\/\//, '')}
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {tab === 'gallery' && (
                            <div>
                                <GalleryForm />

                                <div className="bg-[#111d32] rounded-xl p-6 border border-[#1e3a5f] mt-8 mb-8">
                                    <h2 className="text-xl font-semibold mb-4 text-white">{t.gallery.title}</h2>
                                    {galleryItems.length === 0 ? (
                                        <p className="text-[#94a3b8]">{t.gallery.empty}</p>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                            {galleryItems.map((item) => (
                                                <div key={item._id.toString()} className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-2 relative group flex flex-col items-center">
                                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                        <DeleteGalleryImageButton imageId={item._id.toString()} />
                                                    </div>

                                                    <div className="relative w-full aspect-video rounded-md overflow-hidden bg-black/50">
                                                        <Image
                                                            src={item.imageUrl}
                                                            alt={item.title}
                                                            fill
                                                            className="object-contain"
                                                            sizes="(max-width: 768px) 100vw, 33vw"
                                                        />
                                                    </div>

                                                    <p className="text-sm text-[#cbd5e1] mt-3 line-clamp-1 w-full text-center px-2">{item.title}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {tab === 'publications' && (
                            <div>
                                <PublicationForm />

                                <div className="bg-[#111d32] rounded-xl p-6 border border-[#1e3a5f] mt-8 mb-8 shadow-lg">
                                    <h2 className="text-xl font-semibold mb-6 text-white">{t.publications.title}</h2>
                                    {publications.length === 0 ? (
                                        <p className="text-[#94a3b8] bg-[#0a1628] p-4 rounded-lg border border-[#1e3a5f]">{t.publications.empty}</p>
                                    ) : (
                                        <div className="space-y-4">
                                            {publications.map((pub) => (
                                                <div key={pub._id.toString()} className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-5 relative group flex flex-col md:flex-row gap-4 items-start md:items-center hover:border-[#3b82f6]/50 transition-colors">

                                                    {/* Left: Info */}
                                                    <div className="flex-grow">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#1a2744] text-[#cbd5e1] border border-[#1e3a5f]">
                                                                {pub.type}
                                                            </span>
                                                            <span className="text-xs text-[#64748b] font-medium">{pub.date}</span>
                                                        </div>
                                                        <h3 className="font-bold text-lg text-white mb-1 group-hover:text-[#d4af37] transition-colors line-clamp-1">{pub.title}</h3>
                                                        <p className="text-sm text-[#94a3b8] line-clamp-2">{pub.desc}</p>
                                                        {pub.link && pub.link !== '#' && (
                                                            <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-xs text-[#3b82f6] hover:underline inline-flex items-center gap-1 mt-2">
                                                                🔗 {t.publications.goToLink}
                                                            </a>
                                                        )}
                                                    </div>

                                                    {/* Right: Actions */}
                                                    <div className="flex flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto mt-2 md:mt-0 justify-end pt-3 md:pt-0 border-t md:border-t-0 border-[#1e3a5f]">
                                                        <TogglePublicationButton publicationId={pub._id.toString()} initialStatus={pub.isActive} />
                                                        <DeletePublicationButton publicationId={pub._id.toString()} title={pub.title} />
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {tab === 'projects' && (
                            <div>
                                <ProjectForm />

                                <div className="bg-[#111d32] rounded-xl p-6 border border-[#1e3a5f] mt-8 mb-8">
                                    <h2 className="text-xl font-semibold mb-4 text-white">{t.projects.title}</h2>
                                    {projects.length === 0 ? (
                                        <p className="text-[#94a3b8]">{t.projects.empty}</p>
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
                                                                    {t.projects.featuredBadge}
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
                                    <h2 className="text-xl font-semibold mb-4 text-white">{t.events.title}</h2>
                                    {events.length === 0 ? (
                                        <p className="text-[#94a3b8]">{t.events.empty}</p>
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
                                                            <span className="text-[#94a3b8]">{t.events.regOpen}</span>
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
                                <h2 className="text-xl font-semibold mb-4 text-white">{t.users.title}</h2>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="text-sm text-[#94a3b8] uppercase bg-[#1a2744]">
                                            <tr>
                                                <th className="px-6 py-3 rounded-tl-lg">{t.users.colUser}</th>
                                                <th className="px-6 py-3">{t.users.colEmail}</th>
                                                <th className="px-6 py-3">{t.users.colRole}</th>
                                                <th className="px-6 py-3">{t.users.colDate}</th>
                                                <th className="px-6 py-3 rounded-tr-lg">{t.users.colActions}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...users].sort((a, b) => {
                                                const roleOrder: Record<string, number> = { super_admin: 0, admin: 1, user: 2 };
                                                const aRole = roleOrder[a.role] ?? 3;
                                                const bRole = roleOrder[b.role] ?? 3;
                                                return aRole - bRole;
                                            }).map((user) => (
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
                                                        <span className={`whitespace-nowrap px-2 py-1 rounded text-xs font-medium ${user.role === 'super_admin'
                                                            ? 'bg-[#a1f65e]/20 text-[#a1f65e] border border-[#a1f65e]/30'
                                                            : user.role === 'admin'
                                                                ? 'bg-[#d4af37]/20 text-[#d4af37]'
                                                                : 'bg-[#94a3b8]/20 text-[#94a3b8]'
                                                            }`}>
                                                            {user.role === 'super_admin' ? t.users.roleSuper : user.role === 'admin' ? t.users.roleAdmin : t.users.roleUser}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-[#64748b]">
                                                        {new Date(user.createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR')}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {user.role !== 'super_admin' && (
                                                            <form action="/api/admin/users/toggle-role" method="POST">
                                                                <input type="hidden" name="userId" value={user._id.toString()} />
                                                                <input type="hidden" name="newRole" value={user.role === 'admin' ? 'user' : 'admin'} />
                                                                <button
                                                                    type="submit"
                                                                    className="text-xs text-[#a1f65e] hover:underline disabled:opacity-50 transition-colors"
                                                                    disabled={user.email === currentUserEmail}
                                                                >
                                                                    {user.role === 'admin' ? t.users.actionRevoke : t.users.actionGrant}
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
        </div >
    );
}
