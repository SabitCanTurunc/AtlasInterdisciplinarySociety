import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const JoinCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background scale animation
      gsap.fromTo(
        bgRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Content animations
      gsap.fromTo(
        '.cta-headline',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
          delay: 0.4,
        }
      );

      gsap.fromTo(
        '.cta-body',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
          delay: 0.8,
        }
      );

      gsap.fromTo(
        '.cta-button-main',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
          delay: 1,
        }
      );

      gsap.fromTo(
        '.cta-secondary-text',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
          delay: 1.2,
        }
      );

      // Background parallax on scroll
      gsap.to(bgRef.current, {
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(contentRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="join"
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/general/cta-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#1d2229]/90 via-[#524ff5]/50 to-[#1d2229]/90" />

      {/* Content */}
      <div ref={contentRef} className="container-custom relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Decorative icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#a1f65e] mb-8 animate-float">
            <Sparkles className="w-8 h-8 text-[#1d2229]" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            <span className="cta-headline inline-block">Ready to</span>{' '}
            <span className="cta-headline inline-block text-[#a1f65e]">Get</span>{' '}
            <span className="cta-headline inline-block text-[#a1f65e]">Started?</span>
          </h2>

          <p className="cta-body text-lg sm:text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Take the first step towards an amazing college experience. Join our
            community today!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button className="cta-button-main btn-primary text-lg px-10 py-5 animate-pulse-glow group">
              Join Now
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <p className="cta-secondary-text text-white/60 text-sm">
            It&apos;s free and always will be.
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 border border-white/20 rounded-full animate-float-slow" />
      <div className="absolute top-20 right-20 w-12 h-12 bg-[#a1f65e]/20 rounded-lg rotate-45 animate-float" />
    </section>
  );
};

export default JoinCTA;
