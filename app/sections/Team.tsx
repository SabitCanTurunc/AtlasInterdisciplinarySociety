import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  name: string;
  role: string;
  faculty: string;
  image: string;
  instagram?: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Salih Bora İflazoğlu',
    role: 'Kulüp Başkanı',
    faculty: 'Moleküler Biyoloji ve Genetik',
    image: '/images/team-new/1salih-bora-iflazoglu-kulup-baskani-molekuler-biyoloji-ve-genetik.jpeg',
    instagram: 'https://www.instagram.com/bora__salih',
    linkedin: ''
  },
  {
    name: 'Meryem Gökgöz',
    role: 'Başkan Yardımcısı',
    faculty: 'Endüstri Mühendisliği',
    image: '/images/team-new/2meryem-gokgoz-baskan-yardimcisi-endustri-muhendisligi.jpeg',
    instagram: 'https://www.instagram.com/merymgkgz',
    linkedin: ''
  },
  {
    name: 'Arda Coşkun',
    role: 'Başkan Yardımcısı',
    faculty: 'Bilgisayar Mühendisliği',
    image: '/images/team-new/3arda-coskun-baskan-yardimcisi-bilgisayar-muhendisligi.jpeg',
    instagram: 'https://www.instagram.com/ardcoskunn0/',
    linkedin: ''
  },
  {
    name: 'Ezgi Öz',
    role: 'Başkan Yardımcısı',
    faculty: 'Endüstri Mühendisliği',
    image: '/images/team-new/4ezgi-oz-baskan-yardimcisi-endustri-muhendisligi.jpeg',
    instagram: 'https://www.instagram.com/ezzgiozz_',
    linkedin: 'https://www.linkedin.com/in/ezgioz7'
  },
  {
    name: 'Selen Arıcı',
    role: 'Temsilci',
    faculty: 'Moleküler Biyoloji ve Genetik',
    image: '/images/team-new/5selen-arici-molekuler-biyoloji-ve-genetik-temsilcisi.jpeg',
    instagram: 'https://www.instagram.com/sselenarc',
    linkedin: 'https://www.linkedin.com/in/selen-ar'
  },
  {
    name: 'Nevval Sena Altunsoy',
    role: 'Temsilci',
    faculty: 'Tıp Fakültesi',
    image: '/images/team-new/6nevval-sena-altunsoy-tip-fakultesi-temsilcisi.jpeg',
    instagram: '',
    linkedin: 'https://www.linkedin.com/in/nevval-sena-altunsoy/'
  },
  {
    name: 'Hümeyra Özkan',
    role: 'Temsilci',
    faculty: 'Diş Hekimliği',
    image: '/images/team-new/7humeyra-ozkan-dis-hekimliligi-temsilcisi.jpeg',
    instagram: 'https://www.instagram.com/humeyra.ozkn',
    linkedin: 'https://www.linkedin.com/in/humeyra-'
  },
  {
    name: 'Emine Açıkgöz',
    role: 'Temsilci',
    faculty: 'Hemşirelik',
    image: '/images/team-new/8emine-acikgoz-hemsirelik-temsilcisi.jpeg',
    instagram: 'https://www.instagram.com/emineackgz',
    linkedin: 'http://linkedin.com/in/emine-a'
  },
  {
    name: 'Yarensu Erteğin',
    role: 'Temsilci',
    faculty: 'Dil ve Konuşma Terapisi',
    image: '/images/team-new/9yarensu-ertegin-dil-ve-konusma-terapisi-temsilcisi.jpeg',
    instagram: 'https://www.instagram.com/yarensuertegin',
    linkedin: ''
  },
  {
    name: 'Meryem Büşra Albayrak',
    role: 'Temsilci',
    faculty: 'Fizyoterapi ve Rehabilitasyon',
    image: '/images/team-new/10meryem-busra-albayrak-fizyoterapi-ve-rehabilitasyon-temsilcisi.jpeg',
    instagram: 'https://www.instagram.com/albayrakk_mrym',
    linkedin: 'https://www.linkedin.com/in/meryem-b'
  },
  {
    name: 'İrem Korkmaz',
    role: 'Temsilci',
    faculty: 'Psikoloji',
    image: '/images/team-new/11irem-korkmaz-psikoloji-bolumu-temsilcisi.jpeg',
    instagram: 'https://www.instagram.com/iremkrkmaz',
    linkedin: 'https://www.linkedin.com/in/irem-korkmaz-'
  },
  {
    name: 'Açelya Taştan',
    role: 'Temsilci',
    faculty: 'Dijital Oyun Tasarımı',
    image: '/images/team-new/12acelya-tastan-dijital-oyun-tasarimi.jpeg',
    instagram: 'https://www.instagram.com/acelyatst',
    linkedin: 'https://www.linkedin.com/in/acelyatst'
  },
  {
    name: 'Reyhan Ekici',
    role: 'Temsilci',
    faculty: 'Bilgisayar Mühendisliği',
    image: '/images/team-new/13reyhan-ekici-bilgisayar-muhendisligi-temsilcisi.jpeg',
    instagram: 'https://www.instagram.com/reyhanekiciii',
    linkedin: 'https://www.linkedin.com/in/reyhan-ekici-'
  },
  {
    name: 'Hazal Karaduman',
    role: 'Temsilci',
    faculty: 'Endüstri Mühendisliği',
    image: '/images/team-new/14hazal-karaduman-endustri-muhendisligi-temsilcisi.jpeg',
    instagram: 'https://www.instagram.com/hazallkrdmnn',
    linkedin: 'https://www.linkedin.com/in/hazal-karaduman-'
  },
  {
    name: 'Mustafa Alheswani',
    role: 'Temsilci',
    faculty: 'Yazılım Mühendisliği',
    image: '/images/team-new/15mustafa-alheswani-yazilim-muhendisligi-temsilcisi.jpeg',
    instagram: 'https://www.instagram.com/mustafaheswani1',
    linkedin: 'https://www.linkedin.com/in/mustafa-alheswani-'
  },
  {
    name: 'Tuana Sıla Yüksel',
    role: 'Temsilci',
    faculty: 'Görsel İletişim Tasarımı',
    image: '/images/team-new/16tuana-sila-yuksel-gorsel-iletisim-tasarimi-temsilcisi.jpeg',
    instagram: 'https://www.instagram.com/silaaqt',
    linkedin: 'https://www.linkedin.com/in/tuana-s'
  },
  {
    name: 'Pınar Gökçe',
    role: 'Temsilci',
    faculty: 'İç Mimarlık ve Çevre Tasarımı',
    image: '/images/team-new/17pinar-gokce-ic-mimarlik-ve-cevre-tasarimi-temsilcisi.jpeg',
    instagram: 'https://www.instagram.com/pnaargkc',
    linkedin: ''
  },
  {
    name: 'Berre Dedeoğlu',
    role: 'Temsilci',
    faculty: 'Mütercim Tercümanlık',
    image: '/images/team-new/18berre-dedeoglu-mutercim-tercumanlik-temsilcisi.jpeg',
    instagram: 'https://www.instagram.com/iambredl',
    linkedin: 'https://www.linkedin.com/in/berre-dedeo'
  },
  {
    name: 'Saif Daghlas',
    role: 'Int. Student Rep.',
    faculty: 'Bilgisayar Mühendisliği',
    image: '/images/team-new/19saif-daghlas-bilgisayar-muhendisligi-international-student-representative.jpeg',
    instagram: 'https://www.instagram.com/xbattar/',
    linkedin: 'https://www.linkedin.com/in/saif-daghlas-1694b5367/'
  },
  {
    name: 'Azranur Demirtaş',
    role: 'Temsilci',
    faculty: 'Yazılım Mühendisliği',
    image: '/images/team-new/20azranur-demirtas-yazilim-muhendisligi-temsilcisi.jpeg',
    instagram: 'https://www.instagram.com/demirtasazraa',
    linkedin: 'https://www.linkedin.com/in/azranur-demirtaş-'
  },
  {
    name: 'Esmanur Timur',
    role: 'Temsilci',
    faculty: 'Psikoloji',
    image: '/images/team-new/21esmanur-timur-psikoloji-bolumu-temsilcisi.jpeg',
    instagram: 'https://www.instagram.com/esmanurtimur_',
    linkedin: ''
  }
];

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-header', { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });

      gsap.fromTo('.team-card', { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: '.team-grid', start: 'top 70%' }, delay: 0.3 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="ekip" className="section-padding relative overflow-hidden" style={{ background: '#111d32' }}>
      <div className="absolute top-0 left-0 w-full h-full opacity-30"
        style={{ background: 'radial-gradient(ellipse at top center, #1e3a5f 0%, transparent 60%)' }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="team-header text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Ekibimiz</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Vizyonun Arkasındaki Güç
          </h2>
          <p className="text-lg text-[#94a3b8]">
            Farklı disiplinlerden gelen, aynı vizyonu paylaşan liderler.
          </p>
        </div>

        {/* Team Grid */}
        <div className="team-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card group">
              {/* Image */}
              <div className="relative mb-4 overflow-hidden rounded-xl aspect-[3/4]">
                <img src={member.image} alt={member.name} 
                  className="w-full h-full object-cover transition-all duration-500 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105" 
                  onError={(e) => {
                    // Fallback for image load error
                    (e.target as HTMLImageElement).src = '/images/general/hero-image.jpg'; 
                  }}
                  />
                <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(10, 22, 40, 0.9) 0%, transparent 60%)' }}>
                  <div className="flex gap-3">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" 
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#d4af37]"
                        style={{ background: '#1a2744' }}>
                        <Linkedin className="w-4 h-4 text-white" />
                      </a>
                    )}
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#d4af37]"
                        style={{ background: '#1a2744' }}>
                        <Instagram className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-[#d4af37] transition-colors leading-tight">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm mb-1 text-[#d4af37] font-medium">{member.role}</p>
                <p className="text-[10px] sm:text-xs text-[#64748b] leading-tight">{member.faculty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
