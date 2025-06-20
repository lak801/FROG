'use client'
import { read } from 'fs';
import { useParams } from 'next/navigation';
import React, {useState} from 'react';

import frogNeutral from '@/public/images/frog-neutral.png';
import User from '@/components/models/User';
import { useRouter } from "next/navigation";
import { clear } from 'console';

let intervals:any = [];

export default function Thanks() {
  
  
  const handleClick = async () => {

    
    
  }

  return (
    <div className="bg-white h-screen items-center flex flex-col justify-center">
      <div className="text-black items-center flex flex-col text-center">
        <h1 className=" text-black text-2xl font-bold">Thanks for playing F <span className='text-red-500'>R</span> o <span className='text-green-500'>G</span>!</h1>
        <img src={frogNeutral.src} className='w-[300px]' />
      </div>
    </div>
      
  );
};

