import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';

const NewLaunch = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/properties?isNew=true`);
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

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">New Launches</h1>
                <p className="text-slate-600 mt-2">Be the first to own exclusive new developments.</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="h-96 bg-slate-100 rounded-3xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewLaunch;
