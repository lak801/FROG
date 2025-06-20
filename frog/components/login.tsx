"use client"
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import {useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import FrogNeutral from '../public/images/frog-neutral.png';

export default function Login({roomCode}: {roomCode: string}) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // new state variable

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch('/api/add-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, roomCode}),
    });
    const data = await res.json();
    const userInfo = {username, roomCode};
    if (res.ok) {
      router.push(`/welcome/${userInfo.roomCode}/${userInfo.username}`);
      setIsLoading(false); // set loading state to false
      setUsername('');
    } else {
      setIsLoading(false);
      setMessage(`Error: ${data.error}`);
      console.log(data.error)
      alert('Invalid username');
    }

    

  };

  return (
    <div className="flex h-screen">
      
      <div className=" justify-items-center text-black w-full h-full bg-white p-6 shadow-md">
        <img className="md:w-1/2 lg:w-1/3" src={FrogNeutral.src} alt="Frog with red flag and green flag" />
        <h2 className="text-center text-2xl font-bold">Flags: <span className="text-red-600">Red</span> or <span className="text-green-600">Green</span></h2>
        <form className="mt-4 md:w-1/2 lg:w-1/3" onSubmit={handleSubmit}>
          <input
            className="w-full text-center px-4 py-2 border rounded-md"
            type="text"
            placeholder='Your Name!'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4"
            type="submit"
            disabled={isLoading} // disable button while loading
          >
            {isLoading ? 'Loading...' : 'Join!'}
          </button>
        </form>
      </div>
    </div>
  );
}
function insertOne(arg0: { name: string; }) {
  throw new Error("Function not implemented.");
}

