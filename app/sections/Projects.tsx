import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  category: string;
  description: string;
  metrics: string;
  status: string;
  image: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'Autonomous Drone Swarm',
    category: 'Robotics / AI',
    description: 'Distributed coordination system enabling 50+ drones to operate as a unified intelligence.',
    metrics: '50+ drones | 99.7% uptime | $500K funding',
    status: 'In Production',
    image: '/images/projects/project-drone.jpg',
    featured: true,
  },
  {
    title: 'Quantum Encryption Protocol',
    category: 'Quantum Computing',
    description: 'Novel post-quantum cryptographic system for secure communications.',
    metrics: 'Published | 3 patents pending',
    status: 'Research Phase',
    image: '/images/projects/project-quantum.jpg',
  },
  {
    title: 'Climate Prediction Engine',
    category: 'Machine Learning',
    description: 'Neural network predicting extreme weather events with 94% accuracy.',
    metrics: '94% accuracy | 6mo lead time',
    status: 'Pilot Deployment',
    image: '/images/projects/project-climate.jpg',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
  }, []);

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
            {'Projects That Push Boundaries'.split('').map((char, i) => (
              <span key={i} className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {/* Featured Project */}
          <div className="project-featured group relative rounded-2xl overflow-hidden cursor-pointer">
            <div className="aspect-[21/9] relative">
              <Image
                src={projects[0].image}
                alt={projects[0].title}
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
                    {projects[0].category}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: '#1a2744', color: '#94a3b8' }}
                  >
                    {projects[0].status}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-[#dc2626] transition-colors">
                  {projects[0].title}
                </h3>

                <p className="text-lg max-w-2xl mb-4" style={{ color: '#94a3b8' }}>
                  {projects[0].description}
                </p>

                <div className="flex items-center justify-between">
                  <code className="text-sm" style={{ color: '#64748b' }}>
                    {projects[0].metrics}
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
          </div>

          {/* Secondary Projects */}
          <div className="projects-grid grid md:grid-cols-2 gap-8">
            {projects.slice(1).map((project, index) => (
              <div
                key={index}
                className="project-secondary group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 hover:-translate-y-3"
                style={{ borderColor: '#1a2744', background: '#111d32' }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.image}
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

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#dc2626] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm mb-4" style={{ color: '#94a3b8' }}>
                    {project.description}
                  </p>

                  <code className="text-xs" style={{ color: '#64748b' }}>
                    {project.metrics}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
