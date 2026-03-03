export type Language = 'tr' | 'en';

export const translations = {
    tr: {
        header: {
            about: 'Hakkımızda',
            disciplines: 'Disiplinler',
            projects: 'Projeler',
            events: 'Etkinlikler',
            publications: 'Yayınlar',
            team: 'Ekip',
            contact: 'İletişim',
            admin: 'Admin',
            logout: 'Çıkış Yap',
            login: 'Üye Ol / Giriş',
            adminPanel: 'Admin Paneli',
        },
        common: {
            logoAlt: 'Atlas Logosu',
            logoAbbr: 'A.I.S.',
            logoText: 'Atlas Disiplinlerarası Topluluğu',
            userAlt: 'Kullanıcı',
            toggleLanguage: 'Dili Değiştir',
        },
        footer: {
            tagline: 'Bireysel güç, kolektif akıl. Geleceği birlikte inşa ediyoruz.',
            columns: {
                corporate: 'Kurumsal',
                programs: 'Programlar',
                contact: 'İletişim'
            },
            links: {
                about: 'Hakkımızda',
                vision: 'Vizyon',
                team: 'Ekip',
                career: 'Kariyer',
                faculties: 'Fakülteler',
                projects: 'Projeler',
                events: 'Etkinlikler',
                research: 'Araştırma',
                contactUs: 'Bize Ulaşın',
                membership: 'Üyelik',
                faq: 'SSS',
                press: 'Basın'
            },
            bottom: {
                rights: 'Tüm hakları saklıdır.',
                privacy: 'Gizlilik Politikası',
                terms: 'Kullanım Koşulları'
            }
        },
        // Future sections can be added here
    },
    en: {
        header: {
            about: 'About Us',
            disciplines: 'Disciplines',
            projects: 'Projects',
            events: 'Events',
            publications: 'Publications',
            team: 'Team',
            contact: 'Contact',
            admin: 'Admin',
            logout: 'Log Out',
            login: 'Sign Up / Log In',
            adminPanel: 'Admin Panel',
        },
        common: {
            logoAlt: 'Atlas Logo',
            logoAbbr: 'A.I.S.',
            logoText: 'Atlas Interdisciplinary Society',
            userAlt: 'User',
            toggleLanguage: 'Toggle Language',
        },
        footer: {
            tagline: 'Individual strength, collective mind. Building the future together.',
            columns: {
                corporate: 'Corporate',
                programs: 'Programs',
                contact: 'Contact'
            },
            links: {
                about: 'About Us',
                vision: 'Vision',
                team: 'Team',
                career: 'Careers',
                faculties: 'Faculties',
                projects: 'Projects',
                events: 'Events',
                research: 'Research',
                contactUs: 'Contact Us',
                membership: 'Membership',
                faq: 'FAQ',
                press: 'Press'
            },
            bottom: {
                rights: 'All rights reserved.',
                privacy: 'Privacy Policy',
                terms: 'Terms of Use'
            }
        },
        // Future sections can be added here
    }
};

export type TranslationsType = typeof translations.tr;
