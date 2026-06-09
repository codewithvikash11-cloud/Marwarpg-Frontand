import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import Complaint from '@/models/Complaint';

export async function GET() {
  try {
    await connectToDatabase();
    const complaints = await Complaint.find({}).populate('student', 'name room bedNumber').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: complaints });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const { id, status } = await req.json();
    
    if (!id || !status) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ success: true, data: updatedComplaint });
  } catch (error: any) {
    console.error('Error updating complaint:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
