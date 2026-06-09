import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  student: mongoose.Types.ObjectId;
  amount: number;
  month: string;
  year: number;
  type: 'Rent' | 'Deposit' | 'Other';
  status: 'Pending' | 'Paid' | 'Overdue';
  transactionId?: string;
  paymentDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // e.g. 'January'
  year: { type: Number, required: true }, // e.g. 2026
  type: { type: String, enum: ['Rent', 'Deposit', 'Other'], required: true },
  status: { type: String, enum: ['Pending', 'Paid', 'Overdue'], default: 'Pending' },
  transactionId: { type: String },
  paymentDate: { type: Date }
}, { timestamps: true });

const Payment = mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);
export default Payment;
