import mongoose, { Document, Schema } from 'mongoose';

export interface ILeave extends Document {
  student: mongoose.Types.ObjectId;
  leaveDate: Date;
  returnDate: Date;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: Date;
  updatedAt: Date;
}

const LeaveSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  leaveDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

const Leave = mongoose.models.Leave || mongoose.model<ILeave>('Leave', LeaveSchema);
export default Leave;
