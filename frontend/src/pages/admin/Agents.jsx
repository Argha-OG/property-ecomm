import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, User, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminAgents = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: 'Real Estate Agent', bio: '', image: '', status: 'Active' });
    const [editingId, setEditingId] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchAgents = async () => {
        try {
            const response = await fetch(`${API_URL}/api/agents`);
            const data = await response.json();
            setAgents(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching agents:', error);
            toast.error('Failed to load agents');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingId ? `${API_URL}/api/agents/${editingId}` : `${API_URL}/api/agents`;
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchAgents();
                setIsModalOpen(false);
                setFormData({ name: '', email: '', phone: '', role: 'Real Estate Agent', bio: '', image: '', status: 'Active' });
                setEditingId(null);
                toast.success(editingId ? 'Agent updated successfully' : 'Agent added successfully');
            } else {
                toast.error('Failed to save agent');
            }
        } catch (error) {
            console.error('Error saving agent:', error);
            toast.error('Error saving agent');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this agent?')) {
            try {
                await fetch(`${API_URL}/api/agents/${id}`, { method: 'DELETE' });
                setAgents(agents.filter(a => a._id !== id));
                toast.success('Agent deleted');
            } catch (error) {
                console.error('Error deleting agent:', error);
                toast.error('Failed to delete agent');
            }
        }
    };

    const handleEdit = (agent) => {
        setFormData(agent);
        setEditingId(agent._id);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Agent Management</h1>
                    <p className="text-slate-500">Manage your real estate agents.</p>
                </div>
                <button onClick={() => { setEditingId(null); setFormData({ name: '', email: '', phone: '', role: 'Real Estate Agent', bio: '', image: '', status: 'Active' }); setIsModalOpen(true); }} className="bg-primary text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                    <Plus size={18} /> Add Agent
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-900 font-semibold">
                            <tr>
                                <th className="px-6 py-4">Agent</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? <tr><td colSpan="5" className="p-8 text-center">Loading...</td></tr> : agents.map((agent) => (
                                <tr key={agent._id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                                                {agent.image ? <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" /> : <User size={20} className="text-slate-400" />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800">{agent.name}</p>
                                                <p className="text-xs text-slate-400">Joined: {new Date(agent.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5"><Mail size={12} /> {agent.email}</div>
                                            <div className="flex items-center gap-1.5"><Phone size={12} /> {agent.phone}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{agent.role}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${agent.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
                                            {agent.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleEdit(agent)} className="p-2 text-slate-400 hover:text-primary"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(agent._id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6">
                        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Agent' : 'Add Agent'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input required placeholder="Name" className="w-full p-2 border rounded" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            <input required placeholder="Email" className="w-full p-2 border rounded" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            <input required placeholder="Phone" className="w-full p-2 border rounded" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                            <input placeholder="Role (e.g. Senior Agent)" className="w-full p-2 border rounded" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                            <input placeholder="Image URL" className="w-full p-2 border rounded" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                            <select className="w-full p-2 border rounded" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                            <div className="flex justify-end gap-2 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAgents;
