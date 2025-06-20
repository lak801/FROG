import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../components/models/User';
import { read } from 'fs';
export async function POST(req : NextRequest) {
  try {
    let { username, readyValue, roomCode} = await req.json();

    await connectToDatabase();
    await User.findOneAndUpdate({ username , roomCode}, { ready: readyValue })
    let notReadyUsers = await User.find({roomCode, ready: false})
    console.log("Users not ready: ", notReadyUsers)
    if(notReadyUsers.length === 0) {
       setTimeout(async () => {
        await User.updateMany({ roomCode }, { ready: false });
      }, 5000); // 5-second delay
      return NextResponse.json({ message: 'All users are ready', ready: true });
    }
    
    
    return NextResponse.json({ message: 'User updated successfully' });
  } catch (err : any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
