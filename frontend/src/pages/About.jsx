import React from 'react';

const About = () => {
    const team = [
        { name: "Sarah Tan", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { name: "David Chen", role: "Head of Sales", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { name: "Emily Wong", role: "Senior Consultant", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"></div>
                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Redefining Luxury Real Estate</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Rumajia connects discerning buyers with Malaysia's most exclusive properties, offering a seamless and premium experience from start to finish.
                    </p>
                </div>
            </div>

            <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Founded in 2024, Rumajia began with a simple vision: to simplify the complex world of real estate while maintaining the highest standards of service and integrity.
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

                {/* Team Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12">Meet Our Leadership</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member) => (
                            <div key={member.name} className="group">
                                <div className="relative overflow-hidden rounded-2xl mb-4 shadow-lg">
                                    <img src={member.img} alt={member.name} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                                        <span className="text-white font-semibold">View Profile</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                                <p className="text-primary font-medium">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
