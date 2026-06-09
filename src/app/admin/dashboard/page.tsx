'use client';

import { useEffect, useState } from 'react';
import { Users, Bed, IndianRupee, AlertCircle, FileText, ClipboardList, CheckCircle, UserX, UserPlus, PhoneCall, Handshake, Mail } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '@/config/api';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard/stats')
      .then(({ data }) => {
        if (data.success) {
          setStats(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex h-full items-center justify-center">Loading dashboard...</div>;
  if (!stats) return <div>Failed to load stats.</div>;

  const statCards = [
    { title: 'Total Students', value: stats.totalStudents, icon: Users, color: 'bg-blue-500' },
    { title: 'Vacant Beds', value: stats.vacantBeds, icon: Bed, color: 'bg-green-500' },
    { title: 'Monthly Collection', value: `₹${stats.monthlyCollection}`, icon: IndianRupee, color: 'bg-amber-500' },
    { title: 'Pending Rent', value: `₹${stats.pendingRent}`, icon: AlertCircle, color: 'bg-red-500' },
  ];

  const inquiryCards = [
    { title: 'Total Inquiries', value: stats.totalInquiries || 0, icon: Mail, color: 'bg-indigo-500' },
    { title: 'New Inquiries', value: stats.newInquiries || 0, icon: AlertCircle, color: 'bg-blue-400' },
    { title: 'Contacted Leads', value: stats.contactedLeads || 0, icon: PhoneCall, color: 'bg-amber-400' },
    { title: 'Converted Leads', value: stats.convertedLeads || 0, icon: Handshake, color: 'bg-green-500' },
  ];

  const admissionCards = [
    { title: 'Total Requests', value: stats.totalAdmissionRequests || 0, icon: ClipboardList, color: 'bg-slate-500' },
    { title: 'Pending Requests', value: stats.pendingRequests || 0, icon: UserPlus, color: 'bg-amber-500' },
    { title: 'Approved Requests', value: stats.approvedRequests || 0, icon: CheckCircle, color: 'bg-green-500' },
    { title: 'Rejected Requests', value: stats.rejectedRequests || 0, icon: UserX, color: 'bg-red-500' },
  ];

  // Dummy chart data for UI purposes
  const revenueData = [
    { name: 'Jan', revenue: 40000 },
    { name: 'Feb', revenue: 30000 },
    { name: 'Mar', revenue: 20000 },
    { name: 'Apr', revenue: 27800 },
    { name: 'May', revenue: 18900 },
    { name: 'Jun', revenue: 23900 },
    { name: 'Jul', revenue: 34900 },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className={`${card.color} p-4 rounded-xl text-white`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inquiryCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={`inq-${idx}`} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className={`${card.color} p-4 rounded-xl text-white`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {admissionCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={`adm-${idx}`} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className={`${card.color} p-4 rounded-xl text-white`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Revenue Overview</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dx={-10} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Pending Actions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                <div>
                  <p className="font-semibold text-red-800">{stats.activeComplaints} Open Complaints</p>
                  <p className="text-xs text-red-600 mt-1">Requires immediate attention</p>
                </div>
                <AlertCircle className="text-red-500" size={20} />
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div>
                  <p className="font-semibold text-blue-800">{stats.pendingLeaves} Leave Requests</p>
                  <p className="text-xs text-blue-600 mt-1">Pending approval</p>
                </div>
                <Users className="text-blue-500" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
