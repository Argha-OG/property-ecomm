import React, { useEffect, useState } from 'react';
import { Building2, Users, Briefcase, Activity } from 'lucide-react';
import toast from 'react-hot-toast';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';

const Dashboard = () => {
    const [stats, setStats] = useState({
        properties: 0,
        leads: 0,
        agents: 0,
        jobs: 0
    });
    const [chartData, setChartData] = useState({
        leadsTrend: [],
        propertyType: [],
        marketSplit: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const [propsRes, leadsRes, agentsRes, jobsRes] = await Promise.all([
                    fetch(`${API_URL}/api/properties`),
                    fetch(`${API_URL}/api/leads`),
                    fetch(`${API_URL}/api/agents`),
                    fetch(`${API_URL}/api/admin/jobs`)
                ]);

                const props = await propsRes.json();
                const agents = await agentsRes.json();
                const jobs = await jobsRes.json();
                const leads = leadsRes.ok ? await leadsRes.json() : [];

                // Process Data for Charts

                // 1. Leads Trend (Last 7 Days) - Mocking dates if missing, or using createdAt
                const last7Days = [...Array(7)].map((_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    return d.toISOString().split('T')[0];
                }).reverse();

                const leadsTrend = last7Days.map(date => {
                    return {
                        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                        leads: leads.filter(l => l.createdAt && l.createdAt.startsWith(date)).length
                    };
                });

                // 2. Property Type Distribution
                const typeCount = props.reduce((acc, curr) => {
                    acc[curr.type] = (acc[curr.type] || 0) + 1;
                    return acc;
                }, {});
                const propertyType = Object.keys(typeCount).map(key => ({ name: key, value: typeCount[key] }));

                // 3. Market Split (Buy vs Rent vs New Launch)
                const categoryCount = props.reduce((acc, curr) => {
                    acc[curr.category] = (acc[curr.category] || 0) + 1;
                    return acc;
                }, {});
                const marketSplit = Object.keys(categoryCount).map(key => ({ name: key, value: categoryCount[key] }));

                setStats({
                    properties: props.length || 0,
                    leads: leads.length || 0,
                    agents: agents.length || 0,
                    jobs: jobs.length || 0
                });
                setChartData({ leadsTrend, propertyType, marketSplit });
                setLoading(false);
            } catch (error) {
                toast.error("Failed to load dashboard stats");
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

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Leads Trend */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Leads Overview (Last 7 Days)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData.leadsTrend}>
                                <defs>
                                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Area type="monotone" dataKey="leads" stroke="#8884d8" fillOpacity={1} fill="url(#colorLeads)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Market Split */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Market Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData.marketSplit}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Property Types */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Property Type Inventory</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData.propertyType}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.propertyType.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
