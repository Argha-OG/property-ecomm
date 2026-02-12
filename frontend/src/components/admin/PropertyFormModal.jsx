import React, { useState, useEffect } from 'react';
import { X, Upload, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const PropertyFormModal = ({ isOpen, onClose, onSubmit, editingProperty }) => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        location: '',
        type: 'Condo',
        category: 'Buy',
        bedrooms: '',
        bathrooms: '',
        sqft: '',
        description: '',
        images: '', // Comma separated URLs
        videos: '', // Comma separated URLs
    });

    useEffect(() => {
        if (editingProperty) {
            setFormData({
                ...editingProperty,
                images: editingProperty.images ? editingProperty.images.join(', ') : '',
                videos: editingProperty.videos ? editingProperty.videos.join(', ') : '',
            });
        } else {
            setFormData({
                title: '', price: '', location: '', type: 'Condo', category: 'Buy',
                bedrooms: '', bathrooms: '', sqft: '', description: '', images: '', videos: ''
            });
        }
    }, [editingProperty, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const imagesList = formData.images.split(',').map(url => url.trim()).filter(url => url);
        const videosList = formData.videos.split(',').map(url => url.trim()).filter(url => url);

        if (imagesList.length > 12) {
            toast.error(`You can only add up to 12 images. You have ${imagesList.length}.`);
            return;
        }

        if (videosList.length > 3) {
            toast.error(`You can only add up to 3 videos. You have ${videosList.length}.`);
            return;
        }

        const processedData = {
            ...formData,
            images: imagesList,
            videos: videosList,
        };
        onSubmit(processedData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-slate-800">
                        {editingProperty ? 'Edit Property' : 'Add New Property'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Title</label>
                            <input name="title" required value={formData.title} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. Luxury Condo in KL" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Price (RM)</label>
                            <input name="price" required value={formData.price} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. 1,200,000" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Location</label>
                            <input name="location" required value={formData.location} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. Mont Kiara" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none">
                                <option>Condo</option>
                                <option>Apartment</option>
                                <option>Bungalow</option>
                                <option>Terrace</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none">
                                <option>Buy</option>
                                <option>Rent</option>
                                <option>New Launch</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Beds</label>
                                <input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Baths</label>
                                <input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Sqft</label>
                                <input name="sqft" value={formData.sqft} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Description</label>
                        <textarea name="description" rows="3" value={formData.description} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Property details..." />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Images (URLs, Max 12)</label>
                        <textarea name="images" rows="3" value={formData.images} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-mono text-xs" placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg ..." />
                        <p className="text-xs text-slate-500">Comma separated. {formData.images ? formData.images.split(',').length : 0}/12 images</p>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Videos (URLs, Max 3)</label>
                        <textarea name="videos" rows="2" value={formData.videos} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-mono text-xs" placeholder="https://youtube.com/watch?v=..., https://vimeo.com/..." />
                        <p className="text-xs text-slate-500">Comma separated. {formData.videos ? formData.videos.split(',').length : 0}/3 videos</p>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all">
                            {editingProperty ? 'Update Property' : 'Add Property'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PropertyFormModal;
