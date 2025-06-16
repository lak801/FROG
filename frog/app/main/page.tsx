import React from 'react';

export default function Main() {
return (
  <main>
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-4xl font-bold text-center">Welcome to Flags! Red or Green</p>
      <div className="flex w-full mt-8">
        <button className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-none">Red</button>
        <button className="w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-none">Green</button>
      </div>
    </div>
  </main>
    
  );
};


