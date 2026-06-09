'use client';

import { useEffect, useState } from 'next';
import { IndianRupee, FileText } from 'lucide-react';

export default function FinancePage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/payments')
      .then(res => res.json())
      .then(data => {
        if (data.success) setPayments(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Finance & Payments</h1>
          <p className="text-gray-500 text-sm mt-1">Manage rent, deposits, and receipts</p>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <IndianRupee size={20} />
          <span>Record Payment</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Period</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading payments...</td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No payment records found</td></tr>
              ) : (
                payments.map((payment: any) => (
                  <tr key={payment._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{payment.student?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 text-gray-600">{payment.type}</td>
                    <td className="px-6 py-4 text-gray-600">{payment.month} {payment.year}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">₹{payment.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'Paid' ? 'bg-green-100 text-green-700' :
                        payment.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {payment.status === 'Paid' && (
                        <button className="text-amber-500 hover:text-amber-600 flex items-center space-x-1">
                          <FileText size={16} /> <span>View</span>
                        </button>
                      )}
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
