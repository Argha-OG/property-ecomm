import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/properties`);
                const data = await response.json();
                setProperties(data.slice(0, 6)); // Show first 6
                setLoading(false);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    return (
        <div className="min-h-screen">
            <Hero />

            {/* Placeholder for Listings Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-primary font-semibold text-sm uppercase tracking-widest">Featured Listings</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Latest Properties</h2>
                    <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Property Grid */}
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
            </section>
        </div>
    );
};

export default Home;
