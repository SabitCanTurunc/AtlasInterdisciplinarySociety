import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/db';
import Project from '@/lib/models/Project';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, BarChart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    await connectToDatabase();
    let project = null;

    try {
        const dbProject = await Project.findById(id).lean();
        if (dbProject) {
            project = { ...dbProject, _id: dbProject._id.toString() };
        }
    } catch (error) {
        console.error("Invalid Project ID:", error);
    }

    if (!project) {
        notFound();
    }

    return (
        <div className="bg-[#0a1628] min-h-screen pt-32 pb-24 text-white">
            <div className="container-custom max-w-4xl mx-auto">
                <Link href="/projects" className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-[#d4af37] transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Projeler Dön
                </Link>

                <div className="mb-8 relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-[#1e3a5f]">
                    <Image
                        src={project.imageUrl || project.image || ''}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="px-3 py-1 bg-[#dc2626] text-white text-xs font-medium rounded-full uppercase tracking-wider flex items-center gap-1.5">
                        <Tag className="w-3 h-3" />
                        {project.category}
                    </span>
                    <span className="px-3 py-1 bg-[#1e3a5f]/50 text-[#cbd5e1] text-xs font-medium rounded-full flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {project.status}
                    </span>
                    <span className="px-3 py-1 bg-[#d4af37]/20 text-[#d4af37] text-xs font-medium rounded-full flex items-center gap-1.5">
                        <BarChart className="w-3 h-3" />
                        {project.metrics}
                    </span>
                    {project.featured && (
                        <span className="px-3 py-1 bg-[#f59e0b]/20 text-[#f59e0b] text-xs font-medium rounded-full uppercase tracking-wider">
                            Vitrin
                        </span>
                    )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-8">{project.title}</h1>

                {project.shortDescription && (
                    <div className="text-xl text-[#d4af37] font-medium leading-relaxed mb-8 pl-4 border-l-4 border-[#d4af37]">
                        {project.shortDescription}
                    </div>
                )}

                <div className="prose prose-invert prose-lg max-w-none prose-p:text-[#cbd5e1] prose-p:leading-relaxed">
                    {/* Render paragraphs preserving newlines if they exist */}
                    {project.description.split('\n').map((paragraph: string, index: number) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
