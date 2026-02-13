import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    // Check local storage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('appLanguage');
        if (savedLang && (savedLang === 'en' || savedLang === 'bm')) {
            setLanguage(savedLang);
        }
    }, []);

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'bm' : 'en';
        setLanguage(newLang);
        localStorage.setItem('appLanguage', newLang);
    };

    const value = {
        language,
        toggleLanguage,
        t: translations[language]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
