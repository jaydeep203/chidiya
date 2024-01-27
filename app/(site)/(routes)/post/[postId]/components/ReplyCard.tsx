"use client";
import React, { useMemo } from 'react'
import Avatar from '@/app/components/Avatar';
import { getCommentFeedProps } from '@/types';
import { formatDistanceToNowStrict } from 'date-fns';

interface PostCardProps{
    comment: getCommentFeedProps | null;
}

const ReplyCard:React.FC<PostCardProps> = ({
    comment
}) => {

    const createdAt = useMemo(()=>{
        if(!comment?.createdAt){
            return null;
        }

        return formatDistanceToNowStrict(new Date(comment.createdAt));
    }, [comment?.createdAt]);

  return (
    <div className='
        w-full
        px-3
        py-5
        border-b-[1px]
        border-solid
        border-neutral-700
    '>
        <div className='
            w-full
            flex
            flex-row
            gap-2
        '>
            <div className='
                w-[10%]
            '>
                <Avatar userId={comment?.userId} profile={comment?.user?.profileImage}  />
            </div>
            <div className='
                w-[90%]
                pl-1
                flex
                flex-col
                gap-3
            '>
                <div className='flex flex-row gap-2'>
                    <div className='
                        text-xs
                        text-white
                        font-bold
                    '>
                        {comment?.user.name}
                    </div>
                    <div className='
                        text-xs
                        text-neutral-500
                    '>
                        @{comment?.user.username}
                    </div>
                    <div className='
                        text-xs
                        text-neutral-500
                    '>
                        {createdAt}
                    </div>
                </div>
                <div className='
                    text-white
                    text-base
                '>
                    {
                        comment?.body
                    }
                </div>
                
            </div>

        </div>
    </div>
  )
}

export default ReplyCard