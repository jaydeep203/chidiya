"use client";
import React, { useCallback } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";

import {HiOutlineDotsVertical, HiTrash} from "react-icons/hi";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface deleteBtnProps{
    userId: string | undefined;
    postId:string | undefined;
}

const DeleteBtn:React.FC<deleteBtnProps> = ({
    userId,
    postId
}) => {

    const router = useRouter();

    const handleDelete = useCallback(async()=>{
        try{

            const res = await axios.delete("/api/message", { data:{ userId, postId} })
            if(!res){
                toast.error("something went wrong!");
            }

            toast.success("Deleted.");
            router.refresh();

        }catch(error){
            console.log(error);
        }
    },[router, userId, postId]);

  return (
    
    <>
        <Popover>
            <PopoverTrigger asChild>
                <Button 
                    
                     size={"icon"} variant={"ghost"} className='
                    hover:bg-black
                    hover:bg-opacity-0
                    
                '>
                    <HiOutlineDotsVertical className='
                        text-neutral-400
                        h-4
                        w-4
                    ' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='bg-black w-36'>
                <div className='
                    bg-black
                '>
                    <Button 
                    onClick={handleDelete}
                    className='    
                        w-fit
                        flex
                        flex-row
                        items-center
                        text-white
                        hover:text-white
                        hover:bg-black
                        hover:bg-opacity-0
                    '
                        variant={"destructive"}

                    >
                        <HiTrash className='
                            h-4
                            w-4
                            text-neutral-400
                            mr-2
                        ' />
                        Delete
                    </Button>
                </div>
            </PopoverContent>
        </Popover>  
    </>
  )
}

export default DeleteBtn