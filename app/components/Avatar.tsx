"use client";
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

interface AvatarProps{
  profile:string | null | undefined;
  userId:string | null | undefined;
}



const Avatar = ({
  profile,
  userId
}:AvatarProps) => {

  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(`/users/${userId}`)}
      className='
        relative
        w-8
        h-8
        sm:w-10
        sm:h-10
        lg:w-12
        lg:h-12
        rounded-full
        cursor-pointer
    '>
        <Image 
            src={profile || "/images/placeholder.png"}
            alt='Avatar'
            fill
            className='object-cover object-center rounded-full'
        />
    </div>
  )
}

export default Avatar