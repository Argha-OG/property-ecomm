import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import HomePromo from '../components/HomePromo';
import HomeProjects from '../components/HomeProjects';
import HomeResources from '../components/HomeResources';
import PropertyCard from '../components/PropertyCard';
import SEO from '../components/SEO';

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/properties`);
                const data = await response.json();
                setProperties(data.slice(0, 13)); // Fetch more to cover both sections without overlap
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
            <SEO title="Home" />
            <Hero />
            <HomePromo />

            {/* Placeholder for Listings Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" data-aos="fade-up">
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
                        {properties.slice(0, 9).map((property, index) => (
                            <PropertyCard key={property._id} property={property} index={index} />
                        ))}
                    </div>
                )}
            </section>

            {/* Latest Projects Section */}
            <div data-aos="fade-up">
                <HomeProjects />
            </div>

            {/* Handpicked For You Section */}
            <section className="py-16 bg-slate-50" data-aos="fade-up">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">Handpicked For You</h2>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="h-80 bg-slate-200 rounded-3xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Showing properties 10-13 as 'handpicked' example */}
                            {properties.slice(9, 13).map((property, index) => (
                                <PropertyCard key={property._id} property={property} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </section >

            {/* Resources Section (Agent, Safety, Areas) */}
            <div data-aos="fade-up">
                <HomeResources />
            </div>
        </div >
    );
};

export default Home;
