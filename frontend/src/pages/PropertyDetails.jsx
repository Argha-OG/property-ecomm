import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Layout as LayoutIcon, ArrowLeft, Share2, Heart, Phone, MessageCircle, FileText, CheckCircle, User, Calendar, Building, Shield, Car, X, ChevronLeft, ChevronRight, DollarSign } from 'lucide-react';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLightbox, setShowLightbox] = useState(false);
    const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);

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

    const openLightbox = (index) => {
        setActiveLightboxIndex(index);
        setShowLightbox(true);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setActiveLightboxIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setActiveLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!property) return <div className="min-h-screen flex items-center justify-center">Property not found</div>;

    const images = property.images && property.images.length > 0 ? property.images : ['https://placehold.co/1200x800?text=No+Image'];

    return (
        <div className="pb-20 pt-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb & Title Header */}
                <div className="mb-6">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-4 transition-colors">
                        <ArrowLeft size={16} />
                        <span className="font-medium">Back to Listings</span>
                    </Link>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{property.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-slate-500">
                                <span className="flex items-center gap-1"><MapPin size={16} className="text-accent" /> {property.location}</span>
                                {property.type && <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-xs font-bold uppercase">{property.type}</span>}
                                {property.tenure && <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-xs font-bold uppercase">{property.tenure}</span>}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="p-2 border border-slate-200 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
                                <Share2 size={20} />
                            </button>
                            <button className="p-2 border border-slate-200 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
                                <Heart size={20} />
                            </button>
                            <button className="p-2 border border-slate-200 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
                                <div className="flex flex-col items-center justify-center w-5 h-5">
                                    <span className="block w-1 h-1 bg-current rounded-full mb-0.5"></span>
                                    <span className="block w-1 h-1 bg-current rounded-full mb-0.5"></span>
                                    <span className="block w-1 h-1 bg-current rounded-full"></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Price & Per Sqft */}
                <div className="mb-6">
                    <span className="text-3xl md:text-4xl font-bold text-primary">{property.price}</span>
                    {property.price && <span className="text-slate-500 text-lg ml-2"> (approx. RM 550 psf)</span>}
                </div>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8 h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
                    {/* Main Image */}
                    <div onClick={() => openLightbox(0)} className="md:col-span-2 md:row-span-2 relative group cursor-pointer h-full">
                        <img src={images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    {/* Sub Images */}
                    <div className="hidden md:grid grid-cols-2 col-span-2 row-span-2 gap-2 h-full">
                        {images.slice(1, 5).map((img, idx) => (
                            <div key={idx} onClick={() => openLightbox(idx + 1)} className="relative group cursor-pointer overflow-hidden h-full">
                                <img src={img} alt={`Sub ${idx}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                {idx === 3 && images.length > 5 && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg">
                                        +{images.length - 5} More
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* Fillers if not enough images */}
                        {images.length < 5 && Array(5 - images.length).fill(0).map((_, idx) => (
                            <div key={`placeholder-${idx}`} className="bg-slate-200 h-full flex items-center justify-center text-slate-400">
                                <span className="text-xs">No Image</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lightbox Modal */}
                {showLightbox && (
                    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowLightbox(false)}>
                        <button className="absolute top-4 right-4 text-white hover:text-gray-300 p-2" onClick={() => setShowLightbox(false)}>
                            <X size={32} />
                        </button>
                        <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-4" onClick={prevImage}>
                            <ChevronLeft size={40} />
                        </button>
                        <img
                            src={images[activeLightboxIndex]}
                            alt="Full screen"
                            className="max-w-full max-h-[90vh] object-contain select-none"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-4" onClick={nextImage}>
                            <ChevronRight size={40} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-medium bg-black/50 px-4 py-1 rounded-full">
                            {activeLightboxIndex + 1} / {images.length}
                        </div>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Details */}
                    <div className="flex-1">

                        {/* Key Specs Row */}
                        <div className="flex flex-wrap gap-8 py-6 border-y border-slate-200 mb-8">
                            <div className="flex items-center gap-2">
                                <Bed className="text-slate-400" size={24} />
                                <div>
                                    <p className="font-bold text-slate-900">{property.bedrooms} Beds</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Bath className="text-slate-400" size={24} />
                                <div>
                                    <p className="font-bold text-slate-900">{property.bathrooms} Baths</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <LayoutIcon className="text-slate-400" size={24} />
                                <div>
                                    <p className="font-bold text-slate-900">{property.area} sqft</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Car className="text-slate-400" size={24} />
                                <div>
                                    <p className="font-bold text-slate-900">2 Carparks</p>
                                </div>
                            </div>
                        </div>

                        {/* Property Details Table */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Property details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500 flex items-center gap-2"><Building size={16} /> Property Type</span>
                                    <span className="font-medium text-slate-800">{property.type}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500 flex items-center gap-2"><LayoutIcon size={16} /> Land Size</span>
                                    <span className="font-medium text-slate-800">{property.area} sqft</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500 flex items-center gap-2"><CheckCircle size={16} /> Furnishing</span>
                                    <span className="font-medium text-slate-800">{property.furnishing || 'Unfurnished'}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500 flex items-center gap-2"><Calendar size={16} /> Year Built</span>
                                    <span className="font-medium text-slate-800">{property.completionYear || '2023'}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500 flex items-center gap-2"><Shield size={16} /> Tenure</span>
                                    <span className="font-medium text-slate-800">{property.tenure || 'Freehold'}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500 flex items-center gap-2"><FileText size={16} /> Title Code</span>
                                    <span className="font-medium text-slate-800">Strata</span>
                                </div>
                            </div>
                            <button className="mt-4 text-primary font-semibold hover:underline">View more details</button>
                        </div>

                        {/* About Property */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">About this property</h3>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                                <p className="whitespace-pre-line">{property.description || "No description available."}</p>
                            </div>
                            <button className="mt-4 text-primary font-semibold hover:underline">Read more</button>
                        </div>

                        {/* Location Map (Iframe) */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Location</h3>
                            <div className="bg-slate-100 rounded-2xl h-80 w-full overflow-hidden relative shadow-inner">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight="0"
                                    marginWidth="0"
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                    className="filter grayscale hover:grayscale-0 transition-all duration-500"
                                ></iframe>
                            </div>
                        </div>

                        {/* Mortgage Calculator */}
                        <div className="mb-8 p-6 bg-slate-50 rounded-3xl border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><DollarSign size={20} className="text-primary" /> Mortgage Calculator</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-4 md:col-span-2">
                                    <div>
                                        <label className="text-sm font-semibold text-slate-600 block mb-2">Property Price</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">RM</span>
                                            <input type="text" defaultValue={property.price} className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-primary font-bold text-slate-800" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-semibold text-slate-600 block mb-2">Down Payment (10%)</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">RM</span>
                                                <input type="text" defaultValue="55,000" className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-primary font-bold text-slate-800" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-slate-600 block mb-2">Interest Rate</label>
                                            <div className="relative">
                                                <input type="text" defaultValue="3.5" className="w-full pl-4 pr-8 py-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-primary font-bold text-slate-800" />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-slate-600 block mb-2">Loan Tenure (Years)</label>
                                        <input type="range" min="10" max="35" defaultValue="30" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                                            <span>10 Years</span>
                                            <span className="font-bold text-primary">30 Years</span>
                                            <span>35 Years</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                                        <DollarSign size={32} className="text-green-600" />
                                    </div>
                                    <p className="text-slate-500 text-sm font-medium">Monthly Repayment</p>
                                    <p className="text-3xl font-bold text-slate-900 my-2">RM 2,450</p>
                                    <button className="text-primary text-sm font-bold hover:underline">View full breakdown</button>
                                </div>
                            </div>
                        </div>

                        {/* Similar Listings */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Similar Listings</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-3 border border-slate-100 flex gap-3 cursor-pointer group">
                                        <div className="w-24 h-24 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={`https://placehold.co/200x200?text=House+${i}`} alt="Similar" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 line-clamp-1">Luxury Apex Condo</h4>
                                            <p className="text-xs text-slate-500 mb-2">Mont Kiara, KL</p>
                                            <p className="text-primary font-bold">RM 850,000</p>
                                            <div className="flex gap-2 mt-2 text-xs text-slate-400">
                                                <span className="flex items-center gap-1"><Bed size={12} /> 3</span>
                                                <span className="flex items-center gap-1"><Bath size={12} /> 2</span>
                                                <span className="flex items-center gap-1"><LayoutIcon size={12} /> 1200</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Facilities */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {property.facilities && property.facilities.length > 0 ? (
                                    property.facilities.map((am, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-slate-600">
                                            <CheckCircle size={16} className="text-primary" />
                                            <span>{am}</span>
                                        </div>
                                    ))
                                ) : (
                                    ['Air conditioning', 'Gymnasium', 'Swimming Pool', '24h Security', 'Balcony', 'High floor'].map((am, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-slate-600">
                                            <CheckCircle size={16} className="text-slate-400" />
                                            <span>{am}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Agent Sidebar */}
                    <div className="w-full lg:w-[380px] flex-shrink-0">
                        <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                                        <img src={property.agentImage || "https://i.pravatar.cc/150?img=11"} alt="Agent" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg">{property.agentName || "James Chen"}</h3>
                                        <p className="text-xs text-slate-500">{property.agentRen || "REN 09876"} • Senior Negotiator</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="text-amber-400 text-xs">★★★★★</span>
                                            <span className="text-slate-400 text-xs">(48 reviews)</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-slate-600"><Share2 size={18} /></button>
                            </div>

                            <button className="w-full py-3.5 bg-[#D93025] hover:bg-[#c52b21] text-white rounded-lg font-bold flex items-center justify-center gap-2 mb-3 shadow-lg shadow-red-500/20 transition-all">
                                <Phone size={18} />
                                {property.agentContact || "012-345 6789"}
                            </button>

                            <button className="w-full py-3.5 bg-white border border-slate-300 hover:border-slate-800 text-slate-800 rounded-lg font-bold flex items-center justify-center gap-2 mb-3 transition-all">
                                <MessageCircle size={18} />
                                WhatsApp Agent
                            </button>

                            <button className="w-full py-3.5 bg-white border border-slate-300 hover:border-slate-800 text-slate-800 rounded-lg font-bold flex items-center justify-center gap-2 transition-all">
                                <Shield size={18} />
                                Get financing
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
