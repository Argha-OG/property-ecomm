import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign, ChevronDown, Check } from 'lucide-react';

const FilterBar = ({ onFilterChange }) => {
    const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0, label: 'Any Price' });

    const priceRanges = [
        { min: 0, max: 0, label: 'Any Price' },
        { min: 0, max: 500000, label: 'Below RM 500k' },
        { min: 500000, max: 1000000, label: 'RM 500k - RM 1M' },
        { min: 1000000, max: 0, label: 'Above RM 1M' },
    ];

    const handlePriceSelect = (range) => {
        setPriceRange(range);
        setPriceDropdownOpen(false);
        onFilterChange('minPrice', range.min);
        onFilterChange('maxPrice', range.max);
    };

    const handleCustomPriceChange = (key, value) => {
        const newRange = { ...priceRange, [key]: Number(value), label: 'Custom Range' };
        setPriceRange(newRange);
        onFilterChange(key, value);
    };

    return (
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 z-40 relative">
            {/* Location Search */}
            <div className="flex-1 relative z-10">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Location (e.g. KLCC, Mont Kiara)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-slate-700"
                    onChange={(e) => onFilterChange('location', e.target.value)}
                />
            </div>

            {/* Property Type */}
            <div className="relative md:w-48 z-10">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <select
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-slate-700 appearance-none cursor-pointer"
                    onChange={(e) => onFilterChange('type', e.target.value)}
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

            {/* Price Range Custom Dropdown */}
            <div className="relative md:w-56 z-20">
                <div
                    onClick={() => setPriceDropdownOpen(!priceDropdownOpen)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-slate-700 cursor-pointer flex items-center justify-between"
                >
                    <div className="flex items-center gap-2 overflow-hidden">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <span className="truncate ml-6">{priceRange.label}</span>
                    </div>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${priceDropdownOpen ? 'rotate-180' : ''}`} />
                </div>

                {priceDropdownOpen && (
                    <div className="absolute top-full left-0 w-full md:w-64 bg-white rounded-xl shadow-xl mt-2 p-3 border border-slate-100 animate-fade-in text-left">
                        <div className="mb-3">
                            <p className="text-xs font-semibold text-slate-500 mb-2 uppercase">Custom Range</p>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={priceRange.min === 0 ? '' : priceRange.min}
                                    onChange={(e) => handleCustomPriceChange('min', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-sm outline-none focus:border-primary transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <span className="text-slate-400">-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={priceRange.max === 0 ? '' : priceRange.max}
                                    onChange={(e) => handleCustomPriceChange('max', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-sm outline-none focus:border-primary transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                        <div className="h-[1px] bg-slate-100 my-2"></div>
                        {priceRanges.map((range, idx) => (
                            <button
                                key={idx}
                                onClick={() => handlePriceSelect(range)}
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
            <button className="bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center">
                <Search size={24} />
            </button>
        </div>
    );
};

export default FilterBar;
