// script to migrate local team data to MongoDB
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const TeamMemberSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        role: { type: String, required: true },
        faculty: { type: String },
        imageUrl: { type: String, required: true },
        instagram: { type: String },
        twitter: { type: String },
        linkedin: { type: String },
        publicId: { type: String }
    },
    { timestamps: true }
);

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);

const teamMembers = [
    {
        name: 'Salih Bora İflazoğlu',
        role: 'Kulüp Başkanı',
        faculty: 'mbg',
        image: '/images/team-new/1salih-bora-iflazoglu-kulup-baskani-molekuler-biyoloji-ve-genetik.jpeg',
        instagram: 'https://www.instagram.com/bora__salih',
        linkedin: ''
    },
    {
        name: 'Meryem Gökgöz',
        role: 'Başkan Yardımcısı',
        faculty: 'ie',
        image: '/images/team-new/2meryem-gokgoz-baskan-yardimcisi-endustri-muhendisligi.jpeg',
        instagram: 'https://www.instagram.com/merymgkgz',
        linkedin: ''
    },
    {
        name: 'Arda Coşkun',
        role: 'Başkan Yardımcısı',
        faculty: 'ce',
        image: '/images/team-new/3arda-coskun-baskan-yardimcisi-bilgisayar-muhendisligi.jpeg',
        instagram: 'https://www.instagram.com/ardcoskunn0/',
        linkedin: ''
    },
    {
        name: 'Ezgi Öz',
        role: 'Başkan Yardımcısı',
        faculty: 'ie',
        image: '/images/team-new/4ezgi-oz-baskan-yardimcisi-endustri-muhendisligi.jpeg',
        instagram: 'https://www.instagram.com/ezzgiozz_',
        linkedin: 'https://www.linkedin.com/in/ezgioz7'
    },
    {
        name: 'Selen Arıcı',
        role: 'Temsilci',
        faculty: 'mbg',
        image: '/images/team-new/5selen-arici-molekuler-biyoloji-ve-genetik-temsilcisi.jpeg',
        instagram: 'https://www.instagram.com/sselenarc',
        linkedin: 'https://www.linkedin.com/in/selen-ar'
    },
    {
        name: 'Nevval Sena Altunsoy',
        role: 'Temsilci',
        faculty: 'med',
        image: '/images/team-new/6nevval-sena-altunsoy-tip-fakultesi-temsilcisi.jpeg',
        instagram: '',
        linkedin: 'https://www.linkedin.com/in/nevval-sena-altunsoy/'
    },
    {
        name: 'Hümeyra Özkan',
        role: 'Temsilci',
        faculty: 'dent',
        image: '/images/team-new/7humeyra-ozkan-dis-hekimliligi-temsilcisi.jpeg',
        instagram: 'https://www.instagram.com/humeyra.ozkn',
        linkedin: 'https://www.linkedin.com/in/humeyra-'
    },
    {
        name: 'Emine Açıkgöz',
        role: 'Temsilci',
        faculty: 'nurs',
        image: '/images/team-new/8emine-acikgoz-hemsirelik-temsilcisi.jpeg',
        instagram: 'https://www.instagram.com/emineackgz',
        linkedin: 'http://linkedin.com/in/emine-a'
    },
    {
        name: 'Yarensu Erteğin',
        role: 'Temsilci',
        faculty: 'slt',
        image: '/images/team-new/9yarensu-ertegin-dil-ve-konusma-terapisi-temsilcisi.jpeg',
        instagram: 'https://www.instagram.com/yarensuertegin',
        linkedin: ''
    },
    {
        name: 'Meryem Büşra Albayrak',
        role: 'Temsilci',
        faculty: 'pt',
        image: '/images/team-new/10meryem-busra-albayrak-fizyoterapi-ve-rehabilitasyon-temsilcisi.jpeg',
        instagram: 'https://www.instagram.com/albayrakk_mrym',
        linkedin: 'https://www.linkedin.com/in/meryem-b'
    },
    {
        name: 'İrem Korkmaz',
        role: 'Temsilci',
        faculty: 'psych',
        image: '/images/team-new/11irem-korkmaz-psikoloji-bolumu-temsilcisi.jpeg',
        instagram: 'https://www.instagram.com/iremkrkmaz',
        linkedin: 'https://www.linkedin.com/in/irem-korkmaz-'
    },
    {
        name: 'Açelya Taştan',
        role: 'Temsilci',
        faculty: 'dgd',
        image: '/images/team-new/12acelya-tastan-dijital-oyun-tasarimi.jpeg',
        instagram: 'https://www.instagram.com/acelyatst',
        linkedin: 'https://www.linkedin.com/in/acelyatst'
    },
    {
        name: 'Reyhan Ekici',
        role: 'Temsilci',
        faculty: 'ce',
        image: '/images/team-new/13reyhan-ekici-bilgisayar-muhendisligi-temsilcisi.jpeg',
        instagram: 'https://www.instagram.com/reyhanekiciii',
        linkedin: 'https://www.linkedin.com/in/reyhan-ekici-'
    },
    {
        name: 'Hazal Karaduman',
        role: 'Temsilci',
        faculty: 'ie',
        image: '/images/team-new/14hazal-karaduman-endustri-muhendisligi-temsilcisi.jpeg',
        instagram: 'https://www.instagram.com/hazallkrdmnn',
        linkedin: 'https://www.linkedin.com/in/hazal-karaduman-'
    },
    {
        name: 'Mustafa Alheswani',
        role: 'Temsilci',
        faculty: 'se',
        image: '/images/team-new/15mustafa-alheswani-yazilim-muhendisligi-temsilcisi.jpeg',
        instagram: 'https://www.instagram.com/mustafaheswani1',
        linkedin: 'https://www.linkedin.com/in/mustafa-alheswani-'
    },
    {
        name: 'Tuana Sıla Yüksel',
        role: 'Temsilci',
        faculty: 'vcd',
        image: '/images/team-new/16tuana-sila-yuksel-gorsel-iletisim-tasarimi-temsilcisi.jpeg',
        instagram: 'https://www.instagram.com/silaaqt',
        linkedin: 'https://www.linkedin.com/in/tuana-s'
    },
    {
        name: 'Pınar Gökçe',
        role: 'Temsilci',
        faculty: 'iaed',
        image: '/images/team-new/17pinar-gokce-ic-mimarlik-ve-cevre-tasarimi-temsilcisi.jpeg',
        instagram: 'https://www.instagram.com/pnaargkc',
        linkedin: ''
    },
    {
        name: 'Berre Dedeoğlu',
        role: 'Temsilci',
        faculty: 'ti',
        image: '/images/team-new/18berre-dedeoglu-mutercim-tercumanlik-temsilcisi.jpeg',
        instagram: 'https://www.instagram.com/iambredl',
        linkedin: 'https://www.linkedin.com/in/berre-dedeo'
    },
    {
        name: 'Saif Daghlas',
        role: 'Int. Student Rep.',
        faculty: 'ce',
        image: '/images/team-new/19saif-daghlas-bilgisayar-muhendisligi-international-student-representative.jpeg',
        instagram: 'https://www.instagram.com/xbattar/',
        linkedin: 'https://www.linkedin.com/in/saif-daghlas-1694b5367/'
    },
    {
        name: 'Azranur Demirtaş',
        role: 'Temsilci',
        faculty: 'se',
        image: '/images/team-new/20azranur-demirtas-yazilim-muhendisligi-temsilcisi.jpeg',
        instagram: 'https://www.instagram.com/demirtasazraa',
        linkedin: 'https://www.linkedin.com/in/azranur-demirtaş-'
    },
    {
        name: 'Esmanur Timur',
        role: 'Temsilci',
        faculty: 'psych',
        image: '/images/team-new/21esmanur-timur-psikoloji-bolumu-temsilcisi.jpeg',
        instagram: 'https://www.instagram.com/esmanurtimur_',
        linkedin: ''
    }
];

async function migrate() {
    console.log('Connecting to DB...');
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected.');

    // Remove existing to avoid duplicates if re-run
    await TeamMember.deleteMany({});
    console.log('Cleared existing TeamMembers.');

    const formattedMembers = teamMembers.map(m => ({
        name: m.name,
        role: m.role,
        faculty: m.faculty,
        imageUrl: m.image,
        instagram: m.instagram,
        linkedin: m.linkedin,
        twitter: '',
        publicId: m.image // Use original path as publicId for static assets for now
    }));

    await TeamMember.insertMany(formattedMembers);
    console.log(`Successfully inserted ${formattedMembers.length} team members.`);

    await mongoose.disconnect();
    console.log('Disconnected.');
}

migrate().catch(console.error);
