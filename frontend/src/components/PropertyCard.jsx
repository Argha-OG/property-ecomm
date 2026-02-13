import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Layout, Heart, Phone, MessageCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const PropertyCard = ({ property }) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);

    const handleCardClick = () => {
        navigate(`/property/${property._id}`);
    };

    const handleSave = (e) => {
        e.stopPropagation();
        setIsSaved(!isSaved);
        toast.success(isSaved ? 'Removed from favourites' : 'Saved to favourites');
    };

    const handleContact = (e) => {
        e.stopPropagation();
        window.open(`https://wa.me/60123456789?text=I'm interested in ${property.title}`, '_blank');
    };

    return (
        <div
            onClick={handleCardClick}
            className="group glass-card overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            data-aos="fade-up"
        >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={property.images?.[0] || 'https://placehold.co/600x400?text=No+Image'}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
                        {property.type}
                    </div>
                    {property.isNewLaunch && (
                        <div className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
                            New Launch
                        </div>
                    )}
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

                {/* Quick Actions Overlay (Visible on Hover) - Just Heart */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={handleSave}
                        className={`p-2 rounded-full shadow-lg transition-colors ${isSaved ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-sm text-slate-700 hover:text-red-500'}`}
                        title="Save Property"
                    >
                        <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0 pr-2">
                        <h3 className="text-lg font-bold text-slate-800 truncate">{property.title}</h3>
                        <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                            <MapPin size={14} className="text-accent shrink-0" />
                            <span className="truncate">{property.location}</span>
                        </div>
                    </div>
                    <p className="text-primary font-bold text-lg whitespace-nowrap">{property.price}</p>
                </div>

                {/* Specs Divider */}
                <div className="w-full h-px bg-slate-100 my-4"></div>

                <div className="flex justify-between items-center text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-2">
                        <Bed size={16} className="text-slate-400" />
                        <span className="font-semibold">{property.bedrooms}</span> <span className="text-xs">Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Bath size={16} className="text-slate-400" />
                        <span className="font-semibold">{property.bathrooms}</span> <span className="text-xs">Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Layout size={16} className="text-slate-400" />
                        <span className="font-semibold">{property.area}</span>
                    </div>
                </div>

                {/* Contact Agent Button (Always Visible) */}
                <button
                    onClick={handleContact}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 mt-auto"
                >
                    <MessageCircle size={18} />
                    Contact Agent
                </button>
            </div>
        </div>
    );
};

export default PropertyCard;
