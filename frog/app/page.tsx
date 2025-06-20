import Image from "next/image";
import Login from "../components/login";
import Main from "./main/[roomCode]/[username]/[index]/page";

export default function Home() {
  return (
    <main>
      <div className="flex h-screen">
      <div className="place-content-center justify-items-center text-black w-full h-full bg-white p-6 shadow-md">
        <h2 className="text-center text-2xl font-bold">Flags: <span className="text-red-600">Red</span> or <span className="text-green-600">Green</span></h2>
        <p>Please ask for the room code to join the game</p>
      </div>
    </div>
    </main>
  );
}
