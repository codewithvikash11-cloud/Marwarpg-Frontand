'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import api from '@/config/api';

export default function AdmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [app, setApp] = useState<any>(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  // Approval Form State
  const [roomId, setRoomId] = useState('');
  const [bedNumber, setBedNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [successData, setSuccessData] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      api.get(`/admin/students/${id}`),
      api.get('/admin/rooms')
    ]).then(([studentRes, roomsRes]) => {
      if (studentRes.data.success) setApp(studentRes.data.data);
      if (roomsRes.data.success) setRooms(roomsRes.data.data);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  }, [id]);

  const handleApprove = async () => {
    if (!roomId || !bedNumber) return alert('Please assign a room and bed number');
    setProcessing(true);
    const room = rooms.find((r: any) => r._id === roomId) as any;
    const deposit = room ? room.deposit : 0;
    const rent = room ? room.rent : 0;

    try {
      const { data } = await api.post(`/admin/admissions/${id}/approve`, { roomId, bedNumber, notes, deposit, rent });
      if (data.success) {
        setSuccessData(data.credentials);
      } else {
        alert(data.message);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to approve application');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading application details...</div>;
  if (!app) return <div className="p-8 text-center text-red-500">Application not found</div>;

  if (successData) {
    return (
      <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-sm border border-green-100 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Admission Approved!</h2>
        <p className="text-gray-600 mb-6">Student account has been created successfully.</p>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-800 mb-4 border-b pb-2">Student Credentials (Share with student)</h3>
          <div className="space-y-3">
            <p className="text-sm"><span className="text-gray-500 w-24 inline-block">Username:</span> <strong className="text-lg font-mono">{successData.username}</strong></p>
            <p className="text-sm"><span className="text-gray-500 w-24 inline-block">Password:</span> <strong className="text-lg font-mono">{successData.password}</strong></p>
          </div>
        </div>

        <Link href="/admin/admissions" className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Back to Admissions
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <Link href="/admin/admissions" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Review Application</h1>
          <p className="text-gray-500 text-sm">{app.applicationId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-800">Applicant Details</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
              <div><p className="text-gray-500 mb-1">Full Name</p><p className="font-medium text-gray-900">{app.name}</p></div>
              <div><p className="text-gray-500 mb-1">Gender</p><p className="font-medium text-gray-900">{app.gender}</p></div>
              <div><p className="text-gray-500 mb-1">Date of Birth</p><p className="font-medium text-gray-900">{new Date(app.dob).toLocaleDateString()}</p></div>
              <div><p className="text-gray-500 mb-1">Mobile</p><p className="font-medium text-gray-900">{app.phone}</p></div>
              <div><p className="text-gray-500 mb-1">Email</p><p className="font-medium text-gray-900">{app.email}</p></div>
              <div><p className="text-gray-500 mb-1">Aadhaar No</p><p className="font-medium text-gray-900">{app.aadhaarNumber}</p></div>
              <div className="col-span-2 border-t pt-4"><p className="text-gray-500 mb-1">Parents</p><p className="font-medium text-gray-900">Father: {app.fatherName} | Mother: {app.motherName}</p></div>
              <div className="col-span-2"><p className="text-gray-500 mb-1">Permanent Address</p><p className="font-medium text-gray-900">{app.permanentAddress?.address}, {app.permanentAddress?.city}, {app.permanentAddress?.state} - {app.permanentAddress?.pincode}</p></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-800">Emergency Contact</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
              <div><p className="text-gray-500 mb-1">Guardian Name</p><p className="font-medium text-gray-900">{app.emergencyContact?.guardianName}</p></div>
              <div><p className="text-gray-500 mb-1">Relation</p><p className="font-medium text-gray-900">{app.emergencyContact?.relation}</p></div>
              <div><p className="text-gray-500 mb-1">Phone</p><p className="font-medium text-gray-900">{app.emergencyContact?.phone}</p></div>
              <div><p className="text-gray-500 mb-1">Alt Phone</p><p className="font-medium text-gray-900">{app.emergencyContact?.altPhone || 'N/A'}</p></div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-800">Uploaded Documents</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {['aadhaarFront', 'aadhaarBack', 'photo', 'signature'].map(doc => (
                <div key={doc} className="border border-gray-200 rounded-lg p-2 flex flex-col items-center">
                  <p className="text-xs text-gray-500 font-medium mb-2 capitalize">{doc.replace(/([A-Z])/g, ' $1').trim()}</p>
                  {app.documents?.[doc] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={app.documents[doc]} alt={doc} className="h-32 object-contain rounded" />
                  ) : (
                    <div className="h-32 flex items-center justify-center text-gray-400 text-sm">No Image</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Preferences</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Room</span><span className="font-medium">{app.preferences?.roomType}</span></div>
              <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Sharing</span><span className="font-medium">{app.preferences?.sharingType}</span></div>
              <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Joining Date</span><span className="font-medium">{new Date(app.preferences?.preferredJoiningDate).toLocaleDateString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Tiffin Plan</span><span className="font-medium">{app.tiffinPlan}</span></div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl shadow-sm border border-amber-200 p-6">
            <h3 className="font-bold text-amber-900 mb-4">Approve Admission</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">Assign Room *</label>
                <select className="w-full p-2 border border-amber-300 rounded-lg bg-white" value={roomId} onChange={e => setRoomId(e.target.value)}>
                  <option value="">Select a Room</option>
                  {rooms.map((r: any) => (
                    <option key={r._id} value={r._id}>{r.roomNumber} ({r.type} - {r.occupiedBeds}/{r.capacity})</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">Assign Bed Number *</label>
                <input type="text" className="w-full p-2 border border-amber-300 rounded-lg bg-white" placeholder="e.g. B1" value={bedNumber} onChange={e => setBedNumber(e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">Admin Notes (Optional)</label>
                <textarea className="w-full p-2 border border-amber-300 rounded-lg bg-white text-sm" rows={2} value={notes} onChange={e => setNotes(e.target.value)} />
              </div>

              <div className="flex space-x-3 pt-2">
                <button 
                  onClick={handleApprove}
                  disabled={processing}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {processing ? 'Approving...' : 'Approve'}
                </button>
                <button 
                  disabled={processing}
                  className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
