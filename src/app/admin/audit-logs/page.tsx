'use client';

import { useEffect, useState } from 'react';
import api from '@/config/api';
import { Search } from 'lucide-react';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/admin/audit-logs')
      .then(res => {
        if (res.data.success) {
          setLogs(res.data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchAction = filterAction === 'ALL' || log.action === filterAction;
    const matchSearch = search === '' || 
      log.role.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      (log.performedBy?.email && log.performedBy.email.toLowerCase().includes(search.toLowerCase()));
    return matchAction && matchSearch;
  });

  if (loading) return <div>Loading audit logs...</div>;

  const actions = ['ALL', ...Array.from(new Set(logs.map(l => l.action)))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">System Audit Logs</h1>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by action, role or email..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <select 
          value={filterAction} 
          onChange={e => setFilterAction(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
        >
          {actions.map(a => <option key={a} value={a}>{a.replace(/_/g, ' ')}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                <th className="p-4 font-medium">Timestamp</th>
                <th className="p-4 font-medium">Action</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Performed By</th>
                <th className="p-4 font-medium">IP Address</th>
                <th className="p-4 font-medium">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.map(log => (
                <tr key={log._id} className="hover:bg-gray-50 text-sm">
                  <td className="p-4 whitespace-nowrap">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="p-4 font-medium text-amber-600">{log.action.replace(/_/g, ' ')}</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-medium ${log.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{log.role}</span></td>
                  <td className="p-4 text-gray-600">{log.performedBy?.email || log.performedBy?.name || 'Unknown'}</td>
                  <td className="p-4 text-gray-500 font-mono text-xs">{log.ipAddress || 'N/A'}</td>
                  <td className="p-4 text-gray-500">
                    {log.details ? (
                      <pre className="text-xs bg-gray-50 p-2 rounded border">{JSON.stringify(log.details, null, 2)}</pre>
                    ) : '-'}
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No logs match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
