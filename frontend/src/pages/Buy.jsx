import React, { useEffect, useState, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';

const Buy = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        location: '',
        type: '',
        minPrice: '',
        maxPrice: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // Check if URL has search params (from Hero search)
                const searchParams = new URLSearchParams(window.location.search);
                const search = searchParams.get('search');
                const location = searchParams.get('location');
                const type = searchParams.get('type');
                const minPrice = searchParams.get('minPrice');
                const maxPrice = searchParams.get('maxPrice');

                // Pre-fill filters from URL
                if (location || type || minPrice || maxPrice) {
                    setFilters({
                        location: location || '',
                        type: type || '',
                        minPrice: minPrice || '',
                        maxPrice: maxPrice || ''
                    });
                }

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
        setCurrentPage(1); // Reset to first page on filter change
    };

    const handleItemsPerPageChange = (e) => {
        const value = e.target.value === 'All' ? filteredProperties.length : parseInt(e.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
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
            // Price Custom Range
            const priceVal = parseInt(property.price.replace(/[^0-9]/g, ''));
            if (filters.minPrice && priceVal < parseInt(filters.minPrice)) return false;
            if (filters.maxPrice && priceVal > parseInt(filters.maxPrice)) return false;

            return true;
        });
    }, [properties, filters]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const paginatedProperties = filteredProperties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Properties for Sale</h1>
                <p className="text-slate-600 mt-2">Find your dream home from our exclusive listings.</p>
            </div>

            <FilterBar onFilterChange={handleFilterChange} />

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
                                onClick={() => setFilters({ location: '', type: '', minPrice: '', maxPrice: '' })}
                                className="mt-4 text-primary font-bold hover:underline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {paginatedProperties.map((property) => (
                                    <PropertyCard key={property._id} property={property} />
                                ))}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Buy;
