'use client'
import { useParams } from 'next/navigation';
import React from 'react';


export default function Welcome() {
  const params = useParams<{ username: string}>()

  console.log(params)
  return (
    <div className="flex h-screen">
      <div className=" justify-items-center text-black w-full h-full bg-white p-6 shadow-md">
        <h1 className="text-center text-2xl font-bold">Welcome to F!RoG, {params.username}!</h1>
        <p className="text-center mt-4">You will be given a prompt and two buttons: a green flag or a red flag</p>
        <p>Once you choose a flag, we will wait until everyone has submitted an answer and we will show the results.</p>
        <p>We will talk about them and then move on to the next prompt!</p> 
      </div>
    </div>
      
  );
};


