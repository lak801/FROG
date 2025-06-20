// app/api/add-user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../components/models/User';
import Prompt from '@/components/models/Prompt';

export async function GET(req: NextRequest) {
  
   try {

    await connectToDatabase();
    const prompts = await Prompt.find()

    return NextResponse.json(prompts);
   } catch (err : any) {
     console.error(err);
     return NextResponse.json({ error: err.message }, { status: 500 });
   }
}
