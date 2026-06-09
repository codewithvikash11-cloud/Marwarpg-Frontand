import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
  applicationId?: string;
  studentId?: string;
  username?: string;
  password?: string;
  
  name: string;
  fatherName: string;
  motherName: string;
  dob: Date;
  gender: string;
  phone: string;
  altPhone?: string;
  email: string;
  aadhaarNumber: string;

  permanentAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  currentAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };

  education: {
    occupationType: 'Student' | 'Working Professional';
    collegeName?: string;
    courseName?: string;
    companyName?: string;
  };

  emergencyContact: {
    guardianName: string;
    relation: string;
    phone: string;
    altPhone?: string;
  };

  preferences: {
    roomType: 'AC' | 'Non-AC';
    sharingType: 'Single' | 'Double' | 'Triple';
    preferredJoiningDate: Date;
  };

  tiffinPlan: 'Basic' | 'Standard' | 'Premium' | 'None';

  room?: mongoose.Types.ObjectId;
  bedNumber?: string;
  status: 'Pending Verification' | 'Active' | 'Left';
  
  documents: {
    aadhaarFront?: string;
    aadhaarBack?: string;
    photo?: string;
    signature?: string;
    collegeId?: string;
    panCard?: string;
  };
  
  joinedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema = new Schema({
  applicationId: { type: String, unique: true, sparse: true },
  studentId: { type: String, unique: true, sparse: true },
  username: { type: String, unique: true, sparse: true },
  password: { type: String },

  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  altPhone: { type: String },
  email: { type: String, required: true },
  aadhaarNumber: { type: String, required: true },

  permanentAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  currentAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },

  education: {
    occupationType: { type: String, enum: ['Student', 'Working Professional'], required: true },
    collegeName: { type: String },
    courseName: { type: String },
    companyName: { type: String }
  },

  emergencyContact: {
    guardianName: { type: String, required: true },
    relation: { type: String, required: true },
    phone: { type: String, required: true },
    altPhone: { type: String }
  },

  preferences: {
    roomType: { type: String, enum: ['AC', 'Non-AC'], required: true },
    sharingType: { type: String, enum: ['Single', 'Double', 'Triple'], required: true },
    preferredJoiningDate: { type: Date, required: true }
  },

  tiffinPlan: { type: String, enum: ['Basic', 'Standard', 'Premium', 'None'], required: true },

  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  bedNumber: { type: String },
  status: { type: String, enum: ['Pending Verification', 'Active', 'Left'], default: 'Pending Verification' },
  
  documents: {
    aadhaarFront: { type: String },
    aadhaarBack: { type: String },
    photo: { type: String },
    signature: { type: String },
    collegeId: { type: String },
    panCard: { type: String }
  },
  
  joinedAt: { type: Date }
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
export default Student;
