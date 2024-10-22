"use client";
import Navbar from "../components/Navbar";
import UserComp from "../components/UserComp";
import Display from "../components/Display";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"; 

export default function Home() {
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt_decode(token, '@teamwe_08'); 
        setUsername(decoded.username);
        setEmail(decoded.email);
        setId(decoded.objectid);
      } catch (error) {
        console.error("Invalid token", error);
        window.location.replace('/'); 
      }
    } else {
      window.location.replace('/'); 
    }
  }, [token]);

  return (
    <>
      <Navbar />
      <UserComp username={username} email={email} />
      <Display id={id} />
    </>
  );
}