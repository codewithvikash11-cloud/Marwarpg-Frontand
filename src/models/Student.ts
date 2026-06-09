import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  phone: string;
  email: string;
  dob: Date;
  address: string;
  parentName: string;
  parentPhone: string;
  room?: mongoose.Types.ObjectId;
  bedNumber?: string;
  status: 'Pending' | 'Active' | 'Left';
  documents: {
    aadhaarFront?: string;
    aadhaarBack?: string;
    photo?: string;
    signature?: string;
  };
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: false },
  dob: { type: Date, required: false },
  address: { type: String, required: true },
  parentName: { type: String, required: true },
  parentPhone: { type: String, required: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: false },
  bedNumber: { type: String, required: false },
  status: { type: String, enum: ['Pending', 'Active', 'Left'], default: 'Pending' },
  documents: {
    aadhaarFront: { type: String },
    aadhaarBack: { type: String },
    photo: { type: String },
    signature: { type: String }
  },
  joinedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
export default Student;
