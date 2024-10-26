"use client"
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import taxwelogo from './public/taxwelogo2.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
const CryptoJS = require("crypto-js");
import { useForm } from "react-hook-form"


const page = () => {

  const [showpass, setShowpass] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  useEffect(() => {
     
    async function  checkAndLogin () {
      
    {
      try {
        const token = localStorage.getItem('Token');
        if (!token) {
          console.error('No token found');
          return;
        }
    
        const decoded = jwtDecode(token, '@teamwe_08'); 
        if (!decoded) {
          console.error('Token verification failed');
          return;
        }
        var bytes  = CryptoJS.AES.decrypt(decoded.password, '@teamwe_08');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        const data = await fetch("/api/login", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email:decoded.email, password:originalText,usertype:decoded.usertype})
        })
        const result= await data.json()
    
        if (result.success) {
          
          window.location.replace(`/mainpage`)
        } else {
          console.error('Login failed:', result.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } 
     }
    setIsClient(true);
   
      checkAndLogin();
  }, []);
  const onSubmit = async(data) => {
    const detail = await fetch("/api/login", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:data.email,password:data.password,usertype:"user"})
    })
    const result= await detail.json()
    if(result.success)
     {
      localStorage.setItem('Token',result.token)
      const tok = localStorage.getItem('Token');
      toast("Success")
      setTimeout(() => {
        window.location.replace(`/mainpage`)
      }, 500);}
      else{
      toast.error(result.error)
      }
     

  }

  return (
    <div className='h-[100vh] overflow-hidden max-sm:pl-0 max-sm:pr-0 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] flex pl-10 pr-14 justify-center items-center navshad'>
      <div className='fixed top-7 left-7 max-sm:top-2 max-sm:right-2'>
        <Image src={taxwelogo} width={120} className='max-md:w-[80px]' />
      </div>
      <ToastContainer />
      <div className='flex flex-col'>
        <div className='p-2 text-2xl font-bold text-[#ffffff] max-sm:text-lg'>Log in as a PASSENGER</div>


        <form onSubmit={handleSubmit(onSubmit)} class="w-[450px] max-sm:w-[300px] px-7 py-10 max-sm:px-2 max-sm:py-4 bg-[#ffffff2d] max-sm:text-sm rounded-xl lsshad flex flex-col">
          <div class="mb-4">
            <label class="block text-[#ffffffe5] max-sm:text-sm text-lg font-bold mb-1" htmlFor="username">
              email
            </label>
            <input {...register("email", { required: true })} class="shadow max-sm:text-sm bg-[#ffffff35] font-medium text-[#000000d4] appearance-none rounded-lg w-full h-[50px] max-sm:h-[40px] px-3 leading-tight outline-none focus:outline-2 focus:outline-[#ffffff] smooth placeholder:text-[#00000078]"
              id="username"
              required
              type="email"
              placeholder="Enter your email" />
              {errors.email && <span className="text-red-500">Email is required</span>}
          </div>
          <div class="mb-6">
            <label class="block text-[#ffffffe5] text-lg max-sm:text-sm font-bold mb-1" htmlFor="password">
              Password
            </label>
            <div className='relative flex items-center'>
              <input {...register("password", { required: true })} class="shadow max-sm:text-sm bg-[#ffffff35] font-medium text-[#000000d4] appearance-none rounded-lg w-full h-[50px] max-sm:h-[40px] px-3 leading-tight outline-none focus:outline-2 focus:outline-[#ffffff] smooth placeholder:text-[#00000078]"
                id="password"
                required
                type={`${showpass ? 'text' : 'password'}`}
                placeholder="Enter your password" />
                {errors.password && <span className="text-red-500">Password is required</span>}
              <button type="button" onClick={() => setShowpass(!showpass)} className=" text-[#000000d4] absolute right-4 text-xl">
                {showpass ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <Link href={'/forgotpassword'}>
              <button class="text-[16px] max-sm:text-[15px] smooth befaft relative text-white font-bold  rounded-md focus:outline-none " type="button">
                Forgot password
              </button>
          </Link>
          </div>
          
          <div class="flex items-center ">
            <button class=" bg-[#3581d8] max-sm:text-sm smooth hover:text-[#000000be] hover:bg-[#ffffff] btnshad text-white font-bold py-2 px-5 rounded-md focus:outline-none focus:shadow-outline" type="submit">
              Submit
            </button>
          </div>

          <div class="flex items-center mt-7 ">
            <Link href={'/driverlogin'}>
              <button class=" bg-[#3581d8] max-sm:text-sm smooth hover:text-[#000000be] hover:bg-[#ffffff] btnshad text-white font-bold py-2 px-5 rounded-md focus:outline-none focus:shadow-outline" type="button">Log in as a DRIVER</button>
            </Link>
          </div>

          <div class="flex items-center gap-2 mt-7 max-sm:flex-col">
            <span className='font-semibold text-[17px] max-sm:text-[14px] text-[#000000d2]'>I don't have an account</span>
            <Link href={'/passengersignup'}>
              <button class="text-[18px] max-sm:text-[15px] smooth befaft relative text-white font-bold  rounded-md focus:outline-none " type="button">
                Sign up
              </button>
            </Link>
          </div>

        </form>
      </div>
    </div>
  )
}

export default page
