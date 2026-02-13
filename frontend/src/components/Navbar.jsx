import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const { t, language, toggleLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        {
            name: t.nav.buy,
            path: '/buy',
            dropdown: {
                title: 'Property for Sale',
                sections: [
                    { title: 'Locations', items: ['Kuala Lumpur', 'Selangor', 'Penang', 'Johor Bahru'] },
                    { title: 'Property Types', items: ['Condos', 'Apartments', 'Terraced Houses', 'Bungalows'] }
                ]
            }
        },
        {
            name: t.nav.rent,
            path: '/rent',
            dropdown: {
                title: 'Property for Rent',
                sections: [
                    { title: 'Locations', items: ['Kuala Lumpur', 'Petaling Jaya', 'Mont Kiara', 'Cheras'] },
                    { title: 'Property Types', items: ['Apartments for Rent', 'Room for Rent', 'Whole Units'] }
                ]
            }
        },
        {
            name: t.nav.newLaunch,
            path: '/new-launch',
            dropdown: {
                title: 'New Projects',
                sections: [
                    { title: 'Project Types', items: ['New Condos', 'Landed Projects', 'Commercial'] },
                    { title: 'Popular', items: ['High-Rise', 'Luxury', 'Affordable'] }
                ]
            }
        },
        { name: t.nav.about, path: '/about' },
        { name: t.nav.contact, path: '/contact' },
    ];

    const handleDropdownClick = (e, path) => {
        // Allow navigation to the parent page
        if (e.target.closest('a').getAttribute('href') === path) {
            setIsOpen(false);
        }
    };

    return (
        <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'pt-4 pb-2' : 'pt-6 pb-4'}`}>
            <nav className={`max-w-7xl mx-auto px-6 rounded-full transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' : 'bg-white/90 backdrop-blur-sm py-3'}`}>
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-md">
                            <span className="text-accent font-bold text-xl">R</span>
                        </div>
                        <span className="text-primary font-serif font-bold text-xl tracking-tight hidden sm:block">
                            Demo JK
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">
                                <Link
                                    to={link.path}
                                    className="flex items-center gap-1 text-slate-700 hover:text-primary hover:bg-slate-50 px-4 py-2 rounded-full text-sm font-semibold transition-all group-hover:text-primary"
                                >
                                    {link.name}
                                    {link.dropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                                </Link>

                                {/* Dropdown Menu */}
                                {link.dropdown && (
                                    <div className="absolute top-full left-0 mt-2 w-[500px] bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                                        <div className="p-6">
                                            <div className="mb-4 pb-2 border-b border-slate-100">
                                                <h3 className="font-bold text-primary text-lg">{link.dropdown.title}</h3>
                                            </div>
                                            <div className="grid grid-cols-2 gap-8">
                                                {link.dropdown.sections.map((section, idx) => (
                                                    <div key={idx}>
                                                        <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">{section.title}</h4>
                                                        <ul className="space-y-2">
                                                            {section.items.map((item, i) => (
                                                                <li key={i}>
                                                                    <Link
                                                                        to={`${link.path}?filter=${encodeURIComponent(item)}`}
                                                                        className="text-slate-500 hover:text-primary text-sm hover:translate-x-1 transition-all inline-block"
                                                                    >
                                                                        {item}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-6 pt-4 border-t border-slate-50 text-center">
                                                <Link to={link.path} className="text-sm font-bold text-primary hover:underline">
                                                    View All {link.name} &rarr;
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Language Switcher */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-full transition-all"
                            title="Switch Language"
                        >
                            <Globe size={18} />
                            <span className="text-xs font-bold uppercase">{language === 'en' ? 'EN' : 'BM'}</span>
                        </button>

                        <Link to="/login" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all">
                            <User size={18} />
                            <span className="text-sm font-bold">{t.nav.login}</span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={toggleLanguage}
                            className="p-2 text-slate-700 hover:text-primary rounded-full hover:bg-slate-100 focus:outline-none"
                        >
                            <span className="text-xs font-bold uppercase">{language === 'en' ? 'EN' : 'BM'}</span>
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-slate-700 hover:text-primary rounded-full hover:bg-slate-100 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 overflow-y-auto animate-fade-in">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <div key={link.name} className="border-b border-slate-100 pb-4">
                                <Link
                                    to={link.path}
                                    className="text-xl font-bold text-slate-900 block mb-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                                {link.dropdown && (
                                    <div className="pl-4 space-y-2 mt-2">
                                        {link.dropdown.sections.map((section, idx) => (
                                            <div key={idx}>
                                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">{section.title}</p>
                                                <ul className="grid grid-cols-2 gap-2 mb-3">
                                                    {section.items.map((item, i) => (
                                                        <li key={i}>
                                                            <Link
                                                                to={`${link.path}?filter=${encodeURIComponent(item)}`}
                                                                onClick={() => setIsOpen(false)}
                                                                className="text-sm text-slate-600"
                                                            >
                                                                {item}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <Link to="/login" onClick={() => setIsOpen(false)} className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-center shadow-lg">
                            Login / Register
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
