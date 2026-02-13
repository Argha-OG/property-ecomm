import React, { useEffect, useState } from 'react';
import api from '../services/api';
import PropertyCard from '../components/PropertyCard';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const NewLaunch = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // Check for search param
                const searchParams = new URLSearchParams(window.location.search);
                const search = searchParams.get('search');
                if (search) setSearchQuery(search);

                const response = await api.get('/api/properties?isNewLaunch=true');
                const data = response.data;
                // Defensive check: ensure data is an array
                if (Array.isArray(data)) {
                    setProperties(data);
                } else {
                    console.error('API returned non-array data:', data);
                    setProperties([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setProperties([]);
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const handleItemsPerPageChange = (e) => {
        const value = e.target.value === 'All' ? filteredProperties.length : parseInt(e.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    // Filter Logic
    const filteredProperties = properties.filter(property => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            property.title.toLowerCase().includes(query) ||
            property.location.toLowerCase().includes(query)
        );
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const paginatedProperties = filteredProperties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Scroll to top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return (
        <div className="min-h-screen pt-28 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <SEO title="New Launches" description="Discover the latest property launches and developments." />
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">New Launches</h1>
                    <p className="text-slate-600 mt-2">Be the first to own exclusive new developments.</p>
                </div>
                {searchQuery && (
                    <div className="bg-slate-100 px-4 py-2 rounded-lg flex items-center gap-2">
                        <span className="text-slate-600 text-sm">Filtering by: <span className="font-bold text-slate-900">{searchQuery}</span></span>
                        <button onClick={() => { setSearchQuery(''); window.history.pushState({}, '', '/new-launch'); }} className="text-slate-400 hover:text-red-500">
                            ✕
                        </button>
                    </div>
                )}
            </div>

            {/* Items Per Page Selector */}
            <div className="flex justify-end mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-slate-600 text-sm font-medium">Show:</span>
                    <select
                        onChange={handleItemsPerPageChange}
                        className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2"
                        value={itemsPerPage === filteredProperties.length ? 'All' : itemsPerPage}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="60">60</option>
                        <option value="80">80</option>
                        <option value="All">All</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch">
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
                                onClick={() => { setSearchQuery(''); window.history.pushState({}, '', '/new-launch'); }}
                                className="mt-4 text-primary font-bold hover:underline"
                            >
                                Clear Search
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch">
                            {paginatedProperties.map((property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                    )}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default NewLaunch;
