import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import Student from '@/models/Student';
import * as jose from 'jose';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const token = req.cookies.get('student_token')?.value;
    if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    const { payload } = await jose.jwtVerify(token, secret);
    
    const student = await Student.findById(payload.id).populate('room');

    if (!student) {
      return NextResponse.json({ success: false, message: 'Student not found' }, { status: 404 });
    }

    // Strip password before returning
    const studentData = student.toObject();
    delete studentData.password;

    return NextResponse.json({ success: true, data: studentData });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
