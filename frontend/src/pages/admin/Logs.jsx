import React, { useEffect, useState } from 'react';
import { Clock, Activity, AlertCircle } from 'lucide-react';

const AdminLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                // Poll for new logs every 5 seconds for "real-time" feel
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/logs`);
                const data = await response.json();
                setLogs(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching logs:', error);
                setLoading(false);
            }
        };

        fetchLogs();
        const interval = setInterval(fetchLogs, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">System Logs</h1>
                <p className="text-slate-500">Monitor system activity and changes.</p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 shadow-lg min-h-[500px] font-mono text-sm overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 text-slate-400 border-b border-slate-800 pb-4 mb-4">
                    <Activity size={16} />
                    <span>Live Terminal Output</span>
                </div>

                <div className="space-y-3 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                    {loading ? (
                        <div className="text-slate-500">Initializing stream...</div>
                    ) : logs.length === 0 ? (
                        <div className="text-slate-500">No logs found.</div>
                    ) : (
                        logs.map((log) => (
                            <div key={log._id} className="flex gap-4 group">
                                <span className="text-slate-500 shrink-0 w-36">
                                    {new Date(log.createdAt).toLocaleTimeString()}
                                </span>
                                <div className="flex-1 break-all">
                                    <span className={`font-bold mr-3 ${log.action.includes('DELETE') ? 'text-red-400' :
                                            log.action.includes('CREATE') ? 'text-green-400' :
                                                log.action.includes('UPDATE') ? 'text-yellow-400' :
                                                    'text-blue-400'
                                        }`}>
                                        [{log.action}]
                                    </span>
                                    <span className="text-slate-300">
                                        {log.details}
                                    </span>
                                    <span className="text-slate-600 ml-2 text-xs">
                                        - {log.performer}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminLogs;
