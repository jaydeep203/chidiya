"use client";
import Avatar from '@/app/components/Avatar';
import useLoginModal from '@/app/hooks/useLoginModal';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';

interface formProps{
    profileImage: string | null | undefined;
    userId: string | null | undefined;
    placeholder:string;
    isReply?:boolean;
    postId?:string;
}

const Form:React.FC<formProps> = ({
    placeholder,
    profileImage,
    userId,
    isReply,
    postId
}) => {
    const loginModal = useLoginModal();
    const session = useSession();
    const router = useRouter();

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async(e:any) => {
        e.preventDefault();
        try{
            setIsLoading(true);
            if(isReply){
                const reply = await axios.post("/api/message/reply", {
                    message,
                    userId,
                    postId
                });
                if(!reply){
                    console.log(reply);
                    toast.error("something went wrong!");
                }

                toast.success("reply successfully.");
            } else {
                const res = await axios.post("/api/message", {
                    message,
                    userId
                });
    
                if(!res){
                    console.log(res);
                    toast.error("something went wrong!");
                }

                toast.success("Post successfully.")
            }

            setMessage("");
            setIsLoading(false);
            router.refresh();

        } catch(error){
            console.log(error);
        }

    },[message, userId, postId, isReply, setIsLoading, router]);

    if(session?.status==="unauthenticated"){
        return (
            <div className='
            w-full
            py-10
            px-4
            flex
            border-b-[2px]
            border-solid
            border-neutral-700
        '>
            <div className='
                mx-auto
                flex
                flex-col
                gap-3
                items-center
            '>
                <h1 className='
                    text-white
                    text-xl
                    font-bold
                '>Welcome To Chidiya</h1>
                <div className='
                    flex
                    flex-row
                    gap-4
                '>
                    <Button 
                        onClick={loginModal.onOpen}
                        className='
                        bg-orange-500
                        rounded-full
                        hover:bg-orange-600
                    '>
                        Login
                    </Button>
                    <Button 
                        onClick={loginModal.onOpen}
                        className='
                        bg-neutral-100
                        rounded-full
                        text-black
                        hover:text-black
                        hover:bg-neutral-200
                    '>
                        Register
                    </Button>
                </div>
            </div>
        </div>
        )
    }

  return (
    <>

    <div className='
        w-full
        py-2
        px-4
        border-b-[2px]
        border-solid
        border-neutral-700
    '>
        <div className='
            flex
            flex-row
            gap-3
        '>
            <Avatar profile={profileImage} userId={userId} />
            <form onSubmit={onSubmit} className='w-[90%] flex flex-col'>
                <textarea 
                    required={true}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={placeholder}
                    className='
                        w-full
                        py-3
                        text-lg
                        bg-zinc-900
                        text-white
                        resize-none
                        outline-none
                    '
                />
                <div className='w-full flex justify-end'>
                    <Button 
                        disabled={isLoading}
                     type='submit' className='
                        bg-orange-500
                        rounded-full
                        w-fit
                        right-0
                        relative
                        hover:bg-orange-600
                    '>
                        Post
                    </Button>
                </div>
                
            </form>
        </div>
    </div>
    
    </>
  )
}

export default Form