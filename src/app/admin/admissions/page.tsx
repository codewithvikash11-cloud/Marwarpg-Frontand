'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Eye } from 'lucide-react';
import api from '@/config/api';

export default function AdmissionsPage() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/admissions')
      .then(({ data }) => {
        if (data.success) {
          setAdmissions(data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admission Requests</h1>
          <p className="text-gray-500 text-sm mt-1">Review and approve new student applications</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                <th className="p-4 font-medium">Application ID</th>
                <th className="p-4 font-medium">Student Name</th>
                <th className="p-4 font-medium">Phone</th>
                <th className="p-4 font-medium">Room Pref</th>
                <th className="p-4 font-medium">Date Applied</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="p-4 text-center text-gray-500">Loading applications...</td></tr>
              ) : admissions.length === 0 ? (
                <tr><td colSpan={6} className="p-4 text-center text-gray-500">No pending admission requests</td></tr>
              ) : (
                admissions.map((app: any) => (
                  <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono text-sm font-medium text-amber-600">{app.applicationId}</td>
                    <td className="p-4 font-medium text-gray-800">{app.name}</td>
                    <td className="p-4 text-sm text-gray-600">{app.phone}</td>
                    <td className="p-4 text-sm text-gray-600">{app.preferences?.roomType} - {app.preferences?.sharingType}</td>
                    <td className="p-4 text-sm text-gray-600">{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <Link href={`/admin/admissions/${app._id}`} className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md text-sm font-medium transition-colors">
                        <Eye size={16} className="mr-1" /> Review
                      </Link>
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
