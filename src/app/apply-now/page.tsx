'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Check, ChevronRight, ChevronLeft, UploadCloud, AlertCircle } from 'lucide-react';
import api from '@/config/api';

const steps = [
  'Personal Details',
  'Address Details',
  'Education Details',
  'Emergency Contact',
  'Room Selection',
  'Tiffin Service',
  'Document Upload',
  'Terms & Conditions'
];

export default function ApplyNowPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    dob: '',
    gender: 'Male',
    phone: '',
    altPhone: '',
    email: '',
    aadhaarNumber: '',
    permanentAddress: { address: '', city: '', state: '', pincode: '' },
    currentAddress: { address: '', city: '', state: '', pincode: '' },
    education: { occupationType: 'Student', collegeName: '', courseName: '', companyName: '' },
    emergencyContact: { guardianName: '', relation: '', phone: '', altPhone: '' },
    preferences: { roomType: 'Non-AC', sharingType: 'Double', preferredJoiningDate: '' },
    tiffinPlan: 'Basic',
    documents: { aadhaarFront: '', aadhaarBack: '', photo: '', signature: '', collegeId: '', panCard: '' }
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDoc(docType);
    const form = new FormData();
    form.append('file', file);

    try {
      const { data } = await api.post('/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (data.success) {
        setFormData({ ...formData, documents: { ...formData.documents, [docType]: data.url }});
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (err) {
      alert('Upload error occurred');
    } finally {
      setUploadingDoc('');
    }
  };

  const submitApplication = async () => {
    if (!termsAccepted) {
      setError('You must accept the Terms & Conditions to proceed.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/admission/apply', formData);
      if (!data.success) throw new Error(data.message || 'Submission failed');
      setSuccessId(data.applicationId);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (successId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Application Submitted!</h2>
          <p className="text-slate-300 mb-6">Your application has been received and is pending verification by the management.</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-8">
            <p className="text-sm text-slate-400 mb-1">Application ID</p>
            <p className="text-2xl font-mono text-amber-400 font-bold">{successId}</p>
          </div>
          <button onClick={() => router.push('/')} className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-colors">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-200">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white font-playfair mb-2">Apply for Admission</h1>
          <p className="text-amber-400">Join Royal Marwar Boys PG</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {steps.map((step, idx) => (
              <div key={idx} className={`w-3 h-3 rounded-full ${idx <= currentStep ? 'bg-amber-500' : 'bg-slate-700'}`} />
            ))}
          </div>
          <div className="flex justify-between text-xs font-medium text-slate-400 px-1">
            <span>Step {currentStep + 1}</span>
            <span>Step {steps.length}</span>
          </div>
          <h2 className="text-2xl font-semibold text-white mt-4">{steps[currentStep]}</h2>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Personal Details */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1 text-slate-300">Full Name</label>
                      <input type="text" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-slate-300">Aadhaar Number</label>
                      <input type="text" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" value={formData.aadhaarNumber} onChange={e => setFormData({ ...formData, aadhaarNumber: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-slate-300">Father's Name</label>
                      <input type="text" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" value={formData.fatherName} onChange={e => setFormData({ ...formData, fatherName: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-slate-300">Mother's Name</label>
                      <input type="text" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" value={formData.motherName} onChange={e => setFormData({ ...formData, motherName: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-slate-300">Date of Birth</label>
                      <input type="date" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-slate-300">Gender</label>
                      <select className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-slate-300">Mobile Number</label>
                      <input type="tel" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-slate-300">Email Address</label>
                      <input type="email" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Address Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-amber-400 mb-3">Permanent Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-slate-300">Full Address</label>
                        <textarea className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" rows={2} value={formData.permanentAddress.address} onChange={e => setFormData({ ...formData, permanentAddress: { ...formData.permanentAddress, address: e.target.value }})}></textarea>
                      </div>
                      <div>
                        <label className="block text-sm mb-1 text-slate-300">City</label>
                        <input type="text" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.permanentAddress.city} onChange={e => setFormData({ ...formData, permanentAddress: { ...formData.permanentAddress, city: e.target.value }})} />
                      </div>
                      <div>
                        <label className="block text-sm mb-1 text-slate-300">Pincode</label>
                        <input type="text" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.permanentAddress.pincode} onChange={e => setFormData({ ...formData, permanentAddress: { ...formData.permanentAddress, pincode: e.target.value }})} />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-slate-300">State</label>
                        <input type="text" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.permanentAddress.state} onChange={e => setFormData({ ...formData, permanentAddress: { ...formData.permanentAddress, state: e.target.value }})} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Note: In a real app we'd add a "Same as Permanent" checkbox here to auto-fill Current Address */}
                  <div>
                    <h3 className="text-lg font-medium text-amber-400 mb-3 mt-6 border-t border-slate-700 pt-6">Current Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-slate-300">Full Address</label>
                        <textarea className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" rows={2} value={formData.currentAddress.address} onChange={e => setFormData({ ...formData, currentAddress: { ...formData.currentAddress, address: e.target.value }})}></textarea>
                      </div>
                      <div>
                        <label className="block text-sm mb-1 text-slate-300">City</label>
                        <input type="text" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.currentAddress.city} onChange={e => setFormData({ ...formData, currentAddress: { ...formData.currentAddress, city: e.target.value }})} />
                      </div>
                      <div>
                        <label className="block text-sm mb-1 text-slate-300">Pincode</label>
                        <input type="text" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.currentAddress.pincode} onChange={e => setFormData({ ...formData, currentAddress: { ...formData.currentAddress, pincode: e.target.value }})} />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-slate-300">State</label>
                        <input type="text" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.currentAddress.state} onChange={e => setFormData({ ...formData, currentAddress: { ...formData.currentAddress, state: e.target.value }})} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Education */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1 text-slate-300">Occupation Type</label>
                    <select className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.education.occupationType} onChange={e => setFormData({ ...formData, education: { ...formData.education, occupationType: e.target.value as any }})}>
                      <option>Student</option>
                      <option>Working Professional</option>
                    </select>
                  </div>
                  
                  {formData.education.occupationType === 'Student' ? (
                    <>
                      <div>
                        <label className="block text-sm mb-1 text-slate-300">College / Institute Name</label>
                        <input type="text" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.education.collegeName} onChange={e => setFormData({ ...formData, education: { ...formData.education, collegeName: e.target.value }})} />
                      </div>
                      <div>
                        <label className="block text-sm mb-1 text-slate-300">Course Name</label>
                        <input type="text" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.education.courseName} onChange={e => setFormData({ ...formData, education: { ...formData.education, courseName: e.target.value }})} />
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block text-sm mb-1 text-slate-300">Company Name</label>
                      <input type="text" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.education.companyName} onChange={e => setFormData({ ...formData, education: { ...formData.education, companyName: e.target.value }})} />
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Emergency */}
              {currentStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1 text-slate-300">Guardian Name</label>
                    <input type="text" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.emergencyContact.guardianName} onChange={e => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, guardianName: e.target.value }})} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-slate-300">Relation</label>
                    <input type="text" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.emergencyContact.relation} onChange={e => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, relation: e.target.value }})} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-slate-300">Guardian Mobile Number</label>
                    <input type="tel" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.emergencyContact.phone} onChange={e => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, phone: e.target.value }})} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-slate-300">Alternate Family Contact</label>
                    <input type="tel" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.emergencyContact.altPhone} onChange={e => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, altPhone: e.target.value }})} />
                  </div>
                </div>
              )}

              {/* Step 5: Room Selection */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2 text-slate-300">Room Type Preference</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['AC', 'Non-AC'].map(type => (
                        <div key={type} onClick={() => setFormData({ ...formData, preferences: { ...formData.preferences, roomType: type as any }})} className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${formData.preferences.roomType === type ? 'border-amber-500 bg-amber-500/10' : 'border-slate-700 hover:border-slate-500'}`}>
                          <span className="font-semibold">{type} Room</span>
                          {formData.preferences.roomType === type && <Check className="text-amber-500" size={20} />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-slate-300">Sharing Preference</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Single', 'Double', 'Triple'].map(type => (
                        <div key={type} onClick={() => setFormData({ ...formData, preferences: { ...formData.preferences, sharingType: type as any }})} className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${formData.preferences.sharingType === type ? 'border-amber-500 bg-amber-500/10' : 'border-slate-700 hover:border-slate-500'}`}>
                          <span className="font-semibold">{type}</span>
                          {formData.preferences.sharingType === type && <Check className="text-amber-500" size={20} />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-1 text-slate-300">Preferred Joining Date</label>
                    <input type="date" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 outline-none" value={formData.preferences.preferredJoiningDate} onChange={e => setFormData({ ...formData, preferences: { ...formData.preferences, preferredJoiningDate: e.target.value }})} />
                  </div>
                </div>
              )}

              {/* Step 6: Tiffin Service */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  {[
                    { id: 'Basic', name: 'Basic Plan', price: '₹80/meal', desc: 'Dal, Roti, Rice, Salad' },
                    { id: 'Standard', name: 'Standard Plan', price: '₹100/meal', desc: '2 Sabji, Dal, Roti, Salad, Chaas' },
                    { id: 'Premium', name: 'Premium Plan', price: '₹120/meal', desc: '2 Sabji, Dal, Rice, Roti, Salad, Chaas, Sweet' },
                    { id: 'None', name: 'No Tiffin Required', price: '', desc: 'I will manage my own food' },
                  ].map(plan => (
                    <div key={plan.id} onClick={() => setFormData({ ...formData, tiffinPlan: plan.id as any })} className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${formData.tiffinPlan === plan.id ? 'border-amber-500 bg-amber-500/10' : 'border-slate-700 hover:border-slate-500'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-lg">{plan.name}</span>
                        {formData.tiffinPlan === plan.id && <Check className="text-amber-500" size={20} />}
                      </div>
                      <div className="flex justify-between items-center text-sm text-slate-400">
                        <span>{plan.desc}</span>
                        <span className="font-semibold text-amber-400">{plan.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 7: Documents */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <p className="text-sm text-amber-400 bg-amber-500/10 p-3 rounded border border-amber-500/20">
                    Please upload clear images. Max file size: 5MB per image. Cloudinary uploads are enabled.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'aadhaarFront', label: 'Aadhaar Front Image' },
                      { id: 'aadhaarBack', label: 'Aadhaar Back Image' },
                      { id: 'photo', label: 'Selfie Photo' },
                      { id: 'signature', label: 'Signature' },
                    ].map(doc => (
                      <div key={doc.id} className="relative group">
                        <label className="block text-sm mb-1 text-slate-300">{doc.label}</label>
                        <div className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all ${formData.documents[doc.id as keyof typeof formData.documents] ? 'border-green-500 bg-green-500/5' : 'border-slate-700 hover:border-amber-500 hover:bg-slate-800'}`}>
                          {formData.documents[doc.id as keyof typeof formData.documents] ? (
                            <>
                              <Check className="text-green-500 mb-2 w-8 h-8" />
                              <span className="text-green-500 font-medium">Uploaded Successfully</span>
                            </>
                          ) : uploadingDoc === doc.id ? (
                            <div className="animate-pulse flex flex-col items-center">
                              <UploadCloud className="text-amber-500 mb-2 w-8 h-8" />
                              <span className="text-amber-500 font-medium">Uploading...</span>
                            </div>
                          ) : (
                            <>
                              <UploadCloud className="text-slate-400 mb-2 w-8 h-8 group-hover:text-amber-500 transition-colors" />
                              <span className="text-slate-400 group-hover:text-amber-500 transition-colors">Click to Upload Image</span>
                              <span className="text-xs text-slate-500 mt-1">JPEG, PNG, JPG</span>
                            </>
                          )}
                          <input 
                            type="file" 
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
                            disabled={uploadingDoc !== '' || !!formData.documents[doc.id as keyof typeof formData.documents]}
                            onChange={(e) => handleFileUpload(e, doc.id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 8: Terms */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 text-sm text-slate-400 space-y-3 h-64 overflow-y-auto">
                    <h4 className="font-bold text-white text-lg sticky top-0 bg-slate-900 py-2">Terms & Conditions</h4>
                    <p>1. Admission Fee Non Refundable.</p>
                    <p>2. Registration Charges Non Refundable.</p>
                    <p>3. Security Deposit Rules Apply.</p>
                    <p>4. One Month Notice Required Before Leaving PG.</p>
                    <p>5. Property Damage Charges Applicable.</p>
                    <p>6. Illegal Activities Strictly Prohibited.</p>
                    <p>7. Guests Not Allowed Without Permission.</p>
                    <p>8. Rent Must Be Paid Before Due Date.</p>
                    <p>9. Food Charges Non Refundable.</p>
                    <p>10. Management Can Cancel Admission For Rule Violations.</p>
                  </div>
                  
                  <label className="flex items-start space-x-3 cursor-pointer mt-4 p-4 border border-slate-700 rounded-lg hover:bg-slate-800/50">
                    <input type="checkbox" className="mt-1 w-5 h-5 accent-amber-500" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} />
                    <span className="text-slate-300">I have read and accept all the terms and conditions mentioned above. I understand that my admission is subject to management approval.</span>
                  </label>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button 
            onClick={handlePrev} 
            disabled={currentStep === 0 || loading}
            className="flex items-center px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 text-slate-300 hover:bg-slate-800 border border-slate-700"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </button>
          
          {currentStep < steps.length - 1 ? (
            <button 
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg font-bold transition-colors"
            >
              Next <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          ) : (
            <button 
              onClick={submitApplication}
              disabled={!termsAccepted || loading}
              className="flex items-center px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg font-bold transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
