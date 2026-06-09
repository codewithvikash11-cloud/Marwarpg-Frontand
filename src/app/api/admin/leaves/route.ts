import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import Leave from '@/models/Leave';

export async function GET() {
  try {
    await connectToDatabase();
    const leaves = await Leave.find({}).populate('student', 'name room bedNumber').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: leaves });
  } catch (error) {
    console.error('Error fetching leaves:', error);
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

    const updatedLeave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ success: true, data: updatedLeave });
  } catch (error: any) {
    console.error('Error updating leave:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
