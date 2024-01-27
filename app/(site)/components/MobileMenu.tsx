"use client";
import React, { useEffect, useState } from 'react'
import {RiHomeSmileFill} from "react-icons/ri";
import {IoSearchOutline} from "react-icons/io5";
import {RiQuillPenFill} from "react-icons/ri";
import {TbLogout2} from "react-icons/tb";
import {FaUser} from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import useLoginModal from '@/app/hooks/useLoginModal';
import useSpeakModal from '@/app/hooks/useSpeakModal';

const MobileMenu = () => {

    const [id, setId] = useState("");
    const session = useSession();
    const loginModal = useLoginModal();
    const router = useRouter();
    const speakModal = useSpeakModal();

    useEffect(()=>{
    

    if(session.status==="authenticated")
    {
      const fetchUser = async() => {
        const user = await axios.get("/api/current");
        if(!user){
          console.log(user);
        }
        setId(user.data.id);
      }
      fetchUser();
    }

  },[setId, session]);

  const handleProfile = () => {
    if(session.status==="unauthenticated"){
      loginModal.onOpen();
    }else{
      router.push(`/users/${id}`)
    }
  }

  const speakHandle = () => {
    if(session.status==="unauthenticated"){
      loginModal.onOpen();
    }else{
      speakModal.onOpen();
    }
  }
  return (
    <div className='
        fixed
        sm:hidden
        lg:hidden
        w-full
        bottom-0
        bg-black
        bg-opacity-70
    '>
        <div className='
            w-full
            px-3
            py-5
            flex
            flex-row
            items-center
            justify-between
        '>
            <Link href={"/"} className='flex gap-3 items-center text-white text-lgs'>
              <RiHomeSmileFill className='text-white w-6 h-6' />
            </Link>
            <Link href={"/explore"} className='flex gap-3 items-center text-white text-lg'>
              <IoSearchOutline className='text-white w-6 h-6' />
            </Link>
            <button onClick={speakHandle} className='text-white text-lg bg-orange-500 p-2 rounded-full'>
              <RiQuillPenFill className='text-white w-8 h-8' />
            </button>
            <div onClick={handleProfile} className='flex gap-3 items-center text-white text-lg'>
              <FaUser className='text-white w-6 h-6' />
            </div>
            <div onClick={() => signOut()} className='flex gap-3 items-center cursor-pointer text-white text-lg'>
              <TbLogout2 className='text-white w-6 h-6' />
            </div>
        </div>
    </div>
  )
}

export default MobileMenu