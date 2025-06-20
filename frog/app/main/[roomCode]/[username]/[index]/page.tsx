'use client'
import { read } from 'fs';
import { useParams } from 'next/navigation';
import React, {useEffect, useState} from 'react';
import frogRed from '@/public/images/frog-red.png';
import frogGreen from '@/public/images/frog-green.png';
import frogNeutral from '@/public/images/frog-neutral.png';
import User from '../../../../../components/models/User';
import { useRouter } from "next/navigation";
import { clear } from 'console';
import { set } from 'mongoose';
import prompts from '@/components/prompts';

let intervals:any = [];

export default function Main() {
  
  const params = useParams<{ roomCode: string; username: string , index: string}>()
  const [ready, setReady] = useState(false)
  const [redOrGreen, setRedOrGreen] = useState('')  
  

  let i = parseInt(params.index);
  const router = useRouter();
  

  const handleClick = async () => {
    const username = params.username
    
    setReady(ready => !ready);
    const readyValue = !ready
   
    if(readyValue) {
      intervals.push(setInterval(async () => {
        const res = await fetch('/api/upload-answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username, readyValue:readyValue, roomCode: params.roomCode, flagColor: redOrGreen, index: i }),
        });
        const res2 = await fetch('/api/set-ready', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username, readyValue:readyValue, roomCode: params.roomCode }),
        });
        if(res2.ok) {
          const {message, ready} = await res2.json();
          console.log(ready)
          if(ready) {
            
            clearAllIntervals()
            router.push(`/review/${params.roomCode}/${params.username}/${i}`)
          }
        }
      } , 1000));
      console.log(intervals)
    } else {
      clearAllIntervals()
    }
    
    
  }
  const clearAllIntervals = () => {
    console.log("clearing intervals " + intervals.length)
    intervals.forEach((interval: any) => clearInterval(interval));
    intervals = [];
  }

  return (
    <div className="bg-white h-screen items-center flex flex-col justify-center">
      <div className="text-black items-center flex flex-col text-center">
        <h1 className=" text-black text-2xl font-bold">{prompts[i]}</h1>
          <div className='w-[200px]'>
            {redOrGreen === '' ? <img src={frogNeutral.src} /> : redOrGreen === 'red' ? <img src={frogRed.src} /> : <img src={frogGreen.src} />}
          </div>
          
          <div className="flex justify-center mt-4 w-full m:w-[200] ">
            
            <button className='bg-red-500 w-1/2 h-[50px] m-[10px] hover:bg-red-500 active:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => setRedOrGreen('red')}>Red Flag</button>
            <button className='w-1/2 h-[50px] m-[10px] bg-green-500 hover:bg-green-500 active:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={() => setRedOrGreen('green')}>Green Flag</button>
          </div>
          <br></br>
          <br></br>
      </div>
      <div className="flex justify-center mb-4">
        <button className={`bg-${ready ? 'green' : 'red'}-500 hover:bg-${ready ? 'green' : 'red'}-700 active:bg-${ready ? 'green' : 'red'}-700 text-white font-bold py-2 px-4 rounded `} onClick={handleClick}>
          {ready ? 'Ready!' : 'Ready?'}
        </button>
      </div>
    </div>
      
  );
};

