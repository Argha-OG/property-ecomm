import React from 'react';
import { useComparison } from '../context/ComparisonContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, X, MapPin, Bed, Bath, Layout, DollarSign, Calendar, Shield } from 'lucide-react';
import SEO from '../components/SEO';

const Compare = () => {
    const { compareList, removeFromCompare } = useComparison();

    if (compareList.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <ArrowRightLeft size={48} className="text-slate-300" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">No properties to compare</h2>
                <p className="text-slate-500 mb-8 max-w-md">Browse properties and add them to the comparison list to see them side-by-side.</p>
                <Link to="/buy" className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all">
                    Browse Properties
                </Link>
            </div>
        );
    }

    // Prepare Comparison Data
    const specs = [
        { label: 'Price', key: 'price', icon: DollarSign },
        { label: 'Location', key: 'location', icon: MapPin },
        { label: 'Type', key: 'type', icon: CheckCircle },
        { label: 'Bedrooms', key: 'bedrooms', icon: Bed },
        { label: 'Bathrooms', key: 'bathrooms', icon: Bath },
        { label: 'Built-up Area', key: 'area', icon: Layout },
        { label: 'Land Area', key: 'landArea', icon: Layout, format: (val) => val ? `${val} sqft` : '-' },
        { label: 'Tenure', key: 'tenure', icon: Shield },
        { label: 'Completion', key: 'completionYear', icon: Calendar },
        { label: 'Furnishing', key: 'furnishing', icon: CheckCircle },
    ];

    // Naively assume currency is RM and same for all for simpler diff logic in demo
    // Helper to extract number from price string "RM 2,500,000" -> 2500000
    const parsePrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;

    return (
        <div className="pt-24 pb-20 min-h-screen bg-slate-50">
            <SEO title="Compare Properties" description="Compare properties side-by-side to find your perfect home." />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Property Comparison</h1>
                    <Link to="/buy" className="text-primary font-semibold hover:underline flex items-center gap-2">
                        <ArrowLeft size={18} /> Back to Listings
                    </Link>
                </div>

                <div className="overflow-x-auto pb-6">
                    <div className="min-w-[800px] grid grid-cols-[200px_repeat(auto-fit,minmax(250px,1fr))] gap-0 border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">

                        {/* Header Row: Images & Title */}
                        <div className="p-6 bg-slate-50 border-b border-r border-slate-200 flex flex-col justify-end">
                            <span className="font-bold text-slate-400 uppercase text-xs tracking-wider">Property Details</span>
                        </div>
                        {compareList.map((property) => (
                            <div key={property._id} className="relative p-6 border-b border-r border-slate-200 last:border-r-0 min-w-[250px]">
                                <button
                                    onClick={() => removeFromCompare(property._id)}
                                    className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-slate-100">
                                    <img src={property.images?.[0]} alt={property.title} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-lg mb-1">{property.title}</h3>
                                <p className="text-primary font-bold text-xl">{property.price}</p>
                                <Link
                                    to={`/property/${property._id}`}
                                    className="mt-4 block w-full py-2 text-center border border-primary text-primary rounded-lg font-bold hover:bg-primary hover:text-white transition-colors"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))}
                        {/* Fill empty columns if needed, or just let grid handle it */}

                        {/* Specs Rows */}
                        {specs.map((spec) => (
                            <React.Fragment key={spec.key}>
                                <div className="p-4 bg-slate-50 border-b border-r border-slate-200 flex items-center gap-2 font-semibold text-slate-600">
                                    <spec.icon size={18} /> {spec.label}
                                </div>
                                {compareList.map((property) => {
                                    const val = property[spec.key];
                                    const displayVal = spec.format ? spec.format(val) : (val || '-');

                                    // Highlight best value logic (Optional/Demo)
                                    // For price: lower is better? For area: higher is better?
                                    // Let's just display for now to keep it clean.

                                    return (
                                        <div key={`${property._id}-${spec.key}`} className="p-4 border-b border-r border-slate-200 last:border-r-0 flex items-center text-slate-800 font-medium">
                                            {displayVal}
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

import { ArrowRightLeft } from 'lucide-react'; // Late import fix if needed, but added above.

export default Compare;
