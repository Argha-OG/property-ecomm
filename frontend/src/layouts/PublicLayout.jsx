import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout = ({ children }) => {
    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
