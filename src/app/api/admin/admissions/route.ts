import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import Student from '@/models/Student';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch all pending admission requests
    const applications = await Student.find({ status: 'Pending Verification' })
      .sort({ createdAt: -1 });
      
    return NextResponse.json({ success: true, data: applications });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
