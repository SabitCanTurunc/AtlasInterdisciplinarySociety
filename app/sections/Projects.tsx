import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  _id: string;
  title: string;
  category: string;
  shortDescription?: string;
  description: string;
  metrics: string;
  status: string;
  image?: string;
  imageUrl?: string;
  featured?: boolean;
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data.projects || []);
        }
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(
        '.projects-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.projects-headline span',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.015,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          delay: 0.1,
        }
      );

      // Featured project
      gsap.fromTo(
        '.project-featured',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: '.project-featured',
            start: 'top 70%',
          },
          delay: 0.4,
        }
      );

      // Secondary projects
      gsap.fromTo(
        '.project-secondary',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 70%',
          },
          delay: 0.6,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  // Find the featured project (first one marked as featured, or just first one if none)
  let featuredProject = projects.find(p => p.featured);
  let secondaryProjects = projects.filter(p => !p.featured);

  if (!featuredProject && projects.length > 0) {
    featuredProject = projects[0];
    secondaryProjects = projects.slice(1);
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding relative overflow-hidden"
      style={{ background: '#0a1628' }}
    >
      {/* Background accent */}
      <div
        className="absolute bottom-0 left-0 w-full h-1/2 opacity-20"
        style={{ background: 'radial-gradient(ellipse at bottom left, #dc2626 0%, transparent 50%)' }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="projects-label section-label">What We Build</span>
          <h2 className="projects-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            {'Sınırları Aşan Projeler'.split('').map((char, i) => (
              <span key={i} className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-[#1e3a5f] border-t-[#d4af37] rounded-full animate-spin"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-[#94a3b8] py-20 bg-[#111d32] border border-[#1e3a5f] rounded-2xl">
            Henüz gösterilecek bir proje bulunmamaktadır.
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured Project */}
            {featuredProject && (
              <Link href={`/projects/${featuredProject._id}`} className="project-featured group relative rounded-2xl overflow-hidden cursor-pointer block">
                <div className="aspect-[21/9] relative">
                  <Image
                    src={featuredProject.image || featuredProject.imageUrl || ''}
                    alt={featuredProject.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(to top, rgba(10, 22, 40, 0.95) 0%, rgba(10, 22, 40, 0.4) 50%, transparent 100%)',
                      opacity: 0.9,
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
                        style={{ background: '#dc2626', color: 'white' }}
                      >
                        {featuredProject.category}
                      </span>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ background: '#1a2744', color: '#94a3b8' }}
                      >
                        {featuredProject.status}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-[#dc2626] transition-colors">
                      {featuredProject.title}
                    </h3>

                    <p className="text-lg max-w-2xl mb-4" style={{ color: '#94a3b8' }}>
                      {featuredProject.shortDescription || featuredProject.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <code className="text-sm" style={{ color: '#64748b' }}>
                        {featuredProject.metrics}
                      </code>
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#dc2626]"
                        style={{ background: '#1a2744' }}
                      >
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Secondary Projects */}
            <div className="projects-grid grid md:grid-cols-2 gap-8">
              {secondaryProjects.map((project, index) => (
                <Link
                  href={`/projects/${project._id}`}
                  key={index}
                  className="project-secondary group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 hover:-translate-y-3 block"
                  style={{ borderColor: '#1a2744', background: '#111d32' }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={project.image || project.imageUrl || ''}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
                      style={{
                        background: 'linear-gradient(to top, rgba(10, 22, 40, 0.95) 0%, rgba(10, 22, 40, 0.3) 60%, transparent 100%)',
                        opacity: 0.7,
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium uppercase tracking-wider"
                        style={{ background: '#1a2744', color: '#94a3b8' }}
                      >
                        {project.category}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: '#64748b' }}
                      >
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#dc2626] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm mb-4 line-clamp-2" style={{ color: '#94a3b8' }}>
                      {project.shortDescription || project.description}
                    </p>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#1a2744]">
                      <ArrowUpRight className="w-5 h-5 group-hover:text-[#dc2626] transition-colors" style={{ color: '#64748b' }} />
                      <code className="text-xs" style={{ color: '#64748b' }}>
                        {project.metrics}
                      </code>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
