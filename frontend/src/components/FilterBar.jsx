import React, { useState, useEffect } from 'react';
import { Search, MapPin, Home, DollarSign, ChevronDown, Check, Filter } from 'lucide-react';

const FilterBar = ({ onFilterChange, initialFilters }) => {
    const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
    const [advancedOpen, setAdvancedOpen] = useState(false);

    // Local state for search to handle suggestions
    const [searchQuery, setSearchQuery] = useState(initialFilters?.search || '');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Sync initial filters
    useEffect(() => {
        if (initialFilters?.search) setSearchQuery(initialFilters.search);
    }, [initialFilters]);

    const priceRanges = [
        { min: 0, max: 0, label: 'Any Price' },
        { min: 0, max: 500000, label: 'Below RM 500k' },
        { min: 500000, max: 1000000, label: 'RM 500k - RM 1M' },
        { min: 1000000, max: 0, label: 'Above RM 1M' },
    ];

    const handleSearchInput = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        // Only trigger search on empty input or explicitly
        if (query === '') {
            onFilterChange('search', '');
        }

        if (query.length > 1) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/properties?search=${query}`);
                const data = await response.json();

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
                const combined = [...propertySuggestions, ...locationSuggestions].slice(0, 5);
                setSuggestions(combined);
                setShowSuggestions(true);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSearch = () => {
        onFilterChange('search', searchQuery);
        setShowSuggestions(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const selectSuggestion = (val) => {
        setSearchQuery(val.text);
        onFilterChange('search', val.text);
        setShowSuggestions(false);
    };

    return (
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 mb-8 z-40 relative">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                {/* Search Input */}
                <div className="flex-1 relative z-20">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInput}
                        onKeyDown={handleKeyDown}
                        onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        placeholder="Search area, property name, developer..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-slate-700 font-medium"
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white rounded-xl shadow-xl mt-2 p-2 max-h-80 overflow-y-auto border border-slate-100">
                            {suggestions.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => selectSuggestion(item)}
                                    className="w-full text-left px-3 py-3 hover:bg-slate-50 rounded-lg flex items-center gap-3 transition-colors group border-b border-slate-50 last:border-0"
                                >
                                    {/* Thumbnail or Icon */}
                                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 flex items-center justify-center border border-slate-200">
                                        {item.image ? (
                                            <img src={item.image} alt={item.text} className="w-full h-full object-cover" />
                                        ) : (
                                            <MapPin size={18} className="text-slate-400" />
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
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Property Type */}
                <div className="relative md:w-48 z-10">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <select
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-slate-700 appearance-none cursor-pointer font-medium"
                        onChange={(e) => onFilterChange('type', e.target.value)}
                        value={initialFilters?.type || ''}
                    >
                        <option value="">All Types</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Condo">Condo</option>
                        <option value="Bungalow">Bungalow</option>
                        <option value="Terrace">Terrace</option>
                        <option value="Semi-D">Semi-D</option>
                        <option value="Villa">Villa</option>
                        <option value="Penthouse">Penthouse</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>

                {/* Price Range */}
                <div className="relative md:w-56 z-20">
                    <div
                        onClick={() => setPriceDropdownOpen(!priceDropdownOpen)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-slate-700 cursor-pointer flex items-center justify-between font-medium"
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <span className="truncate ml-6">
                                {initialFilters?.minPrice || initialFilters?.maxPrice ? 'Custom Price' : 'Any Price'}
                            </span>
                        </div>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform ${priceDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {priceDropdownOpen && (
                        <div className="absolute top-full left-0 w-full md:w-64 bg-white rounded-xl shadow-xl mt-2 p-3 border border-slate-100 text-left">
                            <div className="mb-3">
                                <p className="text-xs font-semibold text-slate-500 mb-2 uppercase">Custom Range</p>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        onChange={(e) => onFilterChange('minPrice', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-sm outline-none focus:border-primary"
                                    />
                                    <span className="text-slate-400">-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-sm outline-none focus:border-primary"
                                    />
                                </div>
                            </div>
                            <div className="h-[1px] bg-slate-100 my-2"></div>
                            {priceRanges.map((range, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        onFilterChange('minPrice', range.min);
                                        onFilterChange('maxPrice', range.max);
                                        setPriceDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-sm text-slate-700 flex items-center justify-between"
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Advanced Toggle */}
                <button
                    onClick={() => setAdvancedOpen(!advancedOpen)}
                    className={`px-4 py-3 rounded-xl border flex items-center gap-2 font-medium transition-colors ${advancedOpen ? 'bg-slate-100 border-slate-300 text-slate-900' : 'border-slate-200 text-slate-600 hover:border-primary hover:text-primary'}`}
                >
                    <Filter size={20} />
                </button>

                {/* Search Button */}
                <button
                    onClick={handleSearch}
                    className="bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center flex-shrink-0"
                >
                    <Search size={24} />
                </button>
            </div>

            {/* Advanced Filters */}
            {advancedOpen && (
                <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-down">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Bedrooms</label>
                        <div className="flex gap-2">
                            {['Any', '1+', '2+', '3+', '4+'].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => onFilterChange('bedrooms', opt === 'Any' ? '' : opt)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${(initialFilters?.bedrooms === opt || (opt === 'Any' && !initialFilters?.bedrooms))
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-primary'
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Built-up Size (sqft)</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                value={initialFilters?.minSize || ''}
                                onChange={(e) => onFilterChange('minSize', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                            <span className="text-slate-400">-</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={initialFilters?.maxSize || ''}
                                onChange={(e) => onFilterChange('maxSize', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Land Area (sqft)</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                value={initialFilters?.minLandArea || ''}
                                onChange={(e) => onFilterChange('minLandArea', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                            <span className="text-slate-400">-</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={initialFilters?.maxLandArea || ''}
                                onChange={(e) => onFilterChange('maxLandArea', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterBar;
