import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import Payment from '@/models/Payment';

export async function GET() {
  try {
    await connectToDatabase();
    const payments = await Payment.find({}).populate('student', 'name phone').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    const payment = await Payment.create(body);
    return NextResponse.json({ success: true, data: payment }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating payment:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
