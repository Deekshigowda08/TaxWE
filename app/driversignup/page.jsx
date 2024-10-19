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

  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    const result= await fetch("/api/driver", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username:data.username,email:data.email,password:data.password,usertype:"driver",phonenumber:data.phonenumber,vehiclenumber:data.vehiclenumber})
    })
    if(result.ok){
      toast("Done!")
      setTimeout(() => {
        window.location.replace("/driverlogin")
      }, 2000);
    }
  };

  return (
    <div className='h-[100vh] overflow-hidden max-sm:pl-0 max-sm:pr-0 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] flex pl-10 pr-14 justify-center items-center navshad'>
      <div className='fixed top-7 left-7 max-sm:top-2 max-sm:right-2'>
        <Image src={taxwelogo} width={120} className='max-md:w-[80px]' />
      </div>
      <div className='flex flex-col'>
      <ToastContainer />
        <div className='p-2 text-2xl font-bold text-[#ffffff] max-sm:text-lg'>Sign up as a DRIVER</div>


        <form onSubmit={handleSubmit(onSubmit)} className="w-[450px] max-sm:w-[300px] px-7 py-10 max-sm:px-2 max-sm:py-4 bg-[#ffffff2d] max-sm:text-sm rounded-xl lsshad flex flex-col">
          <div className="mb-4">
            <label className="block text-[#ffffffe5] max-sm:text-sm text-lg font-bold mb-1" htmlFor="email">
              Email
            </label>
            <input {...register("email", { required: true })} className="shadow max-sm:text-sm bg-[#ffffff35] font-medium text-[#000000d4] appearance-none rounded-lg w-full h-[50px] max-sm:h-[40px] px-3 leading-tight outline-none focus:outline-2 focus:outline-[#ffffff] smooth placeholder:text-[#00000078]"
              id="email"
              type="email"
              placeholder="Enter an email" />
            {errors.email && <span className="text-red-500">Email is required</span>}
          </div>
          <div className="mb-4">
            <label className="block text-[#ffffffe5] max-sm:text-sm text-lg font-bold mb-1" htmlFor="username">
              Username
            </label>
            <input {...register("username", { required: true })} className="shadow max-sm:text-sm bg-[#ffffff35] font-medium text-[#000000d4] appearance-none rounded-lg w-full h-[50px] max-sm:h-[40px] px-3 leading-tight outline-none focus:outline-2 focus:outline-[#ffffff] smooth placeholder:text-[#00000078]"
              id="username"
              type="text"
              placeholder="Enter a username" />
            {errors.username && <span className="text-red-500">Username is required</span>}
          </div>
          <div className="mb-4">
            <label className="block text-[#ffffffe5] max-sm:text-sm text-lg font-bold mb-1" htmlFor="phonenumber">
              Phone Number
            </label>
            <input {...register("phonenumber", { required: true, minLength: 10, maxLength: 12 })} className="shadow max-sm:text-sm bg-[#ffffff35] font-medium text-[#000000d4] appearance-none rounded-lg w-full h-[50px] max-sm:h-[40px] px-3 leading-tight outline-none smooth placeholder:text-[#00000078]"
              id="phonenumber"
              type="tel"
              placeholder="Enter a phone number" />
            {errors.phonenumber && <span className="text-red-500">Phone number is required</span>}
          </div>
          <div className="mb-6">
            <label className="block text-[#ffffffe5] text-lg max-sm:text-sm font-bold mb-1" htmlFor="password">
              Password
            </label>
            <div className='relative flex items-center'>
              <input {...register("password", { required: true })} className="shadow max-sm:text-sm bg-[#ffffff35] font-medium text-[#000000d4] appearance-none rounded-lg w-full h-[50px] max-sm:h-[40px] px-3 leading-tight outline-none focus:outline-2 focus:outline-[#ffffff] smooth placeholder:text-[#00000078]"
                id="password"
                type={showPass ? 'text' : 'password'}
                placeholder="Set a strong password" />
              <button type='button' className="text-[#000000d4] absolute right-4 text-xl" onClick={() => setShowPass(prev => !prev)}>
                {showPass ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.password && <span className="text-red-500">Password is required</span>}
          </div>
          <div class="mb-4">
            <label class="block text-[#ffffffe5] text-lg max-sm:text-sm font-bold mb-1" for="vehicle">
              Vehicle register no.
            </label>
            <input {...register("vehiclenumber", { required: true })} class="shadow max-sm:text-sm bg-[#ffffff35] font-medium text-[#000000d4] appearance-none rounded-lg w-full h-[50px] max-sm:h-[40px] px-3 leading-tight outline-none focus:outline-2 focus:outline-[#ffffff] smooth placeholder:text-[#00000078]"
              id="vehicle"
              type="text"
              placeholder="Enter your vehicle plate nummber" />
              {errors.vehiclenumber && <span className="text-red-500">vehicle plate nummber is required</span>}
          </div>

          <div className="flex items-center">
            <button type="submit" className="bg-[#3581d8] max-sm:text-sm smooth hover:text-[#000000be] hover:bg-[#ffffff] btnshad text-white font-bold py-2 px-5 rounded-md focus:outline-none focus:shadow-outline">
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
