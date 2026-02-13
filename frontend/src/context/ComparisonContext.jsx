import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ComparisonContext = createContext();

export const useComparison = () => useContext(ComparisonContext);

export const ComparisonProvider = ({ children }) => {
    const [compareList, setCompareList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('property-compare-list');
        if (saved) {
            try {
                setCompareList(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse compare list", e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('property-compare-list', JSON.stringify(compareList));
    }, [compareList]);

    const addToCompare = (property) => {
        if (compareList.find(p => p._id === property._id)) {
            toast('Property already in comparison list', { icon: 'ℹ️' });
            return;
        }
        if (compareList.length >= 3) {
            toast.error('You can compare up to 3 properties only');
            return;
        }
        setCompareList([...compareList, property]);
        setIsOpen(true);
        toast.success('Added to comparison');
    };

    const removeFromCompare = (propertyId) => {
        setCompareList(compareList.filter(p => p._id !== propertyId));
    };

    const clearCompare = () => {
        setCompareList([]);
        setIsOpen(false);
    };

    const toggleCompare = () => setIsOpen(!isOpen);

    return (
        <ComparisonContext.Provider value={{
            compareList,
            addToCompare,
            removeFromCompare,
            clearCompare,
            isOpen,
            toggleCompare,
            setIsOpen
        }}>
            {children}
        </ComparisonContext.Provider>
    );
};
