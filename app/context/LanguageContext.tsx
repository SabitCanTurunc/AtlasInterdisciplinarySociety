'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, translations, TranslationsType } from '../utils/translations';

interface LanguageContextType {
    language: Language;
    t: TranslationsType;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>('tr');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const savedLang = localStorage.getItem('site_language') as Language | null;
        if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
            setLanguage(savedLang);
        }
    }, []);

    const toggleLanguage = () => {
        const newLang = language === 'tr' ? 'en' : 'tr';
        setLanguage(newLang);
        localStorage.setItem('site_language', newLang);
    };

    const t = translations[language];

    // Provide an initial loading state or render the default context server-side to prevent hydration mismatch 
    if (!isClient) {
        return <LanguageContext.Provider value={{ language: 'tr', t: translations['tr'], toggleLanguage }}>{children}</LanguageContext.Provider>;
    }

    return (
        <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
