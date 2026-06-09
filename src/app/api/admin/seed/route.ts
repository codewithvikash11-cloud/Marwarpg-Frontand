import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/config/database';
import Admin from '@/models/Admin';

export async function GET() {
  try {
    await connectToDatabase();
    
    const existingAdmin = await Admin.findOne({ email: 'admin@royalmarwar.com' });
    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin already exists' });
    }

    const passwordHash = await bcrypt.hash('password123', 10);
    
    await Admin.create({
      name: 'Super Admin',
      email: 'admin@royalmarwar.com',
      passwordHash,
      role: 'SuperAdmin'
    });

    return NextResponse.json({ message: 'Admin seeded successfully: admin@royalmarwar.com / password123' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
