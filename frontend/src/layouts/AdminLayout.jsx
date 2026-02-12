import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Building2, Users, UserCheck, Briefcase, Activity, Bell, LogOut, Settings } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const location = useLocation(); // Added useLocation to determine active state

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
            navigate('/login');
        }
    };

    // The original navItems array is being replaced by direct rendering in the Code Edit.
    // I will update the navItems array to reflect the new links and icons,
    // and keep the existing NavLink rendering logic.
    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/properties', icon: Building2, label: 'Properties' }, // Changed Building to Building2
        { path: '/admin/leads', icon: Users, label: 'Leads' }, // Changed label from 'Client Leads' to 'Leads'
        { path: '/admin/agents', icon: UserCheck, label: 'Agents' }, // New item
        { path: '/admin/jobs', icon: Briefcase, label: 'Job Posts' }, // New item
        { path: '/admin/logs', icon: Activity, label: 'System Logs' }, // Changed icon from FileText to Activity, label from 'Site Logs' to 'System Logs'
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 fixed h-full z-10 hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Rumajia Admin
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                                }`
                            }
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl w-full transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-slate-800">Overview</h2>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                A
                            </div>
                            <span className="text-sm font-medium text-slate-700 hidden sm:block">Admin User</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
