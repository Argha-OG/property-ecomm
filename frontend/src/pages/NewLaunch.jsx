import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import Pagination from '../components/Pagination';

const NewLaunch = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

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

    const handleItemsPerPageChange = (e) => {
        const value = e.target.value === 'All' ? properties.length : parseInt(e.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    // Pagination Logic
    const totalPages = Math.ceil(properties.length / itemsPerPage);
    const paginatedProperties = properties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Scroll to top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">New Launches</h1>
                <p className="text-slate-600 mt-2">Be the first to own exclusive new developments.</p>
            </div>

            {/* Items Per Page Selector */}
            <div className="flex justify-end mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-slate-600 text-sm font-medium">Show:</span>
                    <select
                        onChange={handleItemsPerPageChange}
                        className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2"
                        value={itemsPerPage === properties.length ? 'All' : itemsPerPage}
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
        </div>
    );
};

export default NewLaunch;
