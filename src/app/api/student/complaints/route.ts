import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import Complaint from '@/models/Complaint';
import * as jose from 'jose';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const token = req.cookies.get('student_token')?.value;
    if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    const { payload } = await jose.jwtVerify(token, secret);
    
    const { category, description } = await req.json();

    if (!category || !description) {
      return NextResponse.json({ success: false, message: 'Category and description are required' }, { status: 400 });
    }

    const complaint = new Complaint({
      student: payload.id,
      category,
      description,
      status: 'Open'
    });

    await complaint.save();

    return NextResponse.json({ success: true, message: 'Complaint registered successfully', data: complaint }, { status: 201 });
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
    
    const complaints = await Complaint.find({ student: payload.id }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: complaints });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
