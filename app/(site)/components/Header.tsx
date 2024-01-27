"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import {IoMdArrowBack} from "react-icons/io";
import {GiHummingbird} from "react-icons/gi";

interface HeaderProps{
    title:string | null | undefined;
}

const Header:React.FC<HeaderProps> = ({title}) => {
    const visible = title === "Home";
    const router = useRouter();

  return (
    <div className='
        text-white
        text-lg
        font-semibold
        border-b-[2px]
        border-solid
        border-neutral-700
        p-4
        flex
        flex-row
        gap-3
        items-center
    '>
        <div onClick={() => router.push("/")}>
          { visible ? (
            <GiHummingbird className='w-8 h-8 cursor-pointer flex sm:hidden' />
          ) : (<IoMdArrowBack className='w-5 h-5 cursor-pointer' />) }
        </div>
        {title}
    </div>
  )
}

export default Header