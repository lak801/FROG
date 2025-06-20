// app/api/add-user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../components/models/User';
import Prompt from '@/components/models/Prompt';

export async function POST(req: NextRequest) {
  
   try {

    let { username, roomCode, index } = await req.json();
    await connectToDatabase();
    const allUsers = await User.find({ roomCode });
    const usernamesAndResponses : {username: string, response:string}[] = allUsers.map(user => ({username: user.username, response: user.responses[index]}));
    console.log(usernamesAndResponses)
    return NextResponse.json(usernamesAndResponses);
   } catch (err : any) {
     console.error(err);
     return NextResponse.json({ error: err.message }, { status: 500 });
   }
}
