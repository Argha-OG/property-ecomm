import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Layout as LayoutIcon, ArrowLeft, Share2, Heart, Phone, MessageCircle, FileText, CheckCircle } from 'lucide-react';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/properties/${id}`);
                if (!response.ok) throw new Error('Property not found');
                const data = await response.json();
                setProperty(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching property:', error);
                setLoading(false);
            }
        };

        fetchProperty();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!property) {
        return <div className="min-h-screen flex items-center justify-center">Property not found</div>;
    }

    return (
        <div className="pb-20">
            {/* Image Gallery (Mock Grid) */}
            <div className="h-[50vh] md:h-[60vh] relative group cursor-pointer">
                <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

                <div className="absolute top-6 left-4 sm:left-8">
                    <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-slate-800 font-semibold hover:bg-white transition-colors shadow-lg">
                        <ArrowLeft size={18} />
                        <span>Back</span>
                    </Link>
                </div>

                <div className="absolute bottom-6 right-4 sm:right-8 flex gap-3">
                    <button className="p-3 bg-white/90 backdrop-blur-md rounded-full text-slate-800 hover:text-primary transition-colors shadow-lg">
                        <Share2 size={20} />
                    </button>
                    <button className="p-3 bg-white/90 backdrop-blur-md rounded-full text-slate-800 hover:text-red-500 transition-colors shadow-lg">
                        <Heart size={20} />
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-slate-100">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                <div>
                                    <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-2">
                                        <span className="bg-primary/10 px-3 py-1 rounded-full">{property.type}</span>
                                        {property.isNew && <span className="bg-accent/10 text-accent px-3 py-1 rounded-full">New Launch</span>}
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{property.title}</h1>
                                    <div className="flex items-center gap-2 text-slate-500 text-lg">
                                        <MapPin size={20} className="text-accent" />
                                        {property.location}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-primary">{property.price}</p>
                                    <p className="text-slate-400 text-sm mt-1">RM 550 / sqft</p>
                                </div>
                            </div>

                            {/* Key Specs */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-slate-100">
                                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                                    <Bed size={24} className="mx-auto text-primary mb-2" />
                                    <p className="font-bold text-slate-800 text-lg">{property.bedrooms}</p>
                                    <p className="text-slate-500 text-xs uppercase">Bedrooms</p>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                                    <Bath size={24} className="mx-auto text-primary mb-2" />
                                    <p className="font-bold text-slate-800 text-lg">{property.bathrooms}</p>
                                    <p className="text-slate-500 text-xs uppercase">Bathrooms</p>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                                    <LayoutIcon size={24} className="mx-auto text-primary mb-2" />
                                    <p className="font-bold text-slate-800 text-lg">{property.area}</p>
                                    <p className="text-slate-500 text-xs uppercase">Built-up</p>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                                    <CheckCircle size={24} className="mx-auto text-primary mb-2" />
                                    <p className="font-bold text-slate-800 text-lg">Freehold</p>
                                    <p className="text-slate-500 text-xs uppercase">Tenure</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Description</h3>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    Welcome to this stunning {property.type.toLowerCase()} located in the prestigious {property.location}.
                                    Offering unparalleled luxury and comfort, this property features high-end finishes, spacious living areas, and breathtaking views.
                                    Perfect for families or professionals seeking a sophisticated lifestyle in the heart of the city.
                                </p>
                                <p className="text-slate-600 leading-relaxed">
                                    Enjoy world-class amenities including a swimming pool, gymnasium, 24-hour security, and easy access to major highways and shopping malls.
                                    Don't miss this opportunity to own your dream home.
                                </p>
                            </div>

                            {/* Facilities Mock */}
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Facilities</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                                    {['Swimming Pool', 'Gymnasium', '24H Security', 'BBQ Area', 'Playground', 'Covered Parking'].map(item => (
                                        <div key={item} className="flex items-center gap-2 text-slate-600">
                                            <div className="w-2 h-2 rounded-full bg-accent"></div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Agent Card */}
                    <div className="lg:w-96">
                        <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100 sticky top-24">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
                                    {/* Placeholder Agent Image */}
                                    <span className="text-2xl">👨‍💼</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">Alex Wong</h3>
                                    <p className="text-slate-500 text-sm">Senior Real Estate Negotiator</p>
                                    <p className="text-primary text-xs font-semibold mt-1">REN 12345</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/30">
                                    <MessageCircle size={20} />
                                    WhatsApp Agent
                                </button>
                                <button className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/30">
                                    <Phone size={20} />
                                    Call Agent
                                </button>
                            </div>

                            <div className="my-6 border-t border-slate-100"></div>

                            <button className="w-full py-3 border border-slate-200 hover:border-primary text-slate-600 hover:text-primary rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
                                <FileText size={20} />
                                Download Brochure
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
