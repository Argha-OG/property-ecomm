import React from 'react';
import { Award, Users, Target, Clock, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const About = () => {
    const team = [
        { name: "Sarah Tan", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { name: "David Chen", role: "Head of Sales", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { name: "Emily Wong", role: "Senior Consultant", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
    ];

    return (
        <div className="min-h-screen">
            <SEO
                title="About Us"
                description="Learn more about Demo JK Properties, our mission, vision, and the team behind our success."
            />
            {/* Hero Section */}
            <div className="relative pt-36 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"></div>
                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Redefining Luxury Real Estate</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Demo JK connects discerning buyers with Malaysia's most exclusive properties, offering a seamless and premium experience from start to finish.
                    </p>
                </div>
            </div>

            <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Founded in 2024, Demo JK began with a simple vision: to simplify the complex world of real estate while maintaining the highest standards of service and integrity.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            We believe that finding a home is more than just a transaction; it's about finding a sanctuary that reflects your lifestyle and aspirations. Our team of dedicated professionals uses cutting-edge technology and deep market insights to guide you every step of the way.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-accent/20 rounded-3xl transform rotate-3"></div>
                        <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Office" className="relative rounded-3xl shadow-xl w-full" />
                    </div>
                </div>

                {/* Mission & Values */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Essence</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Driven by Purpose</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Target, title: "Our Mission", desc: "To empower every individual to find their perfect sanctuary through transparent, efficient, and personalized real estate services." },
                            { icon: Award, title: "Our Vision", desc: "To be the most trusted and innovative real estate partner in Malaysia, setting new standards for luxury and service." },
                            { icon: CheckCircle, title: "Our Values", desc: "Integrity, Excellence, and Innovation are at the heart of everything we do. We put our clients first, always." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay={idx * 100}>
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-slate-900 rounded-[3rem] p-12 md:p-16 mb-24 relative overflow-hidden" data-aos="fade-up">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                    <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "500+", label: "Properties Sold" },
                            { number: "98%", label: "Client Satisfaction" },
                            { number: "10+", label: "Years Experience" },
                            { number: "50+", label: "Awards Won" }
                        ].map((stat, idx) => (
                            <div key={idx} className="space-y-2">
                                <h4 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</h4>
                                <p className="text-slate-400 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="text-center max-w-6xl mx-auto">
                    <div className="mb-12">
                        <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Leadership</span>
                        <h2 className="text-4xl font-bold text-slate-900 mt-2">Meet the Minds Behind Demo JK</h2>
                        <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
                            Visionaries, strategists, and experts dedicated to transforming the real estate landscape.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                name: "Sarah Tan",
                                role: "CEO & Founder",
                                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                bio: "Leading with a vision for innovative property solutions.",
                                social: { linkedin: "#", twitter: "#", mail: "mailto:sarah@demojk.com" }
                            },
                            {
                                name: "David Chen",
                                role: "Head of Sales",
                                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                bio: "Reviewing market trends to secure the best deals for our clients.",
                                social: { linkedin: "#", twitter: "#", mail: "mailto:david@demojk.com" }

                            },
                            {
                                name: "Emily Wong",
                                role: "Senior Consultant",
                                img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                bio: "Expert in luxury residential properties and investment portfolios.",
                                social: { linkedin: "#", twitter: "#", mail: "mailto:emily@demojk.com" }
                            }
                        ].map((member, idx) => (
                            <div
                                key={idx}
                                className="group relative h-[420px] rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl"
                                data-aos="fade-up"
                                data-aos-delay={idx * 100}
                            >
                                {/* Image Background */}
                                <div className="absolute inset-0">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg relative overflow-hidden">
                                        {/* Subtle Shine Effect on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shine"></div>

                                        <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                                        <p className="text-accent font-medium mb-3">{member.role}</p>

                                        <div className="h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:h-auto group-hover:opacity-100 group-hover:mb-4">
                                            <p className="text-slate-200 text-sm leading-relaxed mb-4">
                                                {member.bio}
                                            </p>
                                        </div>

                                        <div className="flex gap-4 justify-start pt-2 border-t border-white/10 mt-2">
                                            <a href={member.social.linkedin} className="p-2 bg-white/10 rounded-full hover:bg-primary hover:text-white transition-colors text-white/80">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                            </a>
                                            <a href={member.social.twitter} className="p-2 bg-white/10 rounded-full hover:bg-sky-500 hover:text-white transition-colors text-white/80">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
                                            </a>
                                            <a href={member.social.mail} className="p-2 bg-white/10 rounded-full hover:bg-red-500 hover:text-white transition-colors text-white/80">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Find Your Dream Home?</h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Explore our exclusive listings and let our expert team guide you to the property you've always imagined.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/buy" className="px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg">
                            Browse Properties
                        </a>
                        <a href="/contact" className="px-8 py-4 bg-primary-dark border border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
