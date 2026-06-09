import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import Student from '@/models/Student';
import Room from '@/models/Room';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const { roomId, bedNumber, notes } = await req.json();
    const student = await Student.findById(params.id);

    if (!student) {
      return NextResponse.json({ success: false, message: 'Application not found' }, { status: 404 });
    }

    if (student.status !== 'Pending Verification') {
      return NextResponse.json({ success: false, message: 'Application is not pending' }, { status: 400 });
    }

    // Assign Room if provided
    if (roomId && bedNumber) {
      const room = await Room.findById(roomId);
      if (!room) {
        return NextResponse.json({ success: false, message: 'Room not found' }, { status: 404 });
      }
      student.room = roomId;
      student.bedNumber = bedNumber;
      // Note: Ideally update Room.occupiedBeds here
    }

    // Generate Credentials
    const activeCount = await Student.countDocuments({ status: { $ne: 'Pending Verification' } });
    const sequence = (activeCount + 1).toString().padStart(4, '0');
    
    student.studentId = `RM2026${sequence}`;
    student.username = `RM${sequence}`;
    
    const rawPassword = 'RM@1234';
    student.password = await bcrypt.hash(rawPassword, 10);
    
    student.status = 'Active';
    student.joinedAt = new Date();
    // Save notes if any (we don't have a notes field yet, could append to a log or add to schema)
    
    await student.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Student approved successfully',
      credentials: {
        username: student.username,
        password: rawPassword
      }
    });
  } catch (error: any) {
    console.error('Approval Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
