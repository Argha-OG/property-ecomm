import React, { useEffect, useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Careers = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        // ...
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`);
                const data = await response.json();
                setJobs(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                toast.error('Failed to load job openings');
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const [applicationForm, setApplicationForm] = useState({ name: '', email: '', phone: '', coverLetter: '', resumeLink: '' });

    const handleApply = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Submitting application...');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobId: selectedJob._id,
                    ...applicationForm
                }),
            });

            if (response.ok) {
                toast.success('Application submitted successfully!', { id: toastId });
                setSelectedJob(null);
                setApplicationForm({ name: '', email: '', phone: '', coverLetter: '', resumeLink: '' });
            } else {
                toast.error('Failed to submit application', { id: toastId });
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            toast.error('Error submitting application', { id: toastId });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
            {/* ... (keep existing JSX) */}
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-slate-800">Join Our Team</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Build your career with Rumajia. We are looking for passionate individuals to help us redefine the real estate experience.
                    </p>
                </div>

                <div className="grid gap-6">
                    {loading ? <p className="text-center text-slate-500">Loading openings...</p> : jobs.length === 0 ? <p className="text-center text-slate-500">No open positions at the moment.</p> : jobs.map((job) => (
                        <div key={job._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-slate-800">{job.title}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                                    <span className="flex items-center gap-1"><Briefcase size={14} /> {job.salary || 'Competitive'}</span>
                                </div>
                            </div>
                            <button onClick={() => setSelectedJob(job)} className="px-6 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center gap-2">
                                Apply Now <ArrowRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Application Modal */}
            {selectedJob && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-2">Apply for {selectedJob.title}</h2>
                        <p className="text-slate-500 text-sm mb-6">{selectedJob.location} • {selectedJob.type}</p>

                        <form onSubmit={handleApply} className="space-y-4">
                            <input required placeholder="Full Name" className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-primary/20" value={applicationForm.name} onChange={e => setApplicationForm({ ...applicationForm, name: e.target.value })} />
                            <input required type="email" placeholder="Email Address" className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-primary/20" value={applicationForm.email} onChange={e => setApplicationForm({ ...applicationForm, email: e.target.value })} />
                            <input required placeholder="Phone Number" className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-primary/20" value={applicationForm.phone} onChange={e => setApplicationForm({ ...applicationForm, phone: e.target.value })} />
                            <textarea required rows="3" placeholder="Cover Letter" className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-primary/20" value={applicationForm.coverLetter} onChange={e => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}></textarea>
                            <input placeholder="Portfolio / Resume Link" className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-primary/20" value={applicationForm.resumeLink} onChange={e => setApplicationForm({ ...applicationForm, resumeLink: e.target.value })} />

                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setSelectedJob(null)} className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors">Submit Application</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Careers;
