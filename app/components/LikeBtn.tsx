"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast';
import {IoIosHeartEmpty} from 'react-icons/io';
import {IoIosHeart} from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

interface likeBtnProps{
  likedIds: string[] | null | undefined;
  currentId: string | null | undefined;
  postId: string | null | undefined;
}

const LikeBtn:React.FC<likeBtnProps> = ({
  likedIds,
  currentId,
  postId
}) => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isLiked = useMemo(()=>{
    const list = likedIds;

    return list?.includes(currentId || "");
  },[currentId, likedIds]);


  const onClick = useCallback(async() => {

    try{

      setLoading(true);
      let liked;

      if(isLiked){
        
        liked = await axios.delete("/api/liked", {
          data:{
            currentId,
            postId
          }
        });

        if(!liked){
          console.log(liked);
          toast.error("Something went wrong");
        }

        toast.success("unliked!");

      }else{
        liked = await axios.put("/api/liked" , {
          currentId,
          postId
        });

        if(!liked){
          console.log(liked);
          toast.error("Somthing went wrong!");
        }
        toast.success("liked!");
      }
      
      setLoading(false);
      router.refresh();

    }catch(error){
      console.log(error);
    }

  },[currentId, postId, router, isLiked, setLoading]);

  const Icon = isLiked ? IoIosHeart : IoIosHeartEmpty;

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className='
      flex
      flex-row
      gap-1
      text-sm
      text-neutral-400
      cursor-pointer
      hover:scale-105
    '>
        <Icon className={twMerge(`
            h-5
            w-5
        `,
          isLiked? "text-red-600" : "text-neutral-400 hover:text-red-600"
        )}
        
        />
        {likedIds?.length}
    </button>
  )
}

export default LikeBtn