"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import taxwelogo from '../public/taxwelogo2.svg'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const page = () => {

  const [showpass, setShowpass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    const result= await fetch("/api/user", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username:data.username,email:data.email,password:data.password,usertype:"user",phonenumber:data.phonenumber})
    })
    if(result.ok){
      toast("Done!")
      setTimeout(() => {
        window.location.replace("/")
      }, 2000);
    }
  };

  return (
    <div className='h-[100vh] overflow-hidden max-sm:pl-0 max-sm:pr-0 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] flex pl-10 pr-14 justify-center items-center navshad'>
      <div className='fixed top-7 left-7 max-sm:top-2 max-sm:right-2'>
        <Image src={taxwelogo} width={120} className='max-md:w-[80px]' />
      </div>
      <div className='flex flex-col'>
        <div className='p-2 text-2xl font-bold text-[#ffffff] max-sm:text-lg'>Sign up as a DRIVER</div>


        <form class="w-[450px] max-sm:w-[300px] px-7 py-10 max-sm:px-2 max-sm:py-4 bg-[#ffffff2d] max-sm:text-sm rounded-xl lsshad flex flex-col">
          <div class="mb-4">
            <label class="block text-[#ffffffe5] max-sm:text-sm text-lg font-bold mb-1" for="username">
              Username
            </label>
            <input class="shadow max-sm:text-sm bg-[#ffffff35] font-medium text-[#000000d4] appearance-none rounded-lg w-full h-[50px] max-sm:h-[40px] px-3 leading-tight outline-none focus:outline-2 focus:outline-[#ffffff] smooth placeholder:text-[#00000078]"
              id="username"
              type="text"
              placeholder="Enter a username" />
          </div>
          <div class="mb-6">
            <label class="block text-[#ffffffe5] text-lg max-sm:text-sm font-bold mb-1" for="password">
              Password
            </label>
            <div className='relative flex items-center'>
              <input class="shadow max-sm:text-sm bg-[#ffffff35] font-medium text-[#000000d4] appearance-none rounded-lg w-full h-[50px] max-sm:h-[40px] px-3 leading-tight outline-none focus:outline-2 focus:outline-[#ffffff] smooth placeholder:text-[#00000078]"
                id="password"
                type={`${showpass ? 'text' : 'password'}`}
                placeholder="Set a strong password" />
              <button type="button" onClick={() => setShowpass(!showpass)} className=" text-[#000000d4] absolute right-4 text-xl">
                {showpass ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {/* <p class="text-[#454545] text-md">Please choose a password.</p> */}
          </div>

          <div class="mb-4">
            <label class="block text-[#ffffffe5] text-lg max-sm:text-sm font-bold mb-1" for="username">
              Vehicle register no.
            </label>
            <input class="shadow max-sm:text-sm bg-[#ffffff35] font-medium text-[#000000d4] appearance-none rounded-lg w-full h-[50px] max-sm:h-[40px] px-3 leading-tight outline-none focus:outline-2 focus:outline-[#ffffff] smooth placeholder:text-[#00000078]"
              id="username"
              type="text"
              placeholder="Enter your vehicle plate nummber" />
          </div>
          
          <div class="flex items-center ">
            <button class=" bg-[#3581d8] max-sm:text-sm smooth hover:text-[#000000be] hover:bg-[#ffffff] btnshad text-white font-bold py-2 px-5 rounded-md focus:outline-none focus:shadow-outline" type="button">
              Submit
            </button>
          </div>

          <div class="flex items-center mt-7 ">
            <Link href={'/passengersignup'}>
              <button class=" bg-[#3581d8] max-sm:text-sm smooth hover:text-[#000000be] hover:bg-[#ffffff] btnshad text-white font-bold py-2 px-5 rounded-md focus:outline-none focus:shadow-outline" type="button">Sign up as a PASSENGER</button>
            </Link>
          </div>

          <div class="flex items-center gap-2 mt-7 max-sm:flex-col">
            <span className='font-semibold text-[17px] max-sm:text-[14px] text-[#000000d2]'>I already have an account as a driver</span>
            <Link href={'/driverlogin'}>
              <button class="text-[18px] max-sm:text-[15px] smooth befaft relative text-white font-bold  rounded-md focus:outline-none " type="button">
                Log in
              </button>
            </Link>
          </div>

        </form>
      </div>
    </div>
  )
}

export default page
