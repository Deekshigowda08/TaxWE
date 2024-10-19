import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cprofl from '../public/cat.jpeg'
import { IoMenu } from "react-icons/io5"; 

const UserComp = () => {
    return (
        <div className=' p-1 bg-gradient-to-br from-[#06e2ff] to-[#3581d8] h-[80px] max-sm:h-[70px]'>
            <div className='w-full h-full bg-[#ffffff] rounded-lg px-5 flex items-center gap-7 max-sm:gap-2 justify-between relative'>
                <div className='flex items-center gap-2 '>
                    <div className='p-1 max-sm:p-[2px] rounded-full bg-gradient-to-br from-[#06e2ff] to-[#3581d8]'>
                        <Image src={cprofl} className='max-sm:w-[39px] bg-white rounded-full object-cover aspect-[1/1]' width={50} height={50} />
                        {/* <div className='w-[55px] h-[55px] bg-white rounded-full'></div> */}
                    </div>
                    {/* <div className='p-1 bg bg-gradient-to-br from-[#06e2ff] to-[#3581d8] rounded-lg  '> */}
                        <div className='bg-[#ffffff] text-[#3b3b3b]  font-semibold rounded-md flex flex-col py-1 w-[220px] '>
                            <span className='max-sm:text-[12px]'>123456789012</span>
                            <span className='max-sm:text-[12px]'>123456789012@gmail.com</span>
                        </div>
                    {/* </div> */}
                </div>

                    <div className='max-sm:hidden flex gap-10 items-center font-bold text-[#000000c5] max-sm:text-[15px] rounded-lg p-5 h-full'>
                        <Link href={'/'} className='' >
                            <span className=''>PREVIOUS TRIPS</span>
                        </Link>
                        <Link href={'/about'} className='' >
                            <span className=''>FIND PLACES</span>
                        </Link>
                        <Link href={'/github'} className='' >
                            <span className=''></span>
                        </Link>
                    </div>

                <div className='absolute hidden max-sm:block right-5 text-xl'><span><IoMenu /></span></div>
            </div>
        </div>
    )
}

export default UserComp
