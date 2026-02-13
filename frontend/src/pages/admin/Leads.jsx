import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';

const AdminLeads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`);
                const data = await response.json();
                setLeads(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leads:', error);
                setLoading(false);
            }
        };
        fetchLeads();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Client Leads</h1>
                <p className="text-slate-500">Inquiries from your contact forms.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? <p>Loading leads...</p> : leads.length === 0 ? <p>No leads found.</p> : leads.map((lead) => (
                    <div key={lead._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                {lead.name.charAt(0)}
                            </div>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                <Calendar size={12} /> {new Date(lead.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <div>
                            <h3 className="font-bold text-slate-900">{lead.name}</h3>
                            <p className="text-sm text-primary font-medium">{lead.property}</p>
                        </div>

                        <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                                <Mail size={14} className="text-slate-400" />
                                {lead.email}
                            </div>
                            {lead.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-slate-400" />
                                    {lead.phone}
                                </div>
                            )}
                        </div>

                        <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600 italic">
                            "{lead.message}"
                        </div>

                        <div className="flex gap-2 mt-auto pt-2">
                            <a href={`mailto:${lead.email}`} className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors text-sm font-medium text-center">
                                Reply
                            </a>
                            {lead.phone && (
                                <a href={`tel:${lead.phone}`} className="flex-1 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium shadow-lg shadow-primary/20 text-center">
                                    Contact
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminLeads;
