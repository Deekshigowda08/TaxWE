import Image from "next/image";
import Navbar from "./components/Navbar";
import UserComp from "./components/UserComp";
import Display from "./components/Display";

export default function Home() {
  return (
    <>
      <Navbar />
      <UserComp />
      <Display />
    </>
  );
}
