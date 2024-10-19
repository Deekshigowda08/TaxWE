"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import taxwelogo from '../public/taxwelogo2.svg'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const page = () => {

  return (
    <div className='h-[100vh] overflow-hidden max-sm:pl-0 max-sm:pr-0 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] flex pl-10 pr-14 justify-center items-center navshad'>
      <div className='fixed top-7 left-7 max-sm:top-2 max-sm:right-2'>
        <Image src={taxwelogo} width={120} className='max-md:w-[80px]' />
      </div>
      <div className='flex flex-col'>
        <div className='p-2 text-2xl font-bold text-[#ffffff] max-sm:text-lg'>Forgot password</div>


        <form class="w-[450px] max-sm:w-[300px] px-7 py-10 max-sm:px-2 max-sm:py-4 bg-[#ffffff2d] max-sm:text-sm rounded-xl lsshad flex flex-col">
          <div class="mb-4">
            <label class="block text-[#ffffffe5] max-sm:text-sm text-lg font-bold mb-1" for="username">
              Enter the email with which you signed up previously
            </label>
            <input class="shadow max-sm:text-sm bg-[#ffffff35] font-medium text-[#000000d4] appearance-none rounded-lg w-full h-[50px] max-sm:h-[40px] px-3 leading-tight outline-none focus:outline-2 focus:outline-[#ffffff] smooth placeholder:text-[#00000078]"
              id="email"
              type="email"
              placeholder="Enter your email" />
          </div>
          
          <div class="flex items-center ">
            <button class=" bg-[#3581d8] max-sm:text-sm smooth hover:text-[#000000be] hover:bg-[#ffffff] btnshad text-white font-bold py-2 px-5 rounded-md focus:outline-none focus:shadow-outline" type="button">
              Send the authentication mail
            </button>
          </div>

          <div class="flex items-center mt-7 ">
            <Link href={'/passengerlogin'}>
              <button class=" bg-[#3581d8] max-sm:text-sm smooth hover:text-[#000000be] hover:bg-[#ffffff] btnshad text-white font-bold py-2 px-5 rounded-md focus:outline-none focus:shadow-outline" type="button">Log in as a PASSENGER</button>
            </Link>
          </div>

          <div class="flex items-center mt-7 ">
            <Link href={'/driverlogin'}>
              <button class=" bg-[#3581d8] max-sm:text-sm smooth hover:text-[#000000be] hover:bg-[#ffffff] btnshad text-white font-bold py-2 px-5 rounded-md focus:outline-none focus:shadow-outline" type="button">Log in as a DRIVER</button>
            </Link>
          </div>

        </form>
      </div>
    </div>
  )
}

export default page
