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
        images: '',
        videos: '',
        furnishing: 'Unfurnished',
        tenure: 'Freehold',
        completionYear: '',
        developer: '',
        facilities: [],
        agentName: '',
        agentContact: '',
        agentRen: '',
        agentImage: ''
    });

    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [previewVideos, setPreviewVideos] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (editingProperty) {
            setFormData({
                ...editingProperty,
                images: editingProperty.images ? editingProperty.images.join(', ') : '',
                videos: editingProperty.videos ? editingProperty.videos.join(', ') : '',
            });
            // Initialize previews from existing URLs
            setPreviewImages(editingProperty.images || []);
            setPreviewVideos(editingProperty.videos || []);
        } else {
            setFormData({
                title: '', price: '', location: '', type: 'Condo', category: 'Buy',
                bedrooms: '', bathrooms: '', sqft: '', description: '', images: '', videos: '',
                furnishing: 'Unfurnished', tenure: 'Freehold', completionYear: '', developer: '',
                facilities: [], agentName: '', agentContact: '', agentRen: '', agentImage: ''
            });
            setPreviewImages([]);
            setPreviewVideos([]);
        }
        setSelectedImages([]);
        setSelectedVideos([]);
    }, [editingProperty, isOpen]);

    // Update previews when URL text changes
    useEffect(() => {
        const urls = formData.images.split(',').map(u => u.trim()).filter(u => u);
        // Combine existing URLs with new file previews (which we need to handle carefully to not duplicate)
        // For simplicity, let's keep manual URL preview separate or just rely on the text area for now for URLs,
        // but the user wants "real time images".
        // Let's merge: Previews = URLs + ObjectURLs
        const objectUrls = selectedImages.map(file => URL.createObjectURL(file));
        setPreviewImages([...urls, ...objectUrls]);

        const videoUrls = formData.videos.split(',').map(u => u.trim()).filter(u => u);
        const videoObjectUrls = selectedVideos.map(file => URL.createObjectURL(file));
        setPreviewVideos([...videoUrls, ...videoObjectUrls]);

        // Cleanup object URLs to avoid memory leaks? React checks this but good practice.
    }, [formData.images, formData.videos, selectedImages, selectedVideos]);


    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageSelect = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedImages(prev => [...prev, ...filesArray]);
        }
    };

    const handleVideoSelect = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedVideos(prev => [...prev, ...filesArray]);
        }
    };

    const removeImage = (index) => {
        // Logic to remove... it's tricky because we have mixed sources.
        // Simplified: Clear all and let user re-select for now, OR better:
        // Identify if it's a URL or a File index. 
        // For MVP: Just allow clearing the file selection or the text.
        // Actually user wants to "remove specific".

        // Let's just implement clearing new files for now to avoid complex index mapping
        // between two sources (text & array).
        // Or:
        const urlsCount = formData.images.split(',').map(u => u.trim()).filter(u => u).length;
        if (index < urlsCount) {
            // It's a URL, remove from text string
            const urls = formData.images.split(',').map(u => u.trim()).filter(u => u);
            urls.splice(index, 1);
            setFormData({ ...formData, images: urls.join(', ') });
        } else {
            // It's a File
            const fileIndex = index - urlsCount;
            const newFiles = [...selectedImages];
            newFiles.splice(fileIndex, 1);
            setSelectedImages(newFiles);
        }
    };

    // Same for videos
    const removeVideo = (index) => {
        const urlsCount = formData.videos.split(',').map(u => u.trim()).filter(u => u).length;
        if (index < urlsCount) {
            const urls = formData.videos.split(',').map(u => u.trim()).filter(u => u);
            urls.splice(index, 1);
            setFormData({ ...formData, videos: urls.join(', ') });
        } else {
            const fileIndex = index - urlsCount;
            const newFiles = [...selectedVideos];
            newFiles.splice(fileIndex, 1);
            setSelectedVideos(newFiles);
        }
    };


    const uploadFiles = async (files) => {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Upload failed');
        return await response.json();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let finalImages = formData.images.split(',').map(url => url.trim()).filter(url => url);
            let finalVideos = formData.videos.split(',').map(url => url.trim()).filter(url => url);

            // Upload new images
            if (selectedImages.length > 0) {
                const result = await uploadFiles(selectedImages);
                // The server returns { urls: [...] } - we need to make sure the endpoint matches this
                // Based on server.js change: res.json({ urls: filePaths });
                if (result.urls) {
                    finalImages = [...finalImages, ...result.urls];
                }
            }

            // Upload new videos
            if (selectedVideos.length > 0) {
                const result = await uploadFiles(selectedVideos);
                if (result.urls) {
                    finalVideos = [...finalVideos, ...result.urls];
                }
            }

            if (finalImages.length > 12) {
                toast.error(`Total images cannot exceed 12.`);
                setUploading(false);
                return;
            }

            const processedData = {
                ...formData,
                images: finalImages,
                videos: finalVideos,
            };

            await onSubmit(processedData);
            setUploading(false);
        } catch (error) {

            toast.error('Failed to upload files or save property');
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-slate-800">
                        {editingProperty ? 'Edit Property' : 'Add New Property'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column: Basic Info */}
                        <div className="space-y-4">
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
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Type</label>
                                    <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none">
                                        <option>Condo</option>
                                        <option>Apartment</option>
                                        <option>Bungalow</option>
                                        <option>Terrace</option>
                                        <option>Semi-D</option>
                                        <option>Studio</option>
                                        <option>Penthouse</option>
                                        <option>Villa</option>
                                        <option>Townhouse</option>
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
                            <div className="space-y-1">
                                <textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Property details..." />
                            </div>

                            {/* New Details Section */}
                            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 mt-4">
                                <h3 className="col-span-2 font-bold text-slate-800 text-sm">Additional Details</h3>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Furnishing</label>
                                    <select name="furnishing" value={formData.furnishing} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none">
                                        <option>Unfurnished</option>
                                        <option>Partially Furnished</option>
                                        <option>Fully Furnished</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Tenure</label>
                                    <select name="tenure" value={formData.tenure} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none">
                                        <option>Freehold</option>
                                        <option>Leasehold</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Completion Year</label>
                                    <input name="completionYear" value={formData.completionYear} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. 2024" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Developer</label>
                                    <input name="developer" value={formData.developer} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Developer Name" />
                                </div>
                            </div>

                            {/* Agent Details Section */}
                            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                                <h3 className="col-span-2 font-bold text-slate-800 text-sm">Agent Details</h3>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Agent Name</label>
                                    <input name="agentName" value={formData.agentName} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Agent Contact</label>
                                    <input name="agentContact" value={formData.agentContact} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. 60123456789" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">REN No</label>
                                    <input name="agentRen" value={formData.agentRen} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. REN 12345" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Agent Image URL</label>
                                    <input name="agentImage" value={formData.agentImage} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="https://..." />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Media */}
                        <div className="space-y-6">
                            {/* Images Section */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 block">Images (Max 12)</label>

                                {/* File Input */}
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageSelect}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <Upload className="mx-auto text-slate-400 mb-2" size={24} />
                                    <p className="text-sm text-slate-600 font-medium">Click or Drag to Upload Images</p>
                                    <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WEBP</p>
                                </div>

                                {/* URL Input Fallback */}
                                <details className="text-xs text-slate-500">
                                    <summary className="cursor-pointer hover:text-primary">Add via URL instead</summary>
                                    <textarea name="images" rows="2" value={formData.images} onChange={handleChange} className="w-full p-2 mt-2 border border-slate-300 rounded-lg outline-none font-mono" placeholder="https://..." />
                                </details>

                                {/* Preview Grid */}
                                {previewImages.length > 0 && (
                                    <div className="grid grid-cols-4 gap-2 mt-4">
                                        {previewImages.map((src, index) => (
                                            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200">
                                                <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Videos Section */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 block">Videos (Max 3)</label>

                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        multiple
                                        accept="video/*"
                                        onChange={handleVideoSelect}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <Upload className="mx-auto text-slate-400 mb-2" size={24} />
                                    <p className="text-sm text-slate-600 font-medium">Click or Drag to Upload Videos</p>
                                </div>

                                <details className="text-xs text-slate-500">
                                    <summary className="cursor-pointer hover:text-primary">Add via URL instead</summary>
                                    <textarea name="videos" rows="2" value={formData.videos} onChange={handleChange} className="w-full p-2 mt-2 border border-slate-300 rounded-lg outline-none font-mono" placeholder="https://..." />
                                </details>

                                {previewVideos.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mt-4">
                                        {previewVideos.map((src, index) => (
                                            <div key={index} className="relative group aspect-video rounded-lg overflow-hidden border border-slate-200 bg-black">
                                                <video src={src} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeVideo(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancel</button>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="px-6 py-2 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {uploading ? <span className="animate-spin">⏳</span> : <Save size={18} />}
                            {uploading ? 'Uploading...' : (editingProperty ? 'Update Property' : 'Add Property')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PropertyFormModal;
