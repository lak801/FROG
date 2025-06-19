'use client'
import { read } from 'fs';
import { useParams } from 'next/navigation';
import React, {useState} from 'react';


export default function Welcome() {
  const params = useParams<{ username: string}>()
  const [ready, setReady] = useState(false)

  const handleClick = () => {
    
    setReady(ready => !ready);
  }

  return (
    <div className="bg-white h-screen items-center flex flex-col justify-center">
      <div className="text-black items-center flex flex-col text-center">
        <h1 className=" text-black text-2xl font-bold">Welcome to F!<span className="text-red-500">R</span>o<span className="text-green-500">G</span>, {params.username}!</h1>
        <p className=" mt-4">You will be given a prompt and two buttons: 
          <br></br>a <span className="text-red-500">red flag</span> or a <span className="text-green-500">green flag</span></p>
          <div className="flex justify-center mt-4 w-full md:w-1/2 ">
            <button className='bg-red-500 w-1/3 h-[50px] m-[10px] hover:bg-red-500 active:bg-red-700 text-white font-bold py-2 px-4 rounded'></button>
            <button className='w-1/3 h-[50px] m-[10px] bg-green-500 hover:bg-green-500 active:bg-green-700 text-white font-bold py-2 px-4 rounded'></button>
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

