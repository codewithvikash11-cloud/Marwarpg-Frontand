'use client';

import { useEffect, useState } from 'react';
import { Home, FileText, User, Camera, MessageSquare, LogOut, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '@/config/api';

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [payments, setPayments] = useState([]);

  // Leave Form State
  const [leaveFrom, setLeaveFrom] = useState('');
  const [leaveTo, setLeaveTo] = useState('');
  const [leaveReason, setLeaveReason] = useState('');

  // Complaint Form State
  const [complaintCategory, setComplaintCategory] = useState('Food Issue');
  const [complaintDesc, setComplaintDesc] = useState('');

  useEffect(() => {
    api.get('/student/dashboard')
      .then(({ data }) => {
        if (data.success) {
          setStudent(data.data.profile);
          setPayments(data.data.payments);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/student/logout');
    } catch (e) {
      console.error(e);
    }
    router.push('/student/login');
  };

  const handleLeaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/student/leaves', { leaveDate: leaveFrom, returnDate: leaveTo, reason: leaveReason });
      if (data.success) {
        alert('Leave request submitted successfully');
        setLeaveFrom(''); setLeaveTo(''); setLeaveReason('');
      } else alert(data.message);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error submitting leave');
    }
  };

  const handleComplaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/student/complaints', { category: complaintCategory, description: complaintDesc });
      if (data.success) {
        alert('Complaint submitted successfully');
        setComplaintCategory('Food Issue'); setComplaintDesc('');
      } else alert(data.message);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error submitting complaint');
    }
  };

  if (!student) {
    return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Loading Dashboard...</div>;
  }

  const tabs = [
    { name: 'Overview', icon: Home },
    { name: 'Payments', icon: FileText },
    { name: 'Profile', icon: User },
    { name: 'Documents', icon: Camera },
    { name: 'Leave & Complaints', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col shadow-xl z-10">
        <div className="p-6 border-b border-slate-800 text-center md:text-left">
          <h1 className="text-xl font-bold tracking-wider text-amber-500">ROYAL MARWAR</h1>
          <p className="text-xs text-slate-400 mt-1">Student Portal</p>
        </div>
        <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-xl font-bold text-slate-900">
            {student.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{student.name}</p>
            <p className="text-xs text-slate-400">{student.studentId}</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-x-auto md:overflow-x-visible flex md:block">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap md:w-full w-auto ${
                  isActive ? 'bg-amber-500 text-slate-900 font-medium' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800 hidden md:block">
          <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-slate-800 transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">{activeTab}</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 relative text-gray-500 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
            </button>
            <button onClick={handleLogout} className="md:hidden text-red-500"><LogOut size={20}/></button>
          </div>
        </header>
        
        <div className="p-4 md:p-8">
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Room No</p>
                  <p className="text-2xl font-bold text-gray-900">{student.room?.roomNumber || 'Not Assigned'}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Bed No</p>
                  <p className="text-2xl font-bold text-gray-900">{student.bedNumber || 'N/A'}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Joining Date</p>
                  <p className="text-2xl font-bold text-gray-900">{student.joinedAt ? new Date(student.joinedAt).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Tiffin Plan</p>
                  <p className="text-2xl font-bold text-amber-600">{student.tiffinPlan}</p>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="font-bold text-amber-900 mb-2">Welcome to Royal Marwar!</h3>
                <p className="text-amber-800 text-sm">Your portal allows you to track rent payments, submit leave requests, and log complaints directly to management. Keep an eye on the bell icon for important notifications.</p>
              </div>
            </div>
          )}

          {activeTab === 'Payments' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Total Rent</p>
                  <p className="text-2xl font-bold text-gray-900">₹{student.room?.rent || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
                  <p className="text-sm text-green-600 mb-1">Security Deposit</p>
                  <p className="text-2xl font-bold text-green-700">₹{student.room?.deposit || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
                  <p className="text-sm text-red-600 mb-1">Pending Amount</p>
                  <p className="text-2xl font-bold text-red-700">₹0</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-bold text-gray-800">Payment History</h3>
                </div>
                <div className="p-0">
                  {payments.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-8">No past payments recorded yet.</p>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                          <th className="p-4 font-medium">Date</th>
                          <th className="p-4 font-medium">Amount</th>
                          <th className="p-4 font-medium">Month</th>
                          <th className="p-4 font-medium">Mode</th>
                          <th className="p-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {payments.map((pay: any) => (
                          <tr key={pay._id} className="hover:bg-gray-50">
                            <td className="p-4 text-sm">{new Date(pay.date).toLocaleDateString()}</td>
                            <td className="p-4 font-medium">₹{pay.amount}</td>
                            <td className="p-4 text-sm">{pay.month} {pay.year}</td>
                            <td className="p-4 text-sm">{pay.paymentMode}</td>
                            <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Success</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Profile' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm">
                <div><p className="text-gray-500 mb-1">Full Name</p><p className="font-medium text-gray-900 text-lg">{student.name}</p></div>
                <div><p className="text-gray-500 mb-1">Aadhaar Number</p><p className="font-medium text-gray-900">{student.aadhaarNumber}</p></div>
                <div><p className="text-gray-500 mb-1">Mobile</p><p className="font-medium text-gray-900">{student.phone}</p></div>
                <div><p className="text-gray-500 mb-1">Email</p><p className="font-medium text-gray-900">{student.email}</p></div>
                <div><p className="text-gray-500 mb-1">Father's Name</p><p className="font-medium text-gray-900">{student.fatherName}</p></div>
                <div><p className="text-gray-500 mb-1">Mother's Name</p><p className="font-medium text-gray-900">{student.motherName}</p></div>
                <div className="col-span-1 md:col-span-2 border-t pt-4">
                  <p className="text-gray-500 mb-1">Permanent Address</p>
                  <p className="font-medium text-gray-900">{student.permanentAddress?.address}, {student.permanentAddress?.city}, {student.permanentAddress?.state} - {student.permanentAddress?.pincode}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Documents' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {['aadhaarFront', 'aadhaarBack', 'photo', 'signature'].map(doc => (
                <div key={doc} className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                  <p className="text-sm font-medium mb-4 capitalize text-gray-700">{doc.replace(/([A-Z])/g, ' $1').trim()}</p>
                  {student.documents?.[doc] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={student.documents[doc]} alt={doc} className="h-48 object-contain rounded" />
                  ) : (
                    <div className="h-48 flex items-center justify-center text-gray-400 text-sm bg-gray-50 w-full rounded">Not Uploaded</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Leave & Complaints' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-4">Apply for Leave</h3>
                <form className="space-y-4" onSubmit={handleLeaveSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">From Date</label>
                      <input type="date" required value={leaveFrom} onChange={e => setLeaveFrom(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-amber-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">To Date</label>
                      <input type="date" required value={leaveTo} onChange={e => setLeaveTo(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-amber-500 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Reason</label>
                    <textarea required value={leaveReason} onChange={e => setLeaveReason(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-amber-500 outline-none" rows={3}></textarea>
                  </div>
                  <button type="submit" className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded transition-colors">Submit Leave Request</button>
                </form>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-4">Register Complaint</h3>
                <form className="space-y-4" onSubmit={handleComplaintSubmit}>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Category</label>
                    <select value={complaintCategory} onChange={e => setComplaintCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-amber-500 outline-none">
                      <option>Food Issue</option>
                      <option>WiFi / Internet</option>
                      <option>Cleaning / Hygiene</option>
                      <option>Electricity / Plumbing</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Describe Issue</label>
                    <textarea required value={complaintDesc} onChange={e => setComplaintDesc(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-amber-500 outline-none" rows={3}></textarea>
                  </div>
                  <button type="submit" className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded transition-colors">Submit Complaint</button>
                </form>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
