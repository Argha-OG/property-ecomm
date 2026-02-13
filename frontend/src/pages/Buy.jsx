import React, { useEffect, useState, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const Buy = () => {
    const [properties, setProperties] = useState([]);
    const [suggestedProperties, setSuggestedProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        type: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        minSize: '',
        maxSize: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1); // Server-side pagination ideally, or client side slice

    // Fetch Properties whenever filters change
    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                // Construct URL with Query Params
                const params = new URLSearchParams();
                params.append('category', 'Buy');
                if (filters.search) params.append('search', filters.search);
                if (filters.type) params.append('type', filters.type);
                if (filters.minPrice) params.append('minPrice', filters.minPrice);
                if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
                if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);
                if (filters.minSize) params.append('minSize', filters.minSize);
                if (filters.maxSize) params.append('maxSize', filters.maxSize);

                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/properties?${params.toString()}`);
                const data = await response.json();
                setProperties(data);

                // Reset to page 1 if data changes significantly (handled by scroll to top logic usually)
                // If no results found, fetch suggestions (latest 3)
                if (data.length === 0) {
                    const suggestionsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/properties?category=Buy&limit=3`);
                    const suggestionsData = await suggestionsResponse.json();
                    setSuggestedProperties(suggestionsData);
                } else {
                    setSuggestedProperties([]);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setLoading(false);
            }
        };

        // Debounce fetch for search input text
        const timeoutId = setTimeout(() => {
            fetchProperties();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [filters]);

    // Initial Load from URL Params
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setFilters(prev => ({
            ...prev,
            search: searchParams.get('search') || '',
            type: searchParams.get('type') || '',
            minPrice: searchParams.get('minPrice') || '',
            maxPrice: searchParams.get('maxPrice') || '',
            bedrooms: searchParams.get('bedrooms') || '',
            minSize: searchParams.get('minSize') || '',
            maxSize: searchParams.get('maxSize') || ''
        }));
    }, []);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (e) => {
        const value = e.target.value;
        setItemsPerPage(value === 'All' ? properties.length : parseInt(value));
        setCurrentPage(1);
    };

    // Client-side pagination for now (since backend endpoint returns all matched)
    const paginatedProperties = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return itemsPerPage === 'All' ? properties : properties.slice(startIndex, startIndex + itemsPerPage);
    }, [properties, currentPage, itemsPerPage]);

    useEffect(() => {
        setTotalPages(Math.ceil(properties.length / (itemsPerPage === 'All' ? properties.length : itemsPerPage)) || 1);
    }, [properties, itemsPerPage]);

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <SEO title="Properties for Sale" description="Browse exclusive properties for sale in Malaysia." />
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Properties for Sale</h1>
                <p className="text-slate-600 mt-2">Find your dream home from our exclusive listings.</p>
            </div>

            <FilterBar onFilterChange={handleFilterChange} initialFilters={filters} />

            {/* Items Per Page Selector */}
            <div className="flex justify-end mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-slate-600 text-sm font-medium">Show:</span>
                    <select
                        onChange={handleItemsPerPageChange}
                        className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2"
                        value={itemsPerPage === properties.length && itemsPerPage !== 10 ? 'All' : itemsPerPage}
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
                    {properties.length === 0 ? (
                        <div className="py-10">
                            <div className="text-center py-20 bg-slate-50 rounded-3xl mb-12">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No properties found</h3>
                                <p className="text-slate-500 text-lg mb-6">
                                    We couldn't find any properties matching "{filters.search}".
                                </p>
                                <button
                                    onClick={() => setFilters({ search: '', type: '', minPrice: '', maxPrice: '', bedrooms: '', minSize: '', maxSize: '' })}
                                    className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                                >
                                    Clear All Filters
                                </button>
                            </div>

                            {suggestedProperties.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6">You might be interested in</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {suggestedProperties.map((property) => (
                                            <PropertyCard key={property._id} property={property} />
                                        ))}
                                    </div>
                                </div>
                            )}
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
