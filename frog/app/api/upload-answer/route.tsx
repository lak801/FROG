import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../components/models/User';
import { read } from 'fs';
export async function POST(req : NextRequest) {
  try {
    let { username, ready, roomCode, flagColor, index} = await req.json();

    await connectToDatabase();

    const userResponses = (await User.findOne({ username, roomCode })).responses;
    
    userResponses[index] = flagColor

    await User.findOneAndUpdate({ username , roomCode}, {responses: userResponses})
    
    
    
    return NextResponse.json({ message: 'User updated successfully' });
  } catch (err : any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
