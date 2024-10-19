"use client"
import Navbar from "../components/Navbar";
import UserComp from "../components/UserComp";
import Display from "../components/Display";
import { useSearchParams } from "next/navigation";
import { useEffect ,useState} from "react";
import { jwtDecode } from "jwt-decode";
export default function Home() {
  const [username, setSetUsername] = useState("")
  const [email, setEmail] = useState("")
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token, '@teamwe_08'); 
      setSetUsername(decoded.username);
      setEmail(decoded.email);
    }else{
      window.location.replace(`/`)
    }
  }, [token]);
  return (
    <>
      <Navbar />
      <UserComp username={username} email={email}/>
      <Display />
    </>
  );
}
