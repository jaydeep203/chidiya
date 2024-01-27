"use client";
import useEditModal from '@/app/hooks/useEditModal';
import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import Image from 'next/image'
import React, { useMemo } from 'react';

import {FaCalendar, FaEdit} from "react-icons/fa";
import FollowBtn from './FollowBtn';
import {format} from "date-fns";

interface profileSectionProps{
    user:User | null;
    currentId: string | null | undefined;
    followers:number | null;
}

const ProfileSection:React.FC<profileSectionProps> = ({
    user,
    currentId,
    followers
}) => {
    const editModal = useEditModal();

    const createdAt = useMemo(()=>{
        if(!user?.createdAt){
          return null;
        }
    
        return format(new Date(user.createdAt),"MMMM yyyy");
    
      },[user?.createdAt]);

  return (
    <>
    
    
    <div className='
        w-full
        flex
        flex-col
        pb-4
        border-b-[2px]
        border-solid
        border-neutral-700
    '>
        <div className='
            relative
            w-full
            bg-zinc-400
            h-[25vh]
        '>
            {user?.coverImage && (
                <Image
                    src={user.coverImage}
                    alt='banner'
                    fill
                    className='object-cover object-center'
                />
            )}

            {
                currentId==user?.id && (
                    <Button 
                        onClick={() => editModal.onOpen()}
                        size={"icon"}
                        variant={"ghost"}
                        className='
                            absolute
                            right-1
                            top-1
                            hover:bg-zinc-900
                            hover:text-white
                            hover:bg-opacity-5
                    '>
                        <FaEdit className='
                            text-white
                            h-5
                            w-5
                        ' />
                    </Button>
                ) 
            }

            <div className='
                absolute
                left-4
                -bottom-16
            '>
                <div className='
                    relative
                    w-[20vh]
                    h-[20vh]
                    rounded-full
                    border-solid
                    border-zinc-900
                    border-[4px]
                '>
                    <Image 
                        src={ user?.profileImage || "/images/placeholder.png"}
                        alt='Avatar'
                        fill
                        className='object-cover object-center rounded-full'
                    />
                </div>
            </div>

        </div>

        {
            currentId==user?.id ? (
                <Button 
                    onClick={() => editModal.onOpen()}
                className='
                    self-end
                    bg-white
                    text-black
                    hover:bg-neutral-100
                    hover:text-neutral-800
                    rounded-full
                    mt-3
                    mr-3
                '>
                    Edit
                </Button>
            ) : (
                <FollowBtn currentId={currentId} userId={user?.id} followingIds={user?.followingIds} />
            )
        }

        <div className='
            text-white
            mt-8
            ml-3
            flex
            flex-col
            gap-4
        '>
            <div className='
                flex
                flex-col
            '>
                <h1 className='
                    font-bold
                    text-lg
                '>{user?.name}</h1>
                <p className='
                    text-neutral-500
                    text-sm
                '>
                    {user?.username}
                </p>
            </div>
            <div className='
                w-full
                text-wrap
                min-w-0
            '>
                {user?.bio}
            </div>
            <div className='
                flex
                flex-row
                gap-3
                text-neutral-500
                items-center
            '>
                <FaCalendar />
                <div className='
                    text-sm
                '>
                    joined {createdAt}
                </div>
            </div>
            <div className='
                flex
                flex-row
                gap-3
                text-sm
                text-neutral-500
            '>
                <div>
                    <span className='text-white text-base'>{followers}</span> Following
                </div>
                <div>
                    <span className='text-white text-base'>{user?.followingIds.length}</span> Followers
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ProfileSection