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
        home: {
            hero: {
                headline: ['Geleceği', 'Birlikte', 'Şekillendiriyoruz'],
                subtitle: 'İstanbul Atlas Üniversitesi\'nin disiplinlerarası vizyon platformu',
                cta: 'Keşfet',
                stats: {
                    members: 'Aktif Üye',
                    faculties: 'Fakülte',
                    projects: 'Proje'
                }
            },
            vision: {
                label: 'Vizyonumuz',
                headline: 'Bireysel Güç, Kolektif Akıl',
                p1: 'ATLAS INTERDISCIPLINARY SOCIETY (A.I.S.), öğrencilerini özgür düşünmeye, yenilik üretmeye ve geleceği şekillendirmeye teşvik eden bir vizyon platformudur.',
                p2: 'Multidisipliner ekibi ve temsilcileri ile sürekli gelişim, değişim ve birlik içinde güçlenmeyi hedefler.',
                quote: '"Bireysel gücü kolektif akılla buluşturur; fark yaratan fikirler, özgür alanlarda büyür."',
                pillars: {
                    development: { title: 'Sürekli Gelişim', desc: 'Değişime açık, gelişime odaklı bir yaklaşımla kendimizi sürekli yeniliyoruz.' },
                    collaboration: { title: 'Birlikte Güçlenme', desc: 'Kolektif bilgi ve deneyimle güçlü bireyler yetiştiriyoruz.' },
                    impact: { title: 'Fark Yaratmak', desc: 'Özgür alanlarda büyüyen fikirlerle topluma değer katıyoruz.' }
                }
            },
            gallery: {
                label: 'Galeri',
                headline: 'Anılarımız',
                desc: 'Birlikte başardığımız, eğlendiğimiz ve öğrendiğimiz anlardan kareler.'
            },
            contact: {
                headline: 'Bize Katıl',
                desc: 'Geleceği şekillendirmek için ilk adımı at. A.I.S. ailesine katıl, fark yarat.',
                ctaJoin: 'Üye Ol',
                ctaContact: 'İletişime Geç',
                ctaWhatsApp: 'WhatsApp Topluluğuna Katıl'
            }
        },
        disciplines: {
            title1: 'DİSİPLİNLER',
            title2: 'AĞI',
            subtitle: 'Yatayda genişleyen, birbirine kenetlenmiş kolektif zeka hücreleri.',
            list: {
                medicine: 'Tıp',
                dentistry: 'Diş Hekimliği',
                nursing: 'Hemşirelik',
                midwifery: 'Ebelik',
                physiotherapy: 'Fizyoterapi ve Rehabilitasyon',
                speechTherapy: 'Dil ve Konuşma Terapisi',
                psychology: 'Psikoloji',
                molecularBiology: 'Moleküler Biyoloji ve Genetik',
                computerEng: 'Bilgisayar Mühendisliği',
                softwareEng: 'Yazılım Mühendisliği',
                industrialEng: 'Endüstri Mühendisliği',
                electricalEng: 'Elektrik Elektronik Müh.',
                digitalGameDesign: 'Dijital Oyun Tasarımı',
                visualCommunication: 'Görsel İletişim Tasarımı',
                interiorArchitecture: 'İç Mimarlık ve Çevre Tasarımı',
                translation: 'Mütercim Tercümanlık',
                business: 'İşletme'
            }
        },
        projects: {
            label: 'Neler Geliştiriyoruz',
            headline: 'Sınırları Aşan Projeler',
            emptyState: 'Henüz gösterilecek bir proje bulunmamaktadır.'
        },
        events: {
            label: 'Etkinliklerimiz',
            headline: 'Bilgiyi Eyleme Dönüştür',
            desc: 'Teorik bilginin ötesine geçen, interaktif ve geliştirici etkinlikler.',
            categories: {
                social: { title: 'Sosyal Sorumluluk', desc: 'Topluma değer katan projeler.' },
                science: { title: 'Akademi ve Bilim', desc: 'Sektör liderleriyle söyleşiler.' },
                leadership: { title: 'Liderlik Atölyeleri', desc: 'Kişisel ve profesyonel gelişim.' },
                summit: { title: 'Atlas Summit', desc: 'Disiplinlerarası büyük zirve.' }
            },
            featured: {
                badge: 'YAKLAŞAN ETKİNLİK',
                title: "Atlas Interdisciplinary Summit '26",
                desc: 'Farklı disiplinlerden uzmanların bir araya geleceği, geleceğin teknolojilerinin tartışılacağı büyük zirveye hazır mısın?',
                registerBtn: 'Hemen Kayıt Ol',
                detailsBtn: 'Detaylı Bilgi',
                dateLabel: 'Tarih',
                dateValue: '15 Mayıs 2026',
                locationLabel: 'Konum',
                locationValue: 'Vadi Yerleşkesi Konferans Salonu',
                note: '* Kontenjan sınırlıdır. Erken kayıt avantajlarından yararlanmak için formu doldurmayı unutmayın.'
            }
        },
        eventsPage: {
            label: 'Etkinlikler',
            headline: 'Bilgiyi Eyleme Dönüştür',
            desc: 'Teorik bilginin ötesine geçen, interaktif ve geliştirici etkinliklerimizi buradan takip edebilirsiniz.',
            upcoming: 'Yaklaşan Etkinlikler',
            past: 'Geçmiş Etkinlikler',
            emptyUpcoming: 'Şu an için planlanmış bir etkinlik bulunmuyor. Takipte kalın!',
            badgeUpcoming: 'YAKLAŞAN'
        },
        admin: {
            title: 'Admin Paneli',
            sidebar: {
                users: 'Kullanıcı Yönetimi',
                events: 'Etkinlik Yönetimi',
                projects: 'Projeler',
                publications: 'Yayın Yönetimi',
                gallery: 'Galeri Yönetimi'
            },
            gallery: {
                title: 'Galeri Görselleri',
                empty: "Henüz hiç görsel eklenmemiş.",
                addTitle: "Yeni Görsel Ekle",
                imageTitle: "Başlık / Açıklama",
                imageFile: "Görsel Seç (Önerilen: 4:3 format veya yatay)",
                submitBtn: "Galeriye Ekle",
                addingBtn: 'Ekleniyor...',
                deleteMsg: 'Bu görseli silmek istediğinize emin misiniz?',
                cancelBtn: 'İptal',
                confirmDeleteBtn: 'Evet, Sil',
                deletingBtn: 'Siliniyor...',
                successAdded: "Görsel başarıyla eklendi.",
                successDeleted: 'Görsel silindi',
                errorMsg: "Görsel yüklenirken bir hata oluştu.",
                deleteConfirm: "Bu görseli silmek istediğinize emin misiniz?",
                deleteBtn: "Görseli Sil"
            },
            publications: {
                title: 'Yayınlar Listesi',
                empty: 'Henüz hiç yayın eklenmemiş.',
                addTitle: 'Yeni Yayın Ekle',
                pubTitle: 'Yayın Başlığı',
                pubType: 'Yayın Türü',
                pubDate: 'Tarih',
                pubDesc: 'Açıklama',
                pubLink: 'Bağlantı (Opsiyonel)',
                submitBtn: 'Yayın Ekle',
                addingBtn: 'Ekleniyor...',
                goToLink: "Linke Git",
                toggleHide: "Yayından Kaldır",
                toggleShow: "Yayına Al",
                deleteMsg: 'yayınını silmek istediğinize emin misiniz?',
                cancelBtn: 'İptal',
                confirmDeleteBtn: 'Evet, Sil',
                deletingBtn: 'Siliniyor...',
                successAdded: 'Yayın eklendi',
                successDeleted: 'Yayın silindi',
                successToggled: "Yayın durumu güncellendi.",
                deleteConfirm: "Bu yayını silmek istediğinize emin misiniz?",
                deleteBtn: "Yayını Sil"
            },
            projects: {
                title: 'Ekli Projeler',
                empty: 'Henüz hiç proje eklenmemiş.',
                addTitle: 'Yeni Proje Ekle',
                projTitle: 'Proje Başlığı',
                projCat: 'Kategori',
                projMetrics: 'Metrikler',
                projStatus: 'Durum',
                projShortDesc: 'Kısa Açıklama',
                projDesc: "Detaylı Açıklama (Proje Sayfası)",
                projImage: "Proje Görseli",
                isFeatured: "Vitrin Projesi Olarak İşaretle",
                submitBtn: "Projeyi Kaydet",
                addingBtn: 'Ekleniyor...',
                featuredBadge: 'Vitrin',
                deleteMsg: 'projesini silmek istediğinize emin misiniz?',
                cancelBtn: 'İptal',
                confirmDeleteBtn: 'Evet, Sil',
                successAdded: "Proje başarıyla oluşturuldu.",
                deleteConfirm: "\"{title}\" projesini silmek istediğinize emin misiniz?",
                deleteBtn: "Projeyi Sil"
            },
            events: {
                title: 'Ekli Etkinlikler',
                empty: 'Henüz hiç etkinlik eklenmemiş.',
                addTitle: 'Yeni Etkinlik Ekle',
                eventTitle: 'Etkinlik Başlığı',
                eventDate: 'Tarih ve Saat',
                eventLocation: 'Konum',
                eventLocationLink: 'Konum Linki (Opsiyonel)',
                eventDesc: 'Açıklama',
                eventImage: 'Görsel',
                requiresReg: "Üye Kaydı Al",
                submitBtn: "Etkinlik Ekle",
                addingBtn: 'Ekleniyor...',
                regOpen: 'Üye Kaydı Açık',
                deleteMsg: 'Bu etkinliği silmek istediğinize emin misiniz?',
                cancelBtn: 'İptal',
                confirmDeleteBtn: 'Evet, Sil',
                successAdded: "Etkinlik başarıyla eklendi!",
                participantsBtn: 'Kayıtlı Katılımcılar',
                participantsModalTitle: 'Kayıtlı Katılımcı Listesi',
                noParticipants: 'Henüz katılımcı bulunmamaktadır.',
                copyEmailsList: 'E-posta Listesini Kopyala',
                closeBtn: "Kapat",
                deleteConfirm: "Bu etkinliği silmek istediğinize emin misiniz?",
                deleteBtn: "Etkinliği Sil"
            },
            users: {
                title: 'Kullanıcı Yönetimi',
                colUser: 'Kullanıcı',
                colEmail: 'Email',
                colRole: 'Rol',
                colDate: 'Kayıt Tarihi',
                colActions: 'İşlemler',
                roleSuper: 'Süper Admin',
                roleAdmin: 'Admin',
                roleUser: 'Üye',
                actionRevoke: 'Yetkiyi Al',
                actionGrant: 'Admin Yap'
            }
        },
        publications: {
            label: 'Kütüphane',
            headline: 'Bilgiyi Paylaşarak Çoğaltıyoruz',
            desc: 'Kulübümüzün ürettiği dergiler, araştırma raporları ve bültenlerle akademik dünyaya katkı sağlıyoruz. Öğrenci çalışmaları, makaleler ve daha fazlası burada.',
            emptyState: 'Şu an yayında olan bir içerik bulunmuyor.'
        },
        team: {
            label: 'Ekibimiz',
            headline: 'Vizyonun Arkasındaki Güç',
            desc: 'Farklı disiplinlerden gelen, aynı vizyonu paylaşan liderler.',
            roles: {
                president: 'Kulüp Başkanı',
                vp: 'Başkan Yardımcısı',
                rep: 'Temsilci',
                intRep: 'Int. Student Rep.'
            },
            faculties: {
                mbg: 'Moleküler Biyoloji ve Genetik',
                ie: 'Endüstri Mühendisliği',
                ce: 'Bilgisayar Mühendisliği',
                med: 'Tıp Fakültesi',
                dent: 'Diş Hekimliği',
                nurs: 'Hemşirelik',
                slt: 'Dil ve Konuşma Terapisi',
                pt: 'Fizyoterapi ve Rehabilitasyon',
                psych: 'Psikoloji',
                dgd: 'Dijital Oyun Tasarımı',
                se: 'Yazılım Mühendisliği',
                vcd: 'Görsel İletişim Tasarımı',
                iaed: 'İç Mimarlık ve Çevre Tasarımı',
                ti: 'Mütercim Tercümanlık'
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
        home: {
            hero: {
                headline: ['Shaping', 'the Future', 'Together'],
                subtitle: 'The interdisciplinary vision platform of Istanbul Atlas University',
                cta: 'Explore',
                stats: {
                    members: 'Active Members',
                    faculties: 'Faculties',
                    projects: 'Projects'
                }
            },
            vision: {
                label: 'Our Vision',
                headline: 'Individual Strength, Collective Mind',
                p1: 'ATLAS INTERDISCIPLINARY SOCIETY (A.I.S.) is a vision platform that encourages its students to think freely, innovate, and shape the future.',
                p2: 'With its multidisciplinary team and representatives, it aims for continuous development, change, and strengthening in unity.',
                quote: '"Brings individual strength together with collective mind; world-changing ideas grow in free spaces."',
                pillars: {
                    development: { title: 'Continuous Development', desc: 'We constantly renew ourselves with an open-to-change and development-oriented approach.' },
                    collaboration: { title: 'Empowering Together', desc: 'We raise strong individuals through collective knowledge and experience.' },
                    impact: { title: 'Making an Impact', desc: 'We add value to society with ideas growing in free spaces.' }
                }
            },
            gallery: {
                label: 'Gallery',
                headline: 'Our Memories',
                desc: 'Moments of what we achieved, enjoyed, and learned together.'
            },
            contact: {
                headline: 'Join Us',
                desc: 'Take the first step to shape the future. Join the A.I.S. family, make a difference.',
                ctaJoin: 'Sign Up',
                ctaContact: 'Contact Us',
                ctaWhatsApp: 'Join WhatsApp Community'
            }
        },
        disciplines: {
            title1: 'NETWORK OF',
            title2: 'DISCIPLINES',
            subtitle: 'Horizontally expanding, intertwined collective intelligence cells.',
            list: {
                medicine: 'Medicine',
                dentistry: 'Dentistry',
                nursing: 'Nursing',
                midwifery: 'Midwifery',
                physiotherapy: 'Physiotherapy and Rehabilitation',
                speechTherapy: 'Speech and Language Therapy',
                psychology: 'Psychology',
                molecularBiology: 'Molecular Biology and Genetics',
                computerEng: 'Computer Engineering',
                softwareEng: 'Software Engineering',
                industrialEng: 'Industrial Engineering',
                electricalEng: 'Electrical and Electronics Eng.',
                digitalGameDesign: 'Digital Game Design',
                visualCommunication: 'Visual Communication Design',
                interiorArchitecture: 'Interior Architecture and Environmental Design',
                translation: 'Translation and Interpreting',
                business: 'Business Administration'
            }
        },
        projects: {
            label: 'What We Build',
            headline: 'Projects Reaching Beyond Borders',
            emptyState: 'There are no projects to display yet.'
        },
        events: {
            label: 'Our Events',
            headline: 'Turn Knowledge Into Action',
            desc: 'Interactive and developmental events that go beyond theoretical knowledge.',
            categories: {
                social: { title: 'Social Responsibility', desc: 'Projects that add value to society.' },
                science: { title: 'Academy and Science', desc: 'Talks with industry leaders.' },
                leadership: { title: 'Leadership Workshops', desc: 'Personal and professional development.' },
                summit: { title: 'Atlas Summit', desc: 'A major interdisciplinary summit.' }
            },
            featured: {
                badge: 'UPCOMING EVENT',
                title: "Atlas Interdisciplinary Summit '26",
                desc: 'Are you ready for the major summit where experts from different disciplines will gather to discuss the technologies of the future?',
                registerBtn: 'Register Now',
                detailsBtn: 'Detailed Info',
                dateLabel: 'Date',
                dateValue: 'May 15, 2026',
                locationLabel: 'Location',
                locationValue: 'Vadi Campus Conference Hall',
                note: '* Space is limited. Do not forget to fill out the form to take advantage of early registration.'
            }
        },
        eventsPage: {
            label: 'Events',
            headline: 'Turn Knowledge Into Action',
            desc: 'You can follow our interactive and developmental events that go beyond theoretical knowledge here.',
            upcoming: 'Upcoming Events',
            past: 'Past Events',
            emptyUpcoming: 'There are no scheduled events at the moment. Stay tuned!',
            badgeUpcoming: 'UPCOMING'
        },
        admin: {
            title: 'Admin Panel',
            sidebar: {
                users: 'User Management',
                events: 'Event Management',
                projects: 'Projects',
                publications: 'Publication Management',
                gallery: 'Gallery Management'
            },
            gallery: {
                title: 'Gallery Images',
                empty: "No images added yet.",
                addTitle: "Add New Image",
                imageTitle: "Title / Description",
                imageFile: "Select Image (Recommended: 4:3 format or landscape)",
                submitBtn: "Add to Gallery",
                addingBtn: 'Adding...',
                deleteMsg: 'Are you sure you want to delete this image?',
                cancelBtn: 'Cancel',
                confirmDeleteBtn: 'Yes, Delete',
                deletingBtn: 'Deleting...',
                successAdded: "Image successfully added.",
                successDeleted: 'Image deleted',
                errorMsg: "An error occurred while uploading. Please try again.",
                deleteConfirm: "Are you sure you want to delete this image?",
                deleteBtn: "Delete Image"
            },
            publications: {
                title: 'Publications List',
                empty: 'No publications added yet.',
                addTitle: 'Add New Publication',
                pubTitle: 'Publication Title',
                pubType: 'Publication Type',
                pubDate: 'Date',
                pubDesc: 'Description',
                pubLink: 'Link (Optional)',
                submitBtn: 'Add Publication',
                addingBtn: 'Adding...',
                goToLink: "Go to Link",
                toggleHide: "Unpublish",
                toggleShow: "Publish",
                deleteMsg: 'Are you sure you want to delete the publication',
                cancelBtn: 'Cancel',
                confirmDeleteBtn: 'Yes, Delete',
                deletingBtn: 'Deleting...',
                successAdded: 'Publication added',
                successDeleted: 'Publication deleted',
                successToggled: "Publication status updated.",
                deleteConfirm: "Are you sure you want to delete this publication?",
                deleteBtn: "Delete Publication"
            },
            projects: {
                title: 'Added Projects',
                empty: 'No projects added yet.',
                addTitle: 'Add New Project',
                projTitle: 'Project Title',
                projCat: 'Category',
                projMetrics: 'Metrics',
                projStatus: 'Status',
                projShortDesc: 'Short Description',
                projDesc: "Detailed Description (Project Page)",
                projImage: "Project Image",
                isFeatured: "Mark as Featured Project",
                submitBtn: "Save Project",
                addingBtn: 'Adding...',
                featuredBadge: 'Featured',
                deleteMsg: 'Are you sure you want to delete the project',
                cancelBtn: 'Cancel',
                confirmDeleteBtn: 'Yes, Delete',
                successAdded: "Project successfully created.",
                deleteConfirm: "Are you sure you want to delete the \"{title}\" project?",
                deleteBtn: "Delete Project"
            },
            events: {
                title: 'Added Events',
                empty: 'No events added yet.',
                addTitle: 'Add New Event',
                eventTitle: 'Event Title',
                eventDate: 'Date and Time',
                eventLocation: 'Location',
                eventLocationLink: 'Location Link (Optional)',
                eventDesc: 'Description',
                eventImage: 'Image',
                requiresReg: "Require Member Registration",
                submitBtn: "Add Event",
                addingBtn: 'Adding...',
                regOpen: 'Registration Open',
                deleteMsg: 'Are you sure you want to delete this event?',
                cancelBtn: 'Cancel',
                confirmDeleteBtn: 'Yes, Delete',
                successAdded: "Event successfully added!",
                participantsBtn: 'Registered Participants',
                participantsModalTitle: 'Registered Participants List',
                noParticipants: 'No participants yet.',
                copyEmailsList: 'Copy Email List',
                closeBtn: "Close",
                deleteConfirm: "Are you sure you want to delete this event?",
                deleteBtn: "Delete Event"
            },
            users: {
                title: 'User Management',
                colUser: 'User',
                colEmail: 'Email',
                colRole: 'Role',
                colDate: 'Registration Date',
                colActions: 'Actions',
                roleSuper: 'Super Admin',
                roleAdmin: 'Admin',
                roleUser: 'Member',
                actionRevoke: 'Revoke Access',
                actionGrant: 'Make Admin'
            }
        },
        publications: {
            label: 'Library',
            headline: 'Multiplying Knowledge by Sharing',
            desc: 'We contribute to the academic world with the magazines, research reports, and bulletins produced by our club. Student works, articles, and more are here.',
            emptyState: 'There is no content currently published.'
        },
        team: {
            label: 'Our Team',
            headline: 'The Power Behind the Vision',
            desc: 'Leaders from different disciplines who share the same vision.',
            roles: {
                president: 'Club President',
                vp: 'Vice President',
                rep: 'Representative',
                intRep: 'Int. Student Rep.'
            },
            faculties: {
                mbg: 'Molecular Biology and Genetics',
                ie: 'Industrial Engineering',
                ce: 'Computer Engineering',
                med: 'Faculty of Medicine',
                dent: 'Dentistry',
                nurs: 'Nursing',
                slt: 'Speech and Language Therapy',
                pt: 'Physiotherapy and Rehabilitation',
                psych: 'Psychology',
                dgd: 'Digital Game Design',
                se: 'Software Engineering',
                vcd: 'Visual Communication Design',
                iaed: 'Interior Architecture and Environmental Design',
                ti: 'Translation and Interpreting'
            }
        },
        // Future sections can be added here
    }
};

export type TranslationsType = typeof translations.tr;
