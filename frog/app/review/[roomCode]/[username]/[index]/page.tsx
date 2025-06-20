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

export default function Review() {
  
  const params = useParams<{ roomCode: string; username: string , index: string}>()
  const [ready, setReady] = useState(false)
  const [redOrGreen, setRedOrGreen] = useState('')  
  const [responses, setResponses] = useState([{response: ''}]);

  let i = parseInt(params.index);
  const router = useRouter();


  useEffect(() => {
    fetch('/api/get-responses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: params.username, roomCode: params.roomCode , index: i }),
    }).then(res => res.json()).then(data => setResponses(data));

  },[])

  console.log(responses)
  const handleClick = async () => {
    const username = params.username
    
    setReady(ready => !ready);
    const readyValue = !ready
   
    if(readyValue) {
      intervals.push(setInterval(async () => {
        const res = await fetch('/api/set-ready', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username, readyValue:readyValue, roomCode: params.roomCode, flagColor: redOrGreen, index: i }),
        });
        if(res.ok) {
          const {message, ready} = await res.json();
          if(ready) {
            clearAllIntervals()
            if(i === prompts.length - 1) {
              router.push(`/thanks-for-playing`);
            } else {
              router.push(`/main/${params.roomCode}/${params.username}/${i + 1}`)
            }
            
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
          <div className='flex justify-center'>
            <div className="p-4">
              <h1 className='text-red-500'>Red Flags</h1>
              {responses.map((response: any, index) => 
                response.response === 'red' && <p key={index}>{response.username}</p>
              )}
            </div>

            <div className="p-4">
              <h1 className='text-green-500'>Green Flags</h1>
              {responses.map((response: any, index) => 
                response.response === 'green' && <p key={index}>{response.username}</p>
              )}
            </div>
          </div>
          
          <br></br>
          <br></br>
      </div>
      <div className="flex justify-center mb-4">
        <button className={`bg-${ready ? 'green' : 'red'}-500 hover:bg-${ready ? 'green' : 'red'}-700 active:bg-${ready ? 'green' : 'red'}-700 text-white font-bold py-2 px-4 rounded `} onClick={handleClick}>
          {ready ? 'Next!' : 'Next?'}
        </button>
      </div>
    </div>
      
  );
};

