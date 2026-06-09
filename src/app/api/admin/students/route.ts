import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import Student from '@/models/Student';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    // Optional filtering
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const query: any = {};
    if (status) query.status = status;

    const students = await Student.find(query).populate('room').sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    const newStudent = await Student.create(body);
    return NextResponse.json({ success: true, data: newStudent }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating student:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
