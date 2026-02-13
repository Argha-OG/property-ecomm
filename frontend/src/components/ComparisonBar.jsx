import React from 'react';
import { useComparison } from '../context/ComparisonContext';
import { X, ArrowRightLeft, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComparisonBar = () => {
    const { compareList, removeFromCompare, clearCompare, isOpen, setIsOpen } = useComparison();

    if (compareList.length === 0) return null;

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2"
            >
                <ArrowRightLeft size={24} />
                <span className="font-bold">{compareList.length}</span>
            </button>
        );
    }

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-50 border-t border-slate-200 p-4 md:p-6 animate-slide-up">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {compareList.map((property) => (
                        <div key={property._id} className="relative flex-shrink-0 w-32 md:w-48 bg-slate-50 rounded-lg border border-slate-200 p-2 flex gap-2 items-center group">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-200 rounded overflow-hidden flex-shrink-0">
                                <img src={property.images?.[0]} alt={property.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-xs font-bold text-slate-800 truncate">{property.title}</h4>
                                <p className="text-xs text-primary font-semibold truncate">{property.price}</p>
                            </div>
                            <button
                                onClick={() => removeFromCompare(property._id)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                    {compareList.length < 3 && (
                        <div className="w-32 md:w-48 h-16 md:h-20 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-xs font-medium bg-slate-50">
                            Add {3 - compareList.length} more
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={clearCompare}
                        className="p-3 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        title="Clear all"
                    >
                        <Trash2 size={20} />
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-3 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors md:hidden"
                    >
                        <X size={20} />
                    </button>
                    <Link
                        to="/compare"
                        className="flex-1 md:flex-none px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowRightLeft size={20} />
                        Compare Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ComparisonBar;
