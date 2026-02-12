import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white/80 backdrop-blur-md border-t border-slate-200/60 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-accent font-bold text-lg">R</span>
                            </div>
                            <span className="text-primary font-serif font-bold text-xl">
                                Rumajia
                            </span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Premium real estate marketplace connecting you with your dream home. Luxury, comfort, and style in every listing.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-primary hover:text-white transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-primary hover:text-white transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-primary hover:text-white transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-primary hover:text-white transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-slate-900 font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {['Buy', 'Rent', 'Commercial', 'New Projects', 'Find an Agent'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-600 hover:text-primary text-sm transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-slate-900 font-bold mb-6">Support</h3>
                        <ul className="space-y-3">
                            {['Help Center', 'Terms of Service', 'Privacy Policy', 'Mortgage Calculator'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-600 hover:text-primary text-sm transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-slate-900 font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-600 text-sm">
                                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                                <span>Level 25, Menara ZynoxBit,<br /> Kuala Lumpur, Malaysia</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 text-sm">
                                <Phone size={18} className="text-primary shrink-0" />
                                <span>+60 3-1234 5678</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 text-sm">
                                <Mail size={18} className="text-primary shrink-0" />
                                <span>hello@rumajia.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs">
                        © {new Date().getFullYear()} Rumajia by ZynoxBit. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-slate-500 text-xs">
                        <a href="#" className="hover:text-primary">Privacy</a>
                        <a href="#" className="hover:text-primary">Terms</a>
                        <a href="#" className="hover:text-primary">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
