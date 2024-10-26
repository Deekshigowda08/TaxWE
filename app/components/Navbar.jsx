"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import taxwelogo from '../public/taxwelogo2.svg'
import { LogOutIcon } from 'lucide-react'

const Navbar = () => {
    const handlelogout=()=>{
        localStorage.getItem('Token')?localStorage.removeItem('Token'):localStorage.removeItem('drivertoken');
        setTimeout(() => {
            window.location.replace('/')
        }, 500);
       
    }
    return (
        <nav className=' sticky top-0 right-0 z-50 h-[70px] max-sm:h-[50px] bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] flex items-center pl-10 pr-14 max-sm:pl-5 max-sm:pr-7 justify-between navshad'>
            <div className=''>
                <Image src={taxwelogo} alt="Logo" width={88} />
            </div>

            <div className='flex gap-7 max-sm:gap-4 text-[#ffffff] text-[17px] max-sm:text-[15px] font-medium'>
                <Link href={'/'} className='' >
                    <span className='relative befaft p-1'>HOME</span>
                </Link>
                <Link href={'/about'} className='' >
                    <span className='relative befaft p-1'>ABOUT</span>
                </Link>
                <Link href={'/'} className='' >
                    <button onClick={handlelogout} className='relative befaft p-1'><LogOutIcon/></button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
