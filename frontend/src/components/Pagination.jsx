import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft size={20} className="text-slate-600" />
            </button>

            <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    // Simple logic to show all pages for now. 
                    // For many pages, we might want ellipsis (...) logic, but for now this is fine.
                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === page
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-slate-600 hover:bg-slate-50 border border-slate-200'
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight size={20} className="text-slate-600" />
            </button>
        </div>
    );
};

export default Pagination;
