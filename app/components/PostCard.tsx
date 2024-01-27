"use client";
import React, { useMemo } from 'react'
import Avatar from './Avatar'
import ReplyBtn from './ReplyBtn'
import LikeBtn from './LikeBtn'
import { getPostFeedProps } from '@/types';
import DeleteBtn from './DeleteBtn';
import { useRouter } from 'next/navigation';
import { formatDistanceToNowStrict } from 'date-fns';

interface PostCardProps{
    post: getPostFeedProps | null;
    currentId: string | null | undefined;
}

const PostCard:React.FC<PostCardProps> = ({
    post,
    currentId
}) => {

    const router = useRouter();
    const createdAt = useMemo(()=>{
        if(!post?.createdAt){
            return null;
        }

        return formatDistanceToNowStrict(new Date(post.createdAt));
    }, [post?.createdAt]);

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
                <Avatar userId={post?.userId} profile={post?.user?.profileImage}  />
            </div>
            <div className='
                w-[90%]
                pl-1
                flex
                flex-col
                gap-3
                relative
            '>
                <div className='
                    absolute
                    top-1
                    right-2
                '>
                    {
                        post?.userId==currentId && (
                            <DeleteBtn postId={post?.id} userId={post?.userId} />
                        )
                    }
                </div>
                <div className='flex flex-row gap-2'>
                    <div 
                        onClick={() => router.push(`/users/${post?.userId}`)}
                        className='
                        text-xs
                        text-white
                        font-bold
                        hover:underline
                        cursor-pointer
                    '>
                        {post?.user.name}
                    </div>
                    <div
                        onClick={() => router.push(`/users/${post?.userId}`)} 
                        className='
                        text-xs
                        text-neutral-500
                        hover:underline
                        cursor-pointer
                    '>
                        @{post?.user.username}
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
                        post?.body
                    }
                </div>
                <div className='
                    flex
                    flex-row
                    gap-8
                '>
                    <ReplyBtn comments={post?.comments} currentId={currentId} postId={post?.id}  />
                    <LikeBtn likedIds={post?.likedIds} currentId={currentId} postId={post?.id}  />
                </div>
            </div>

        </div>
    </div>
  )
}

export default PostCard