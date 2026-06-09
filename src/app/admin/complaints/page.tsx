'use client';

import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import api from '@/config/api';

export default function RequestsPage() {
  const [complaints, setComplaints] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/admin/complaints'),
      api.get('/admin/leaves')
    ]).then(([complaintRes, leaveRes]) => {
      if (complaintRes.data.success) setComplaints(complaintRes.data.data);
      if (leaveRes.data.success) setLeaves(leaveRes.data.data);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Requests & Complaints</h1>
        <p className="text-gray-500 text-sm mt-1">Manage student issues and leave permissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Complaints Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-800">Recent Complaints</h3>
          </div>
          <div className="p-5 space-y-4">
            {loading ? <p>Loading...</p> : complaints.length === 0 ? <p className="text-gray-500">No complaints found</p> : 
              complaints.map((c: any) => (
                <div key={c._id} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">{c.category}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${c.status === 'Open' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{c.status}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{c.student?.name || 'Unknown'}</p>
                  <p className="text-sm text-gray-600 mt-1">{c.description}</p>
                </div>
              ))
            }
          </div>
        </div>

        {/* Leaves Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-800">Leave Requests</h3>
          </div>
          <div className="p-5 space-y-4">
            {loading ? <p>Loading...</p> : leaves.length === 0 ? <p className="text-gray-500">No leave requests found</p> : 
              leaves.map((l: any) => (
                <div key={l._id} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${l.status === 'Pending' ? 'bg-amber-100 text-amber-700' : l.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{l.status}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{l.student?.name || 'Unknown'}</p>
                  <p className="text-xs text-gray-500 mt-1">From: {new Date(l.leaveDate).toLocaleDateString()} To: {new Date(l.returnDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600 mt-2 italic">"{l.reason}"</p>
                  
                  {l.status === 'Pending' && (
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 bg-green-500 text-white py-1.5 rounded-md flex justify-center items-center text-sm hover:bg-green-600">
                        <Check size={16} className="mr-1"/> Approve
                      </button>
                      <button className="flex-1 bg-red-500 text-white py-1.5 rounded-md flex justify-center items-center text-sm hover:bg-red-600">
                        <X size={16} className="mr-1"/> Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
