import React from 'react';
import { Shield, User, CheckCircle } from 'lucide-react';

const AdminManagement = () => {
    // Static data for now since we don't have an API for this yet
    const admins = [
        { id: 1, name: 'Main Admin', email: 'admin@demojk.com', role: 'Super Admin', status: 'Active', lastActive: 'Now' }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Admin Management</h1>
                <p className="text-slate-500">Manage system administrators and permissions.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Shield className="text-primary" size={20} />
                        Authorized Administrators
                    </h3>
                    <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                        {admins.length} Active
                    </span>
                </div>

                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-900 font-semibold">
                        <tr>
                            <th className="px-6 py-4">Admin User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Last Active</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {admins.map((admin) => (
                            <tr key={admin.id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800">{admin.name}</p>
                                            <p className="text-xs text-slate-400">{admin.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-medium text-xs">
                                        {admin.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-green-600 font-medium">
                                        <CheckCircle size={14} />
                                        {admin.status}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-400">
                                    {admin.lastActive}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-blue-800 text-sm">
                <strong>Note:</strong> Admin management features (Add/Remove Admins) are currently disabled in this demo version.
            </div>
        </div>
    );
};

export default AdminManagement;
