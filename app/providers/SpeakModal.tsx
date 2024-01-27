"use client";
import { Button } from '@/components/ui/button';
import React, { useCallback, useEffect, useState } from 'react'
import {IoClose} from "react-icons/io5";
import { twMerge } from 'tailwind-merge';
import useSpeakModal from '../hooks/useSpeakModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const SpeakModal = () => {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState('');
    const session = useSession();
    const router = useRouter();


    const speakModal = useSpeakModal();

    useEffect(()=>{
    

        if(session.status==="authenticated")
        {
            
          const fetchUser = async() => {
            setIsLoading(true);
            const user = await axios.get("/api/current");
            if(!user){
              console.log(user);
            }
            setId(user.data.id);
            
            setIsLoading(false);
          }
          fetchUser();
        }
    
      },[setId, session]);


    const onSubmit = useCallback(async(e:any) => {
        e.preventDefault();
        try{
            setIsLoading(true);

                const res = await axios.post("/api/message", {
                    message,
                    userId:id
                });
                if(!res){
                    console.log(res);
                    toast.error("something went wrong!");
                }

                toast.success("Post successfully.")
                

            setMessage("");
            setIsLoading(false);
            speakModal.onClose();
            router.refresh();

        } catch(error){
            console.log(error);
        }

    },[message, id, setIsLoading, router, speakModal]);

    

  return (
    <div className={twMerge(`
        w-full
        h-screen
        z-20
    `,
        speakModal.isOpen? "fixed" : "hidden"
    )}>
        <div className='
            bg-zinc-900
            w-full
            h-full
            bg-opacity-60
            flex
        '>
            <div className='
                m-auto
                bg-black
                w-full
                sm:w-[60%]
                lg:w-[50%]
                rounded-lg
                p-5
                flex
                flex-col
                gap-8
            '>
                <div className='
                    flex
                    flex-row
                    w-full
                    items-center
                    justify-between
                '>
                    <h1 className='text-2xl text-white font-bold'>
                        Write Something
                    </h1>
                    <Button 
                        onClick={() => speakModal.onClose()}
                        variant={"ghost"} size="icon" 
                        className='
                            self-end 
                            hover:bg-black
                            hover:scale-105
                    ' >
                        <IoClose className='text-white h-6 w-6' />
                    </Button>
                    
                </div>
                <div className='
                    w-full
                    my-6
                    flex
                    flex-col
                    gap-5
                '>
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        placeholder='Write Something...'
                        className='
                            w-full
                            py-3
                            text-lg
                            bg-black
                            text-white
                            resize-none
                            outline-none
                        '
                    />
                    
                
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <Button 
                        disabled={isLoading}
                        onClick={onSubmit}
                        className='
                        w-full
                        rounded-full
                        bg-white
                        text-black
                        hover:bg-neutral-200
                        hover:text-neutral-800
                    '>
                        Post
                    </Button>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default SpeakModal