import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', type: 'Full-time', location: '', description: '', requirements: '', salary: '', status: 'Active' });
    const [editingId, setEditingId] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchJobs = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/jobs`);
            const data = await response.json();
            setJobs(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            toast.error('Failed to load jobs');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Only have POST and DELETE for now based on Plan, but let's assume I might add PUT later or just use POST for simplicity if reusing.
            // Actually, I only added POST/DELETE in server.js. Let's stick to Create for now, or just Delete and Re-create.
            // Wait, I should probably add PUT in server.js if I want edit. 
            // For now, let's implement Create.
            const url = `${API_URL}/api/jobs`; // Simplification: Only Add implemented fully in backend for now.

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, requirements: formData.requirements.split(',').map(r => r.trim()) }),
            });

            if (response.ok) {
                fetchJobs();
                setIsModalOpen(false);
                setFormData({ title: '', type: 'Full-time', location: '', description: '', requirements: '', salary: '', status: 'Active' });
                toast.success('Job posted successfully');
            } else {
                toast.error('Failed to post job');
            }
        } catch (error) {
            console.error('Error saving job:', error);
            toast.error('Error saving job');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this job post?')) {
            try {
                await fetch(`${API_URL}/api/jobs/${id}`, { method: 'DELETE' });
                setJobs(jobs.filter(j => j._id !== id));
                toast.success('Job deleted');
            } catch (error) {
                console.error('Error deleting job:', error);
                toast.error('Failed to delete job');
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Job Board</h1>
                    <p className="text-slate-500">Manage career opportunities.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                    <Plus size={18} /> Post Job
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-900 font-semibold">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? <tr><td colSpan="5" className="p-8 text-center">Loading...</td></tr> : jobs.map((job) => (
                            <tr key={job._id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                            <Briefcase size={16} />
                                        </div>
                                        <span className="font-medium text-slate-800">{job.title}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{job.type}</td>
                                <td className="px-6 py-4">{job.location}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleDelete(job._id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Post New Job</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input required placeholder="Job Title" className="w-full p-2 border rounded" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            <div className="grid grid-cols-2 gap-4">
                                <select className="w-full p-2 border rounded" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Contract</option>
                                    <option>Internship</option>
                                </select>
                                <input required placeholder="Location" className="w-full p-2 border rounded" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                            </div>
                            <input placeholder="Salary Range" className="w-full p-2 border rounded" value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} />
                            <textarea required rows="4" placeholder="Job Description" className="w-full p-2 border rounded" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            <textarea placeholder="Requirements (Comma separated)" className="w-full p-2 border rounded" value={formData.requirements} onChange={e => setFormData({ ...formData, requirements: e.target.value })} />
                            <select className="w-full p-2 border rounded" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option>Active</option>
                                <option>Closed</option>
                            </select>
                            <div className="flex justify-end gap-2 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Post Job</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminJobs;
