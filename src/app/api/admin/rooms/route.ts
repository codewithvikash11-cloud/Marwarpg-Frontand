import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import Room from '@/models/Room';

export async function GET() {
  try {
    await connectToDatabase();
    // Populate occupants to get full student objects (or just their IDs if not needed)
    const rooms = await Room.find({}).populate('occupants', 'name phone').sort({ roomNumber: 1 });
    return NextResponse.json({ success: true, data: rooms });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    const newRoom = await Room.create(body);
    return NextResponse.json({ success: true, data: newRoom }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating room:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
