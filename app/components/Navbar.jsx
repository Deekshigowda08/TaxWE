import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import taxwelogo from '../public/taxwelogo2.svg'

const Navbar = () => {
    return (
        <nav className='sticky top-0 right-0 z-50 h-[70px] max-sm:h-[50px] bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] flex items-center pl-10 pr-14 max-sm:pl-5 max-sm:pr-7 justify-between navshad'>

            <div className=''>
                <Image src={taxwelogo} alt="Logo" width={88} />
            </div>

            <div className='flex gap-7 max-sm:gap-4 text-[#ffffff] text-[17px] max-sm:text-[15px] font-medium'>
                <Link href={'/'} className='' >
                    <span className='relative befaft p-1'>HOME</span>
                </Link>
                {/* <Link href={'/about'} className='' >
                    <span className='relative befaft p-1'>ABOUT</span>
                </Link>
                <Link href={'/github'} className='' >
                    <span className='relative befaft p-1'>GITHUB</span>
                </Link> */}
                <Link href={'/passengersignup'} className='' >
                    <span className='relative befaft p-1'>SIGN-UP</span>
                </Link>
                <Link href={'/passengerlogin'} className='' >
                    <span className='relative befaft p-1'>LOG-IN</span>
                </Link>
                
            </div>
        </nav>
    )
}

export default Navbar
