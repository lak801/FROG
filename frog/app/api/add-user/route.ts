// app/api/add-user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../components/models/User';

export async function POST(req: NextRequest) {
  
  try {
    const { username, roomCode} = await req.json();

    if (!username || !roomCode) {
      return NextResponse.json({ error: 'Username and roomCode are required' }, { status: 400 });
    }

    await connectToDatabase();
    
    const user = new User({ username, roomCode });
    await user.save();

    return NextResponse.json({ userId: user._id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
