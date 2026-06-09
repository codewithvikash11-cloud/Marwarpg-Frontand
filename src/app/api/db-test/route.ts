import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';

export async function GET() {
  try {
    await connectToDatabase();
    
    return NextResponse.json({
      success: true,
      message: "MongoDB Connected"
    });
  } catch (error: any) {
    console.error('API DB Test Error:', error.message);
    
    // Explicit 200 response (or 500) based on requirements? 
    // The requirement states "Response on failure: { success: false, message: '...' }"
    // It doesn't explicitly require HTTP 500, but keeping the requested JSON structure.
    return NextResponse.json(
      {
        success: false,
        message: "MongoDB Connection Failed"
      },
      { status: 500 }
    );
  }
}
