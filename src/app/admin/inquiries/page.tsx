'use client';

import { useEffect, useState } from 'react';
import { Eye, Edit, Trash2, CheckCircle, PhoneCall, XCircle } from 'lucide-react';
import api from '@/config/api';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = () => {
    setLoading(true);
    api.get('/admin/inquiries')
      .then(({ data }) => {
        if (data.success) setInquiries(data.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/admin/inquiries/${id}/status`, { status });
      fetchInquiries();
    } catch (error) {
      console.error(error);
      alert('Failed to update status');
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await api.delete(`/admin/inquiries/${id}`);
      fetchInquiries();
    } catch (error) {
      console.error(error);
      alert('Failed to delete inquiry');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inquiries Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage leads from the public website</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Mobile</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Room Type</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={7} className="p-4 text-center text-gray-500">Loading inquiries...</td></tr>
              ) : inquiries.length === 0 ? (
                <tr><td colSpan={7} className="p-4 text-center text-gray-500">No inquiries found</td></tr>
              ) : (
                inquiries.map((inq: any) => (
                  <tr key={inq._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-800">{inq.fullName}</td>
                    <td className="p-4 text-sm text-gray-600">{inq.mobileNumber}</td>
                    <td className="p-4 text-sm text-gray-600">{inq.email}</td>
                    <td className="p-4 text-sm text-gray-600">{inq.interestedRoomType}</td>
                    <td className="p-4 text-sm text-gray-600">{new Date(inq.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        inq.status === 'New' ? 'bg-blue-100 text-blue-700' :
                        inq.status === 'Contacted' ? 'bg-amber-100 text-amber-700' :
                        inq.status === 'Converted' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-4 text-right flex justify-end space-x-2">
                      <select 
                        className="text-xs border-gray-200 rounded px-2 py-1 bg-white cursor-pointer"
                        value={inq.status}
                        onChange={(e) => updateStatus(inq._id, e.target.value)}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <button onClick={() => deleteInquiry(inq._id)} className="p-1 text-red-500 hover:bg-red-50 rounded" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
