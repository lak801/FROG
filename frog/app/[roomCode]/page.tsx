'use client'
import Image from "next/image";
import Login from "../../components/login";
import Main from "../main/[roomCode]/[username]/[index]/page";
import { useParams } from "next/navigation";

export default function Home() {
    
    const params = useParams<{ roomCode: string}>()
    return (
        <main>
        <Login roomCode={params.roomCode}></Login>
        </main>
    );
}
