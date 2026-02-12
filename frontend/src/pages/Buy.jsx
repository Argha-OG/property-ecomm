import React, { useEffect, useState, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';
import FilterBar from '../components/FilterBar';

const Buy = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        location: '',
        type: '',
        priceRange: ''
    });

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/properties?category=Buy`);
                const data = await response.json();
                setProperties(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const filteredProperties = useMemo(() => {
        return properties.filter(property => {
            // Location
            if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
                return false;
            }
            // Type
            if (filters.type && property.type !== filters.type) {
                return false;
            }
            // Price
            if (filters.priceRange) {
                const priceVal = parseInt(property.price.replace(/[^0-9]/g, ''));
                if (filters.priceRange === 'low' && priceVal >= 500000) return false;
                if (filters.priceRange === 'mid' && (priceVal < 500000 || priceVal > 1000000)) return false;
                if (filters.priceRange === 'high' && priceVal <= 1000000) return false;
            }
            return true;
        });
    }, [properties, filters]);

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Properties for Sale</h1>
                <p className="text-slate-600 mt-2">Find your dream home from our exclusive listings.</p>
            </div>

            <FilterBar onFilterChange={handleFilterChange} />

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="h-96 bg-slate-100 rounded-3xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <>
                    {filteredProperties.length === 0 ? (
                        <div className="text-center py-20 bg-slate-50 rounded-3xl">
                            <p className="text-slate-500 text-lg">No properties match your search.</p>
                            <button
                                onClick={() => setFilters({ location: '', type: '', priceRange: '' })}
                                className="mt-4 text-primary font-bold hover:underline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProperties.map((property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Buy;
