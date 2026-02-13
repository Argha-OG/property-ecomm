import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, DollarSign, Filter, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('buy');
    const [propertyType, setPropertyType] = useState('Residential');
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [activeDropdown, setActiveDropdown] = useState(null);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0, label: t.hero.filters.any });

    // Mock suggestions for demo
    const allSuggestions = [
        'Mont Kiara', 'KLCC', 'Bangsar', 'Petaling Jaya', 'Damansara Heights',
        'Cheras', 'Subang Jaya', 'Cyberjaya', 'Putrajaya',
        'The Pavilion', 'One KL', 'Solaris Dutamas', 'Pavilion Damansara Heights'
    ];

    const locations = [
        'Kuala Lumpur', 'Selangor', 'Penang', 'Johor',
        'Mont Kiara', 'Bangsar', 'Petaling Jaya', 'Cheras', 'Subang Jaya', 'Cyberjaya'
    ];

    const propertyTypes = ['Residential', 'Commercial', 'Industrial', 'Land'];

    const priceRanges = [
        { min: 0, max: 0, label: t.hero.filters.any },
        { min: 0, max: 500000, label: 'Below RM 500k' },
        { min: 500000, max: 1000000, label: 'RM 500k - 1M' },
        { min: 1000000, max: 2000000, label: 'RM 1M - 2M' },
        { min: 2000000, max: 5000000, label: 'RM 2M - 5M' },
        { min: 5000000, max: 0, label: 'Above RM 5M' },
    ];

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 0) {
            const filtered = allSuggestions.filter(item =>
                item.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (locationQuery) params.append('location', locationQuery);
        if (propertyType !== 'Residential') params.append('type', propertyType);
        if (priceRange.min > 0) params.append('minPrice', priceRange.min);
        if (priceRange.max > 0) params.append('maxPrice', priceRange.max);

        navigate(`/${activeTab}?${params.toString()}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center z-20">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat overflow-hidden"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 md:pt-20">
                <div className="text-center mb-10 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 animate-slide-up text-white drop-shadow-md">
                        {t.hero.title} <br />
                        <span className="text-accent">{t.hero.subtitle}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-100 mb-8 max-w-xl mx-auto leading-relaxed animate-fade-in delay-200 drop-shadow-sm">
                        {t.hero.desc}
                    </p>
                </div>

                {/* Search Box Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/40 max-w-4xl mx-auto flex flex-col gap-6">
                    {/* Tabs */}
                    <div className="flex gap-6 border-b border-slate-200 pb-2">
                        {['buy', 'rent', 'new-launch'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative pb-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${activeTab === tab ? 'text-primary' : 'text-slate-500 hover:text-slate-800'
                                    }`}
                            >
                                {tab === 'buy' ? t.hero.tabs.buy : tab === 'rent' ? t.hero.tabs.rent : t.hero.tabs.newLaunch}
                                {activeTab === tab && (
                                    <span className="absolute bottom-[-9px] left-0 w-full h-1 bg-primary rounded-t-full"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Main Smart Search Input (Full Width) */}
                    <div className="relative">
                        <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">{t.hero.smartSearch}</label>
                        <div className="relative flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                            <Search className="text-primary mr-3" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                onFocus={() => searchQuery && setShowSuggestions(true)}
                                placeholder={t.hero.searchPlaceholder}
                                className="w-full bg-transparent border-none focus:ring-0 outline-none text-slate-800 placeholder-slate-400 text-base font-medium"
                            />
                        </div>
                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white rounded-xl shadow-xl mt-2 p-2 z-20 max-h-60 overflow-y-auto animate-fade-in border border-slate-100">
                                {suggestions.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(item)}
                                        className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-sm text-slate-700 flex items-center justify-between group"
                                    >
                                        <span>{item}</span>
                                        <Check size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Filters Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

                        {/* Specific Location Input (Dropdown) */}
                        <div className="relative md:col-span-1 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
                            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">{t.hero.filters.location}</label>
                            <div
                                onClick={() => toggleDropdown('location')}
                                className="flex items-center justify-between gap-2 cursor-pointer group"
                            >
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <MapPin className="text-slate-400 flex-shrink-0" size={18} />
                                    <span className={`text-sm font-medium truncate ${locationQuery ? 'text-slate-800' : 'text-slate-400'}`}>
                                        {locationQuery || t.hero.filters.location}
                                    </span>
                                </div>
                                <ChevronDown size={16} className={`text-slate-400 transition-transform ${activeDropdown === 'location' ? 'rotate-180' : ''}`} />
                            </div>

                            {/* Location Dropdown */}
                            {activeDropdown === 'location' && (
                                <div className="absolute top-full left-0 w-full md:w-64 bg-white rounded-xl shadow-xl mt-2 p-2 z-30 max-h-60 overflow-y-auto border border-slate-100 animate-fade-in">
                                    <button
                                        onClick={() => { setLocationQuery(''); setActiveDropdown(null); }}
                                        className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-sm text-slate-500 font-medium mb-1"
                                    >
                                        {t.hero.filters.allLocations}
                                    </button>
                                    {locations.map((loc, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => { setLocationQuery(loc); setActiveDropdown(null); }}
                                            className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-sm text-slate-700 flex items-center justify-between"
                                        >
                                            {loc}
                                            {locationQuery === loc && <Check size={14} className="text-primary" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Property Type (Dropdown) */}
                        <div className="relative md:col-span-1 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4 md:pl-4">
                            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">{t.hero.filters.propertyType}</label>
                            <div
                                onClick={() => toggleDropdown('type')}
                                className="flex items-center justify-between gap-2 cursor-pointer group"
                            >
                                <div className="flex items-center gap-2">
                                    <Home className="text-slate-400" size={18} />
                                    <span className="text-slate-800 text-sm font-medium">{propertyType}</span>
                                </div>
                                <ChevronDown size={16} className={`text-slate-400 transition-transform ${activeDropdown === 'type' ? 'rotate-180' : ''}`} />
                            </div>

                            {/* Type Dropdown */}
                            {activeDropdown === 'type' && (
                                <div className="absolute top-full left-0 w-full md:w-48 bg-white rounded-xl shadow-xl mt-2 p-2 z-30 border border-slate-100 animate-fade-in">
                                    {propertyTypes.map((type, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => { setPropertyType(type); setActiveDropdown(null); }}
                                            className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-sm text-slate-700 flex items-center justify-between"
                                        >
                                            {type}
                                            {propertyType === type && <Check size={14} className="text-primary" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Price Range (Dropdown) */}
                        <div className="relative md:col-span-1 pb-4 md:pb-0 md:pl-4">
                            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">{t.hero.filters.priceRange}</label>
                            <div
                                onClick={() => toggleDropdown('price')}
                                className="flex items-center justify-between gap-2 cursor-pointer group"
                            >
                                <div className="flex items-center gap-2">
                                    <DollarSign className="text-slate-400" size={18} />
                                    <span className="text-slate-800 text-sm font-medium truncate">{priceRange.label}</span>
                                </div>
                                <ChevronDown size={16} className={`text-slate-400 transition-transform ${activeDropdown === 'price' ? 'rotate-180' : ''}`} />
                            </div>

                            {/* Price Dropdown */}
                            {activeDropdown === 'price' && (
                                <div className="absolute top-full left-0 w-full md:w-64 bg-white rounded-xl shadow-xl mt-2 p-3 z-30 border border-slate-100 animate-fade-in text-left">
                                    <div className="mb-3">
                                        <p className="text-xs font-semibold text-slate-500 mb-2 uppercase">{t.hero.filters.customRange}</p>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                placeholder={t.hero.filters.min}
                                                value={priceRange.min === 0 ? '' : priceRange.min}
                                                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value), label: t.hero.filters.customRange })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-sm outline-none focus:border-primary transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <span className="text-slate-400">-</span>
                                            <input
                                                type="number"
                                                placeholder={t.hero.filters.max}
                                                value={priceRange.max === 0 ? '' : priceRange.max}
                                                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value), label: t.hero.filters.customRange })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-sm outline-none focus:border-primary transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                    </div>
                                    <div className="h-[1px] bg-slate-100 my-2"></div>
                                    {priceRanges.map((range, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => { setPriceRange(range); setActiveDropdown(null); }}
                                            className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-sm text-slate-700 flex items-center justify-between transition-colors"
                                        >
                                            {range.label}
                                            {priceRange.label === range.label && <Check size={14} className="text-primary" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search Button */}
                        <div className="md:col-span-1">
                            <button
                                onClick={handleSearch}
                                className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
                            >
                                <Search size={20} />
                                <span className="font-semibold">{t.hero.filters.search}</span>
                            </button>
                        </div>
                    </div>

                    {/* Advanced Filter Toggle */}
                    <div className="mt-4 flex justify-between items-center text-xs text-slate-500 px-1">
                        <div className="flex gap-2">
                            <span>{t.hero.filters.popular}</span>
                            <button onClick={() => { setSearchQuery('Mont Kiara'); handleSearch(); }} className="hover:text-primary underline decoration-dotted">Mont Kiara</button>
                            <button onClick={() => { setSearchQuery('KLCC'); handleSearch(); }} className="hover:text-primary underline decoration-dotted">KLCC</button>
                            <button onClick={() => { setSearchQuery('Bangsar'); handleSearch(); }} className="hover:text-primary underline decoration-dotted">Bangsar</button>
                        </div>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                            <Filter size={14} />
                            <span>{t.hero.filters.advanced}</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;
