import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import Student from '@/models/Student';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const data = await req.json();
    
    // Generate Application ID (RM-2026-XXXX)
    const count = await Student.countDocuments();
    const formattedCount = (count + 1).toString().padStart(4, '0');
    const applicationId = `RM-2026-${formattedCount}`;

    // Ensure status is Pending
    data.status = 'Pending Verification';
    data.applicationId = applicationId;

    const student = new Student(data);
    await student.save();

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully', applicationId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Admission Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to submit application' },
      { status: 500 }
    );
  }
}
