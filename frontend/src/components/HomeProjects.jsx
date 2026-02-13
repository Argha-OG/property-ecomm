import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeProjects = () => {
    const projects = [
        {
            id: 1,
            title: "Centrum Caspia",
            location: "Brinchang, Pahang",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            badge: "NEW PROJECT"
        },
        {
            id: 2,
            title: "Solaris",
            location: "Kulai, Johor",
            image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            badge: "NEW PROJECT"
        },
        {
            id: 3,
            title: "Kawasan Perindustrian MIEL",
            location: "Kuala Kangsar, Perak",
            image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            badge: "NEW PROJECT"
        },
        {
            id: 4,
            title: "JRK Celestia",
            location: "Puchong, Selangor",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            badge: "NEW PROJECT"
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">Latest Projects</h2>
                    </div>
                    <Link to="/new-launch" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                        View More <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {projects.map((project) => (
                        <Link to={`/new-launch?search=${encodeURIComponent(project.title)}`} key={project.id} className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 block">
                            {/* Image */}
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-3 left-3 bg-[#D93025] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                                    {project.badge}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-sm text-slate-500 flex items-center gap-1">
                                    {project.location}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeProjects;
