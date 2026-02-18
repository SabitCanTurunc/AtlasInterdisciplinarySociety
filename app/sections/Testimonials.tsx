import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  name: string;
  year: string;
  image: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Jessica Miller',
    year: 'Senior',
    image: '/images/testimonials/testimonial-jessica.jpg',
    quote: 'Joining this club was the best decision I made in college. I\'ve grown so much as a leader and made friends for life.',
    rating: 5,
  },
  {
    name: 'David Park',
    year: 'Junior',
    image: '/images/testimonials/testimonial-david.jpg',
    quote: 'The events are incredible! Every workshop and social has taught me something valuable that I use every day.',
    rating: 5,
  },
  {
    name: 'Amanda Foster',
    year: 'Sophomore',
    image: '/images/testimonials/testimonial-amanda.jpg',
    quote: 'I was shy and hesitant at first, but everyone was so welcoming. Now I\'m actively involved in planning events!',
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(
        '.testimonials-label',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.testimonials-headline',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          delay: 0.1,
        }
      );

      gsap.fromTo(
        '.testimonials-subtitle',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          delay: 0.4,
        }
      );

      // Slider container
      gsap.fromTo(
        '.testimonials-slider',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
          delay: 0.5,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-padding bg-[#f0f0f0] relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:sticky lg:top-32">
            <span className="testimonials-label section-label">Testimonials</span>
            <h2 className="testimonials-headline text-4xl sm:text-5xl font-extrabold text-[#1d2229] mb-4">
              What Our Members Say
            </h2>
            <p className="testimonials-subtitle text-lg text-[#6a6a6a] mb-8">
              Hear from students whose lives have been transformed by our community.
            </p>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#a1f65e] transition-colors duration-300 group"
              >
                <ChevronLeft className="w-6 h-6 text-[#1d2229] group-hover:text-[#1d2229]" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#a1f65e] transition-colors duration-300 group"
              >
                <ChevronRight className="w-6 h-6 text-[#1d2229] group-hover:text-[#1d2229]" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-[#a1f65e] w-8'
                      : 'bg-[#1d2229]/20 hover:bg-[#1d2229]/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Content - Slider */}
          <div className="testimonials-slider relative perspective-1000">
            <div className="relative h-[400px] sm:h-[350px]">
              {testimonials.map((testimonial, index) => {
                const isActive = index === activeIndex;
                const isPrev =
                  index === (activeIndex - 1 + testimonials.length) % testimonials.length;
                const isNext = index === (activeIndex + 1) % testimonials.length;

                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-600 preserve-3d ${
                      isActive
                        ? 'opacity-100 translate-x-0 rotate-y-0 z-20'
                        : isPrev
                        ? 'opacity-50 -translate-x-[30%] rotate-y-[25deg] z-10'
                        : isNext
                        ? 'opacity-50 translate-x-[30%] rotate-y-[-25deg] z-10'
                        : 'opacity-0 translate-x-0 rotate-y-0 z-0'
                    }`}
                    style={{
                      transform: isActive
                        ? 'translateX(0) translateZ(50px) rotateY(0deg)'
                        : isPrev
                        ? 'translateX(-30%) translateZ(-50px) rotateY(25deg)'
                        : isNext
                        ? 'translateX(30%) translateZ(-50px) rotateY(-25deg)'
                        : 'translateX(0) translateZ(-100px) rotateY(0deg)',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-xl h-full flex flex-col">
                      {/* Quote Icon */}
                      <div className="mb-6 animate-float">
                        <div className="w-14 h-14 rounded-full bg-[#a1f65e] flex items-center justify-center">
                          <Quote className="w-7 h-7 text-[#1d2229]" />
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-[#a1f65e] text-[#a1f65e]"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-lg sm:text-xl text-[#1d2229] leading-relaxed mb-6 flex-grow">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4 pt-6 border-t border-[#f0f0f0]">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover ring-2 ring-[#a1f65e] ring-offset-2"
                        />
                        <div>
                          <h4 className="font-bold text-[#1d2229]">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-[#6a6a6a]">{testimonial.year}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
