import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign, Filter, ChevronDown } from 'lucide-react';

const Hero = () => {
    const [activeTab, setActiveTab] = useState('buy');
    const [propertyType, setPropertyType] = useState('Residential');

    return (
        <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6">
                <div className="text-center mb-10 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 animate-slide-up bg-gradient-to-r from-primary via-purple-700 to-accent bg-clip-text text-transparent drop-shadow-sm">
                        Find Your Dream <br />
                        <span className="text-slate-900">Sanctuary</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed animate-fade-in delay-200">
                        Experience the pinnacle of luxury living with Demo JK's curated collection of premium properties.
                    </p>
                </div>

                {/* Search Box Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/40 max-w-4xl mx-auto">
                    {/* Tabs */}
                    <div className="flex gap-6 mb-6 border-b border-slate-200 pb-2">
                        {['buy', 'rent', 'new-launch'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative pb-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${activeTab === tab ? 'text-primary' : 'text-slate-500 hover:text-slate-800'
                                    }`}
                            >
                                {tab.replace('-', ' ')}
                                {activeTab === tab && (
                                    <span className="absolute bottom-[-9px] left-0 w-full h-1 bg-primary rounded-t-full"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Search Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">

                        {/* Location Input */}
                        <div className="relative md:col-span-1 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
                            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Location</label>
                            <div className="flex items-center gap-2">
                                <MapPin className="text-primary" size={18} />
                                <input
                                    type="text"
                                    placeholder="Area, City..."
                                    className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 text-sm font-medium"
                                />
                            </div>
                        </div>

                        {/* Type Input */}
                        <div className="relative md:col-span-1 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4 md:pl-4">
                            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Property Type</label>
                            <div className="flex items-center justify-between gap-2 cursor-pointer group">
                                <div className="flex items-center gap-2">
                                    <Home className="text-primary" size={18} />
                                    <span className="text-slate-800 text-sm font-medium">{propertyType}</span>
                                </div>
                                <ChevronDown size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                            </div>
                        </div>

                        {/* Price Filter (Simplified) */}
                        <div className="relative md:col-span-1 pb-4 md:pb-0 md:pl-4">
                            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Price Range</label>
                            <div className="flex items-center justify-between gap-2 cursor-pointer group">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="text-primary" size={18} />
                                    <span className="text-slate-800 text-sm font-medium">Min - Max</span>
                                </div>
                                <ChevronDown size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="md:col-span-1">
                            <button className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]">
                                <Search size={20} />
                                <span className="font-semibold">Search</span>
                            </button>
                        </div>
                    </div>

                    {/* Advanced Filter Toggle */}
                    <div className="mt-4 flex justify-between items-center text-xs text-slate-500 px-1">
                        <div className="flex gap-2">
                            <span>Popular:</span>
                            <button className="hover:text-primary underline decoration-dotted">Mont Kiara</button>
                            <button className="hover:text-primary underline decoration-dotted">KLCC</button>
                            <button className="hover:text-primary underline decoration-dotted">Bangsar</button>
                        </div>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                            <Filter size={14} />
                            <span>Advanced Search</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;
