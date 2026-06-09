import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import Student from '@/models/Student';
import Room from '@/models/Room';
import Payment from '@/models/Payment';
import Complaint from '@/models/Complaint';
import Leave from '@/models/Leave';

export async function GET() {
  try {
    await connectToDatabase();

    // Students
    const totalStudents = await Student.countDocuments();
    const activeStudents = await Student.countDocuments({ status: 'Active' });

    // Rooms & Beds
    const rooms = await Room.find({});
    const totalBeds = rooms.reduce((acc, room) => acc + room.capacity, 0);
    const occupiedBeds = rooms.reduce((acc, room) => acc + room.occupants.length, 0);
    const vacantBeds = totalBeds - occupiedBeds;

    // Financials
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear();
    
    const paymentsThisMonth = await Payment.find({ month: currentMonth, year: currentYear });
    const monthlyCollection = paymentsThisMonth
      .filter(p => p.status === 'Paid')
      .reduce((acc, p) => acc + p.amount, 0);
      
    const pendingRent = paymentsThisMonth
      .filter(p => p.status === 'Pending' || p.status === 'Overdue')
      .reduce((acc, p) => acc + p.amount, 0);

    // Requests & Issues
    const openComplaints = await Complaint.countDocuments({ status: 'Open' });
    const pendingLeaves = await Leave.countDocuments({ status: 'Pending' });

    return NextResponse.json({
      success: true,
      data: {
        totalStudents,
        activeStudents,
        totalBeds,
        vacantBeds,
        monthlyCollection,
        pendingRent,
        openComplaints,
        pendingLeaves
      }
    });

  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
