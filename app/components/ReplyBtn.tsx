"use client";
import { Comment } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';

import {AiOutlineMessage} from "react-icons/ai";

interface replyBtnProps{
  comments: Comment[] | null | undefined;
  postId:string | null | undefined;
  currentId:string |null | undefined ;
}

const ReplyBtn:React.FC<replyBtnProps> = ({
  comments,
  postId,
  currentId
}) => {

  const router = useRouter();

  

  return (
    <button
      onClick={() => router.push(`/post/${postId}`)}
      className='
        text-neutral-400
        flex
        flex-row
        items-center
        gap-1
        text-sm
        hover:scale-105
        hover:text-orange-500
    '>
        <AiOutlineMessage className='
            text-neutral-400
            hover:text-orange-500
            h-5
            w-5
        ' />
        {comments?.length}
    </button>
  )
}

export default ReplyBtn