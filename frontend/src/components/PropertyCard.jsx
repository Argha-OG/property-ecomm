import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Layout } from 'lucide-react';

const PropertyCard = ({ property }) => {
    return (
        <div className="group glass-card overflow-hidden">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {property.type}
                </div>
                {property.isNew && (
                    <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        New Launch
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{property.title}</h3>
                        <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                            <MapPin size={14} className="text-accent" />
                            <span className="line-clamp-1">{property.location}</span>
                        </div>
                    </div>
                    <p className="text-primary font-bold text-lg whitespace-nowrap">{property.price}</p>
                </div>

                {/* Specs Divider */}
                <div className="w-full h-px bg-slate-200 my-4"></div>

                <div className="flex justify-between items-center text-sm text-slate-600">
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

                {/* Hover Action */}
                <div className="mt-4 pt-0 h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:pt-4">
                    <Link to={`/property/${property._id}`} className="block w-full py-2 bg-primary text-center text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;

