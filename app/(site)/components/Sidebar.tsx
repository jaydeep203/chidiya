"use client";
import React, { useEffect, useState } from 'react'
import {GiHummingbird} from "react-icons/gi";
import {RiHomeSmileFill} from "react-icons/ri";
import {IoNotifications} from "react-icons/io5";
import {TbLogout2} from "react-icons/tb";
import {FaUser} from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import useLoginModal from '@/app/hooks/useLoginModal';
import useSpeakModal from '@/app/hooks/useSpeakModal';


const Sidebar = () => {
  const router = useRouter();
  const session = useSession();
  const loginModal = useLoginModal();
  const [id, setId] = useState("");
  const SpeakModal = useSpeakModal();

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
      SpeakModal.onOpen();
    }
  }

  return (
    <div className='
      w-full
      flex
    '>
      <div className='
        w-[90%]
        mx-auto
        pt-3
        flex
        flex-col
        gap-8
      '>
        <div onClick={() => router.push("/")} className='
          cursor-pointer
        '>
          <GiHummingbird className='text-white w-8 h-8' />
        </div>
        <Link href={"/"} className='flex gap-3 items-center text-white text-lgs'>
          <RiHomeSmileFill className='text-white w-6 h-6' />
          <p>Home</p>
        </Link>
        <Link href={"/notification"} className='flex gap-3 items-center text-white text-lg'>
          <IoNotifications className='text-white w-6 h-6' />
          <p>Notifications</p>
        </Link>
        <div onClick={handleProfile}  className='flex gap-3 items-center text-white text-lg cursor-pointer'>
          <FaUser className='text-white w-6 h-6' />
          <p>Profile</p>
        </div>
        {
          session.status==="authenticated" && (
            <div onClick={() => signOut()} className='flex gap-3 items-center cursor-pointer text-white text-lg'>
              <TbLogout2 className='text-white w-6 h-6' />
              <p>Logout</p>
            </div>
          )
        }

        <Button
          onClick={speakHandle}
          className='
            rounded-full
            bg-orange-500
            hover:bg-orange-600
            text-lg
        '>
          Speak
        </Button>
      </div>
    </div>
  )
}

export default Sidebar