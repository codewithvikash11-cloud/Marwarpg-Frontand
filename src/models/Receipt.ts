import mongoose, { Document, Schema } from 'mongoose';

export interface IReceipt extends Document {
  payment: mongoose.Types.ObjectId;
  receiptNumber: string;
  pdfUrl?: string;
  generatedDate: Date;
  createdAt: Date;
}

const ReceiptSchema: Schema = new Schema({
  payment: { type: Schema.Types.ObjectId, ref: 'Payment', required: true },
  receiptNumber: { type: String, required: true, unique: true },
  pdfUrl: { type: String },
  generatedDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Receipt = mongoose.models.Receipt || mongoose.model<IReceipt>('Receipt', ReceiptSchema);
export default Receipt;
