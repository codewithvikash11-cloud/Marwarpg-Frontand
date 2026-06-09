import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
  roomNumber: string;
  capacity: number;
  type: 'AC' | 'Non-AC';
  price: number;
  occupants: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema({
  roomNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  type: { type: String, enum: ['AC', 'Non-AC'], required: true },
  price: { type: Number, required: true },
  occupants: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

const Room = mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);
export default Room;
