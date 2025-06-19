"use client"
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import {useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";


export default function Login({roomCode}: {roomCode: string}) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    const res = await fetch('/api/add-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, roomCode}),
    });
    console.log(res)
    const data = await res.json();
    if (res.ok) {
      console.log(data);
      router.push(`/welcome/${username}`);
      setUsername('');
    } else {
      setMessage(`Error: ${data.error}`);
      console.log(data.error)
      alert('Invalid username');
    }

    

  };

  return (
    <div className="flex h-screen">
      <div className="place-content-center justify-items-center text-black w-full h-full bg-white p-6 shadow-md">
        <h2 className="text-center text-2xl font-bold">Flags! <span className="text-red-600">Red</span> or <span className="text-green-600">Green</span></h2>
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
          >
            Join!
          </button>
        </form>
      </div>
    </div>
  );
}
function insertOne(arg0: { name: string; }) {
  throw new Error("Function not implemented.");
}

