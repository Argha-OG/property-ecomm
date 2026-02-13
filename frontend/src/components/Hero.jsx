import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, DollarSign, Filter, ChevronDown, Check, Sparkles, Wand2 } from 'lucide-react';
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

    // Advanced Filters State
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [bedrooms, setBedrooms] = useState('Any');
    const [sizeRange, setSizeRange] = useState({ min: 0, max: 0, label: 'Any Size' });

    const [activeDropdown, setActiveDropdown] = useState(null);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0, label: t.hero.filters.any });
    const [isAILoading, setIsAILoading] = useState(false);

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

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 1) {
            try {
                // Fetch suggestions from API
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/properties?search=${query}`);
                const data = await response.json();

                // Defensive check: ensure data is an array
                if (Array.isArray(data)) {
                    // Process Property Suggestions
                    const propertySuggestions = data.map(p => ({
                        type: 'Property',
                        text: p.title,
                        image: p.images?.[0] || 'https://placehold.co/100x100?text=No+Image',
                        price: p.price
                    }));

                    // Process Location Suggestions (Unique)
                    const existingLocations = new Set();
                    const locationSuggestions = [];
                    data.forEach(p => {
                        if (!existingLocations.has(p.location)) {
                            existingLocations.add(p.location);
                            locationSuggestions.push({
                                type: 'Location',
                                text: p.location,
                                image: null
                            });
                        }
                    });

                    // Combine and limit
                    const combined = [...propertySuggestions, ...locationSuggestions].slice(0, 6);
                    setSuggestions(combined);
                    setShowSuggestions(true);
                } else {
                    console.error('API returned non-array data for suggestions:', data);
                    setSuggestions([]);
                }
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion.text);
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
            if (activeTab === 'ai-search') {
                handleAISearch();
            } else {
                handleSearch();
            }
        }
    };

    const handleAISearch = async () => {
        if (!searchQuery) return;
        setIsAILoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: searchQuery })
            });

            const data = await response.json();
            console.log("AI Response:", data);

            if (data.parsed) {
                const params = new URLSearchParams();
                const { location, type, maxPrice, bedrooms } = data.parsed;

                // Map parsed filters to query params
                if (location) params.append('location', location.replace(/^\/|\/i$/g, '')); // Strip regex slashes if returned as string, though backend returns regex object it might be stringified weirdly. Controller sends it as regex, but JSON auto-converts to empty object usually.
                // Wait, regex objects in JSON become empty objects. I need to fix backend to send strings.
                // START CORRECTION NOTE: The backend sends regex objects which serialize to {}. I must fix backend AI controller first to return strings!
                // Actually, let's just proceed with frontend assuming string return, and I will fix backend in next step.

                if (data.parsed.locationText) params.append('location', data.parsed.locationText); // I'll update backend to send text.
                else if (location && typeof location === 'string') params.append('location', location);

                if (type) params.append('type', type);
                if (maxPrice) params.append('maxPrice', maxPrice);
                if (bedrooms) params.append('bedrooms', bedrooms);

                // Default to Buy page for now
                navigate(`/buy?${params.toString()}`);
            }
        } catch (error) {
            console.error("AI Search Error:", error);
        } finally {
            setIsAILoading(false);
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
            <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 md:pt-24">
                <div className="text-center mb-6 sm:mb-10 animate-fade-in-up">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight mb-4 sm:mb-6 animate-slide-up text-white drop-shadow-md">
                        {t.hero.title} <br />
                        <span className="text-accent">{t.hero.subtitle}</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-slate-100 mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed animate-fade-in delay-200 drop-shadow-sm">
                        {t.hero.desc}
                    </p>
                </div>

                {/* Search Box Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/40 max-w-4xl mx-auto flex flex-col gap-4 sm:gap-6">
                    <div className="flex gap-3 sm:gap-6 border-b border-slate-200 pb-2 overflow-x-auto">
                        {['buy', 'rent', 'new-launch', 'ai-search'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative pb-2 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-300 flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${activeTab === tab ? 'text-primary' : 'text-slate-500 hover:text-slate-800'
                                    }`}
                            >
                                {tab === 'ai-search' && <Sparkles size={16} className={activeTab === 'ai-search' ? 'text-accent animate-pulse' : ''} />}
                                {tab === 'buy' ? t.hero.tabs.buy : tab === 'rent' ? t.hero.tabs.rent : tab === 'new-launch' ? t.hero.tabs.newLaunch : 'AI Search'}
                                {activeTab === tab && (
                                    <span className="absolute bottom-[-9px] left-0 w-full h-1 bg-primary rounded-t-full"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Main Smart Search Input (Full Width) */}
                    <div className="relative">
                        <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                            {activeTab === 'ai-search' ? (
                                <span className="flex items-center gap-1 text-primary"><Wand2 size={12} /> Describe your dream home</span>
                            ) : t.hero.smartSearch}
                        </label>
                        <div className={`relative flex items-center bg-slate-50 rounded-xl px-4 py-3 border transition-all ${activeTab === 'ai-search' ? 'border-accent ring-1 ring-accent bg-purple-50' : 'border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'}`}>
                            {activeTab === 'ai-search' ? (
                                <Sparkles className="text-accent mr-3 animate-pulse" size={20} />
                            ) : (
                                <Search className="text-primary mr-3" size={20} />
                            )}
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                onFocus={() => activeTab !== 'ai-search' && searchQuery && setShowSuggestions(true)}
                                placeholder={activeTab === 'ai-search' ? "e.g. 3 bedroom condo in Mont Kiara under 2 million..." : t.hero.searchPlaceholder}
                                className="w-full bg-transparent border-none focus:ring-0 outline-none text-slate-800 placeholder-slate-400 text-base font-medium"
                            />
                        </div>
                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white rounded-xl shadow-xl mt-2 p-2 z-20 max-h-80 overflow-y-auto animate-fade-in border border-slate-100">
                                {suggestions.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(item)}
                                        className="w-full text-left px-3 py-3 hover:bg-slate-50 rounded-lg flex items-center gap-3 transition-colors group border-b border-slate-50 last:border-0"
                                    >
                                        {/* Thumbnail or Icon */}
                                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 flex items-center justify-center border border-slate-200">
                                            {item.image ? (
                                                <img src={item.image} alt={item.text} className="w-full h-full object-cover" />
                                            ) : (
                                                <MapPin size={20} className="text-slate-400" />
                                            )}
                                        </div>

                                        {/* Text Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-primary transition-colors">{item.text}</p>
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${item.type === 'Property' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                    {item.type}
                                                </span>
                                                {item.price && <span>{item.price}</span>}
                                            </div>
                                        </div>

                                        <div className="-rotate-90 text-slate-300">
                                            <ChevronDown size={16} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Filters Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-end">

                        {/* Specific Location Input (Dropdown) */}
                        <div className="relative border-b sm:border-b-0 md:border-r border-slate-200 pb-3 sm:pb-4 md:pb-0 md:pr-4">
                            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">{t.hero.filters.location}</label>
                            <div
                                onClick={() => toggleDropdown('location')}
                                className="flex items-center justify-between gap-2 cursor-pointer group min-h-[44px]"
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
                                onClick={activeTab === 'ai-search' ? handleAISearch : handleSearch}
                                disabled={isAILoading}
                                className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
                            >
                                <Search size={20} />
                                <span className="font-semibold">{isAILoading ? 'Thinking...' : activeTab === 'ai-search' ? 'Generate' : t.hero.filters.search}</span>
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
                        <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className={`flex items-center gap-1 hover:text-primary transition-colors ${showAdvanced ? 'text-primary' : ''}`}
                        >
                            <Filter size={14} />
                            <span>{showAdvanced ? 'Hide Options' : t.hero.filters.advanced}</span>
                        </button>
                    </div>

                    {/* Advanced Filters Row (Collapsible) */}
                    {showAdvanced && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 animate-fade-in-down">
                            {/* Bedrooms */}
                            <div className="relative">
                                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Bedrooms</label>
                                <div className="flex gap-2">
                                    {['Any', '1+', '2+', '3+', '4+'].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setBedrooms(opt === bedrooms ? 'Any' : opt)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${bedrooms === opt
                                                ? 'bg-primary text-white border-primary'
                                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-primary'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Range */}
                            <div className="relative">
                                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Property Size (sqft)</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={sizeRange.min === 0 ? '' : sizeRange.min}
                                        onChange={(e) => setSizeRange({ ...sizeRange, min: Number(e.target.value) })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                    <span className="text-slate-400 font-medium">-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={sizeRange.max === 0 ? '' : sizeRange.max}
                                        onChange={(e) => setSizeRange({ ...sizeRange, max: Number(e.target.value) })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Hero;
