"use client"
import Navbar from "../components/Navbar";
import UserComp from "../components/UserComp";
import Display from "../components/Display";
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react';
import { useEffect ,useState} from "react";
import { jwtDecode } from "jwt-decode";
 function Searchbar() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [id,  setId] = useState("")
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  useEffect(() => {
      try {
        if (token) {
          const decoded = jwtDecode(token);
          setUsername(decoded.username);
          setEmail(decoded.email);
          setId(decoded.objectid);
        } else {
          window.location.replace(`/`);
        }
      } catch (error) {
        console.error("Token decoding failed:", error);
        window.location.replace(`/`);
      }
    }, [token]);
  return (
    <>
      <Navbar />
      <UserComp username={username} email={email}/>
      <Display id={id} />
    </>

  );
}
export function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Searchbar />
    </Suspense>
  )
}