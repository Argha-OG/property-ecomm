import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout = ({ children }) => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
            <Navbar />
            <main className={isHome ? '' : 'pt-20'}>{children}</main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
