import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, Building2, MapPin, Bed, Bath, Square } from 'lucide-react';
import PropertyFormModal from '../../components/admin/PropertyFormModal';
import toast from 'react-hot-toast';

const AdminProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/properties`);
            const data = await response.json();
            setProperties(data);
            setLoading(false);
        } catch (error) {

            toast.error('Failed to load properties');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this property?')) {
            try {
                // In a real app with auth, you'd send headers here
                const response = await fetch(`${API_URL}/api/properties/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setProperties(properties.filter(p => p._id !== id));
                    toast.success('Property deleted successfully');
                } else {
                    toast.error('Failed to delete property');
                }
            } catch (err) {

                toast.error('Error deleting property');
            }
        }
    };

    const handleAddClick = () => {
        setEditingProperty(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (property) => {
        setEditingProperty(property);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (formData) => {
        try {
            const url = editingProperty
                ? `${API_URL}/api/properties/${editingProperty._id}`
                : `${API_URL}/api/properties`;

            const method = editingProperty ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(propertyData),
            });

            if (response.ok) {
                setIsModalOpen(false);
                fetchProperties(); // Refresh list
                alert(editingProperty ? 'Property updated!' : 'Property added!');
            } else {
                alert('Operation failed. (Backend might not have this endpoint enabled yet)');
            }
        } catch (error) {

            alert('Error saving property');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Properties</h1>
                    <p className="text-slate-500">Manage your property listings.</p>
                </div>
                <button
                    onClick={handleAddClick}
                    className="bg-primary text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                >
                    <Plus size={18} /> Add Property
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search properties..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-slate-700 text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-900 font-semibold">
                            <tr>
                                <th className="px-6 py-4">Property</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-slate-400">Loading properties...</td>
                                </tr>
                            ) : properties.map((property) => (
                                <tr key={property._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={property.images?.[0] || 'https://placehold.co/100?text=No+Image'} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                            <div>
                                                <p className="font-medium text-slate-800">{property.title}</p>
                                                <p className="text-xs text-slate-400">{property.location}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{property.type}</td>
                                    <td className="px-6 py-4 font-medium text-slate-800">{property.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${property.category === 'Buy' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                                            }`}>
                                            {property.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEditClick(property)}
                                                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(property._id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!loading && properties.length === 0 && (
                    <div className="px-6 py-8 text-center text-slate-400">No properties found.</div>
                )}
            </div>

            <PropertyFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                editingProperty={editingProperty}
            />
        </div>
    );
};

export default AdminProperties;
