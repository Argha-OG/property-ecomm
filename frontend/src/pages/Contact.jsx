import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, submitting, success

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                alert('Failed to send message. Please try again.');
                setStatus('idle');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Error sending message.');
            setStatus('idle');
        }
    };

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-primary mb-4">Get in Touch</h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Have questions about a property or want to list with us? We're here to help. Reach out to our team today.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 h-fit">
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                            <p className="text-slate-600 mb-6">Thank you for contacting us. We will get back to you shortly.</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="text-primary font-bold hover:underline"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                    <textarea
                                        rows="5"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {status === 'submitting' ? 'Sending...' : (
                                        <>
                                            Send Message <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>

                {/* Contact Info & Map */}
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center gap-2">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
                                <Phone size={24} />
                            </div>
                            <p className="text-sm text-slate-500">Phone</p>
                            <p className="font-bold text-slate-800">+60 3-1234 5678</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center gap-2">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
                                <Mail size={24} />
                            </div>
                            <p className="text-sm text-slate-500">Email</p>
                            <p className="font-bold text-slate-800">hello@rumajia.com</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Our Office</p>
                                <p className="font-bold text-slate-800">Menara ZynoxBit, Kuala Lumpur</p>
                            </div>
                        </div>
                        {/* Placeholder Map - Using a static image for visual if iframe not desired, or iframe for realism */}
                        <div className="w-full h-64 bg-slate-200 rounded-xl overflow-hidden relative">
                            <iframe
                                title="Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.810577712396!2d101.68685531475736!3d3.1492379540549495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc362d250812d1%3A0xa613247065f4d1e2!2sKuala%20Lumpur%20City%20Centre%2C%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1645000000000!5m2!1sen!2smy"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
