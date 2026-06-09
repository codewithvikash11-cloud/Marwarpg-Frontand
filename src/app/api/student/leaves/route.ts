import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import Leave from '@/models/Leave';
import * as jose from 'jose';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const token = req.cookies.get('student_token')?.value;
    if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    const { payload } = await jose.jwtVerify(token, secret);
    
    const { leaveDate, returnDate, reason } = await req.json();

    if (!leaveDate || !returnDate || !reason) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    const leave = new Leave({
      student: payload.id,
      leaveDate,
      returnDate,
      reason,
      status: 'Pending'
    });

    await leave.save();

    return NextResponse.json({ success: true, message: 'Leave request submitted successfully', data: leave }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const token = req.cookies.get('student_token')?.value;
    if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    const { payload } = await jose.jwtVerify(token, secret);
    
    const leaves = await Leave.find({ student: payload.id }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: leaves });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
