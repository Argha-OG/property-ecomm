import React from 'react';
import { TriangleAlert, ShieldCheck, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePromo = () => {
    return (
        <section className="py-12 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Left Column - Stacked Cards */}
                    <div className="flex flex-col gap-4">

                        {/* Go Green Card */}
                        <div className="group relative bg-gradient-to-br from-emerald-600 to-teal-900 rounded-[2rem] p-6 md:p-8 overflow-hidden shadow-xl shadow-emerald-900/20 hover:shadow-2xl hover:shadow-emerald-900/30 transition-all duration-300 transform hover:-translate-y-1">
                            {/* Background Pattern */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div className="flex-1">
                                    <h3 className="text-white/90 font-medium text-lg mb-2">Go Green.</h3>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                        Live Sustainably. <br />
                                        Find homes that care for the planet.
                                    </h2>
                                    <ul className="space-y-2 mb-6 text-white/90 font-medium">
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white"></div>Energy-efficient smart designs.</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white"></div>Lush green landscapes & parks.</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white"></div>Eco-friendly building materials.</li>
                                    </ul>
                                    <Link to="/buy?type=eco" className="bg-white text-emerald-800 px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-100 transition-colors inline-flex items-center gap-2 w-fit">
                                        Find Eco-Homes <ArrowRight size={16} />
                                    </Link>
                                </div>
                                <div className="hidden md:block">
                                    <div className="w-24 h-24 bg-white/10 rounded-2xl rotate-12 flex items-center justify-center shadow-lg border-4 border-white/20 backdrop-blur-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Property Guides Card */}
                        <div className="group relative bg-gradient-to-br from-slate-800 to-slate-950 rounded-[2rem] p-6 md:p-8 overflow-hidden shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-slate-900/30 transition-all duration-300 transform hover:-translate-y-1">
                            {/* Background Image Overlay */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
                                style={{
                                    backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex-1">
                                    <h3 className="text-white/90 font-medium text-lg mb-2">Property Guides</h3>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                        Discover essential property tips, tools and how-to articles
                                    </h2>
                                    <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-100 transition-colors flex items-center gap-2">
                                        Read Them Now <BookOpen size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Trust Banner */}
                    <div className="relative bg-white rounded-[2rem] p-6 md:p-8 overflow-hidden shadow-xl border border-slate-100 flex flex-col justify-center min-h-[350px]">
                        {/* Abstract Background */}
                        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <path fill="#D93025" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.5,90.1,-17.9,88.5,-2.6C86.9,12.7,81,27.7,72.6,40.5C64.2,53.3,53.3,64,40.8,71.4C28.3,78.8,14.2,83,-0.6,84C-15.4,85,-30.8,82.8,-44.6,76.1C-58.4,69.4,-70.6,58.2,-79.8,44.5C-89,30.8,-95.2,14.6,-93.4,0C-91.6,-14.6,-81.8,-27.6,-71.4,-39.3C-61,-51,-50,-61.4,-37.8,-69.5C-25.6,-77.6,-12.3,-83.4,0.7,-84.6C13.7,-85.8,27.4,-82.4,44.7,-76.4Z" transform="translate(100 100) scale(1.1)" />
                            </svg>
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-md">
                                    <span className="text-accent font-bold text-xl">R</span>
                                </div>
                                <span className="text-primary font-serif font-bold text-2xl tracking-tight">
                                    Demo JK Properties
                                </span>
                            </div>

                            <h2 className="text-5xl md:text-6xl font-black text-[#D93025] uppercase leading-none tracking-tight mb-4 drop-shadow-sm">
                                Trust <br />
                                The <br />
                                Badge
                            </h2>

                            <p className="text-slate-600 text-lg md:text-xl font-medium mb-8 max-w-sm">
                                Verified project information – straight from developers.
                            </p>

                            <div className="inline-flex items-center gap-3 bg-[#0F4C5C] text-white px-6 py-4 rounded-2xl shadow-lg hover:bg-[#0d4250] transition-colors cursor-pointer group">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <ShieldCheck size={24} className="text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wider font-bold opacity-80">Look for the</span>
                                    <span className="font-bold text-sm">Official Listings Badge</span>
                                </div>
                            </div>
                        </div>

                        {/* Side Image (Abstract Building) */}
                        <div className="absolute right-0 bottom-0 w-1/2 h-full hidden md:block opacity-90 pointer-events-none">
                            <img
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Modern Architecture"
                                style={{ clipPath: 'polygon(20% 0%, 100% 0, 100% 100%, 0% 100%)' }}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomePromo;
