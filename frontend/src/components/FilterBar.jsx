import React from 'react';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';

const FilterBar = ({ onFilterChange }) => {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 mb-8 flex flex-col md:flex-row gap-4">
            {/* Location Search */}
            <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Location (e.g. KLCC, Mont Kiara)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-slate-700"
                    onChange={(e) => onFilterChange('location', e.target.value)}
                />
            </div>

            {/* Property Type */}
            <div className="relative md:w-48">
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
            </div>

            {/* Price Range */}
            <div className="relative md:w-48">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <select
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-slate-700 appearance-none cursor-pointer"
                    onChange={(e) => onFilterChange('priceRange', e.target.value)}
                >
                    <option value="">Any Price</option>
                    <option value="low">Below RM 500k</option>
                    <option value="mid">RM 500k - RM 1M</option>
                    <option value="high">Above RM 1M</option>
                </select>
            </div>

            {/* Search Button (Optional, as filtering is instant for now) */}
            <button className="bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center">
                <Search size={24} />
            </button>
        </div>
    );
};

export default FilterBar;
