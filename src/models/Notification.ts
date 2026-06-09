import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  title: string;
  message: string;
  type: 'Info' | 'Alert' | 'Success';
  isRead: boolean;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['Info', 'Alert', 'Success'], default: 'Info' },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

const Notification = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);
export default Notification;
