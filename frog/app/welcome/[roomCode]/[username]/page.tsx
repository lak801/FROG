'use client'
import { read } from 'fs';
import { useParams } from 'next/navigation';
import React, {useState} from 'react';
import frogRed from '../../../../public/images/frog-red.png';
import frogGreen from '../../../../public/images/frog-green.png';
import frogNeutral from '../../../../public/images/frog-neutral.png';
import User from '../../../../components/models/User';
import { useRouter } from "next/navigation";
import { clear } from 'console';

let intervals:any = [];

export default function Welcome() {
  
  const params = useParams<{ roomCode: string; username: string }>()
  const [ready, setReady] = useState(false)
  const [redOrGreen, setRedOrGreen] = useState('')  

  const router = useRouter();
  
  const handleClick = async () => {
    const username = params.username
    
    setReady(ready => !ready);
    const readyValue = !ready
    
    if(readyValue) {
      intervals.push(setInterval(async () => {
        const res = await fetch('/api/set-ready', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username, readyValue:readyValue, roomCode: params.roomCode }),
        });
        if(res.ok) {
          const {message, ready} = await res.json();
          if(ready) {
            clearAllIntervals()
            router.push(`/main/${params.roomCode}/${params.username}/0`);
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
        <h1 className=" text-black text-2xl font-bold">Welcome to F<span className="text-red-500">R</span>o<span className="text-green-500">G</span>, {params.username}!</h1>
        <p className=" mt-4">You will be given a prompt and two buttons: 
          <br></br>a <span className="text-red-500">red flag</span> and a <span className="text-green-500">green flag</span></p>
          <div className='w-[200px]'>
            {redOrGreen === '' ? <img src={frogNeutral.src} /> : redOrGreen === 'red' ? <img src={frogRed.src} /> : <img src={frogGreen.src} />}
          </div>
          
          <div className="flex justify-center mt-4 w-full md:w-1/2 ">
            
            <button className='bg-red-500 w-1/3 h-[50px] m-[10px] hover:bg-red-500 active:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => setRedOrGreen('red')}>Click Me!</button>
            <button className='w-1/3 h-[50px] m-[10px] bg-green-500 hover:bg-green-500 active:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={() => setRedOrGreen('green')}>Click Me!</button>
          </div>
          
        <br></br>
        <p>Once you choose a flag, we will wait until everyone has submitted an answer and we will show the results.</p>
        <br></br>
        <p>We will talk about them and then move on to the next prompt!</p> 
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

