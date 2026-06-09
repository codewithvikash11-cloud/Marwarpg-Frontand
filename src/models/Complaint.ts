import mongoose, { Document, Schema } from 'mongoose';

export interface IComplaint extends Document {
  student: mongoose.Types.ObjectId;
  category: 'Food' | 'WiFi' | 'Cleaning' | 'Other';
  description: string;
  status: 'Open' | 'InProgress' | 'Resolved';
  createdAt: Date;
  updatedAt: Date;
}

const ComplaintSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  category: { type: String, enum: ['Food', 'WiFi', 'Cleaning', 'Other'], required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Open', 'InProgress', 'Resolved'], default: 'Open' }
}, { timestamps: true });

const Complaint = mongoose.models.Complaint || mongoose.model<IComplaint>('Complaint', ComplaintSchema);
export default Complaint;
