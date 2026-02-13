import React from 'react';
import { MessageCircle, Shield, Search, Home, Building, Key, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeResources = () => {
    const areas = [
        "Kuala Lumpur", "Selangor", "Penang", "Johor",
        "Kedah", "Kelantan", "Melaka", "Negeri Sembilan",
        "Pahang", "Perak", "Perlis", "Putrajaya",
        "Sabah", "Sarawak", "Terengganu"
    ];

    return (
        <div className="bg-white pb-20">
            {/* Ask & Safety Section */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Ask An Agent Card */}
                    <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center text-center shadow-sm border border-slate-100">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md mb-6">
                            <MessageCircle size={48} className="text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Ask An Agent</h2>
                        <p className="text-slate-600 mb-8 max-w-md text-lg">
                            Make confident property decisions with advice from our community of real estate experts.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
                            <Link to="/contact" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-primary/30">
                                Ask a Question
                            </Link>
                            <Link to="/about" className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-3 rounded-full font-bold transition-all">
                                Browse FAQs
                            </Link>
                        </div>

                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-primary font-semibold text-sm">
                            <Link to="/buy" className="hover:underline flex items-center gap-1">Home Buying <ChevronRight size={12} /></Link>
                            <Link to="/rent" className="hover:underline flex items-center gap-1">Condo Rentals <ChevronRight size={12} /></Link>
                            <Link to="/contact" className="hover:underline flex items-center gap-1">General Questions <ChevronRight size={12} /></Link>
                            <Link to="/contact" className="hover:underline flex items-center gap-1">Home Selling <ChevronRight size={12} /></Link>
                        </div>
                    </div>

                    {/* Go Green Card */}
                    <div className="relative bg-gradient-to-br from-emerald-50 to-teal-100 rounded-[2.5rem] p-8 md:p-12 overflow-hidden flex flex-col justify-center border border-emerald-100">
                        <div className="relative z-10 max-w-lg">
                            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-6 leading-tight">
                                Go Green. <br /> Live Sustainably.
                            </h2>
                            <h3 className="font-semibold text-emerald-800 mb-4 text-lg">Find homes that care for the planet:</h3>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3">
                                    <div className="min-w-[8px] h-2 w-2 rounded-full bg-emerald-600"></div>
                                    <span className="text-slate-800 font-medium">Energy-efficient smart designs.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="min-w-[8px] h-2 w-2 rounded-full bg-emerald-600"></div>
                                    <span className="text-slate-800 font-medium">Lush green landscapes & parks.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="min-w-[8px] h-2 w-2 rounded-full bg-emerald-600"></div>
                                    <span className="text-slate-800 font-medium">Eco-friendly building materials.</span>
                                </li>
                            </ul>

                            <Link to="/buy?type=eco" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all transform hover:-translate-y-1 w-fit">
                                Find Eco-Homes <ChevronRight size={18} />
                            </Link>

                        </div>

                        {/* Decorative Leaf Icon */}
                        <div className="absolute -bottom-10 -right-10 opacity-10 rotate-[-12deg]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-900"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
                        </div>
                    </div>

                </div>
            </section>

            {/* Explore Areas Section */}
            <section className="bg-slate-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Explore Residential Areas In Malaysia</h2>
                        <Link to="/buy" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">More <ChevronRight size={16} /></Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {areas.map((area, idx) => (
                            <Link key={idx} to={`/buy?location=${area}`} className="text-slate-600 hover:text-primary transition-colors text-sm font-medium py-1">
                                {area}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Info Grid */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Properties for Sale */}
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 text-primary">
                            <Building size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">Properties for Sale</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">
                            Find your dream home with the most comprehensive property listings.
                            Apartments, condos, terrace houses, and more.
                        </p>
                        <Link to="/buy" className="text-primary font-bold text-sm hover:underline">Find Homes</Link>
                    </div>

                    {/* Properties for Rent */}
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 text-primary">
                            <Key size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">Properties For Rent</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">
                            Looking to rent? We have a wide range of condos, apartments,
                            and rooms for rent to suit your budget.
                        </p>
                        <Link to="/rent" className="text-primary font-bold text-sm hover:underline">Find Rentals</Link>
                    </div>

                    {/* New Launches */}
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 text-primary">
                            <Home size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">New Property Launches</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">
                            Discover the latest exclusive property launches in Malaysia.
                            Be the first to secure units in top developments.
                        </p>
                        <Link to="/new-launch" className="text-primary font-bold text-sm hover:underline">See New Projects</Link>
                    </div>

                    {/* Guides */}
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 text-primary">
                            <BookOpen size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">Property Guides</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">
                            First time home buyer? Check out our precise guides on buying,
                            selling, renting and financing property.
                        </p>
                        <Link to="/about" className="text-primary font-bold text-sm hover:underline">Read Guides</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeResources;
