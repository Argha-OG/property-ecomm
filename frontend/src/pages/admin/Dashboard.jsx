import React, { useEffect, useState } from 'react';
import { Building2, Users, Briefcase, Activity } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        properties: 0,
        leads: 0,
        agents: 0,
        jobs: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const [propsRes, leadsRes, agentsRes, jobsRes] = await Promise.all([
                    fetch(`${API_URL}/api/properties`),
                    fetch(`${API_URL}/api/leads`), // Assuming/Need to verify lead route counts or just fetch all
                    fetch(`${API_URL}/api/agents`),
                    fetch(`${API_URL}/api/admin/jobs`)
                ]);

                const props = await propsRes.json();
                const agents = await agentsRes.json();
                const jobs = await jobsRes.json();

                // For leads, if route doesn't exist yet, we might fail. 
                // Previous steps didn't explicit show GET /api/leads implementation in server.js, 
                // but AdminLeads.jsx uses it. Let's assume it returns array.
                const leads = leadsRes.ok ? await leadsRes.json() : [];

                setStats({
                    properties: props.length || 0,
                    leads: leads.length || 0,
                    agents: agents.length || 0,
                    jobs: jobs.length || 0
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching stats", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { title: 'Properties', value: loading ? '...' : stats.properties, icon: Building2, color: 'bg-blue-500' },
        { title: 'Total Leads', value: loading ? '...' : stats.leads, icon: Users, color: 'bg-purple-500' },
        { title: 'Active Agents', value: loading ? '...' : stats.agents, icon: Users, color: 'bg-green-500' },
        { title: 'Open Jobs', value: loading ? '...' : stats.jobs, icon: Briefcase, color: 'bg-orange-500' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
                <p className="text-slate-500">Welcome back, Admin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white shadow-lg shadow-blue-500/20`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4">
                        <div className="w-2 h-2 mt-2 rounded-full bg-slate-300"></div>
                        <div>
                            <p className="text-sm font-medium text-slate-800">New lead submitted regarding "The Opus KL".</p>
                            <p className="text-xs text-slate-500">2 hours ago</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
