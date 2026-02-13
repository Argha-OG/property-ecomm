import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Buy', path: '/buy' },
        { name: 'Rent', path: '/rent' },
        { name: 'New Launch', path: '/new-launch' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary/90 rounded-lg flex items-center justify-center shadow-lg">
                                <span className="text-accent font-bold text-xl">R</span>
                            </div>
                            <span className="text-primary font-serif font-bold text-xl tracking-tight">
                                Demo JK
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-slate-700 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium relative group"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center gap-4">
                        <button className="p-2 text-slate-600 hover:text-primary transition-colors rounded-full hover:bg-slate-100/50">
                            <Search size={20} />
                        </button>
                        <Link to="/login" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full shadow-lg hover:shadow-primary/30 transition-shadow">
                            <User size={18} />
                            <span className="text-sm font-medium">Login</span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-primary hover:bg-slate-100/50 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass border-t border-white/20 absolute w-full">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-slate-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 pb-2 border-t border-slate-100">
                            <Link to="/login" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl shadow-md">
                                <User size={18} />
                                <span>Login / Register</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
