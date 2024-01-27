"use client";
import Loader from '@/app/components/Loader';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

interface followBtnProps{
    currentId:string | null | undefined;
    userId: string | null | undefined;
    followingIds: string[] | null | undefined;
}

const FollowBtn:React.FC<followBtnProps> = ({
    currentId,
    userId,
    followingIds
}) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const isFollowing = useMemo(()=>{
        const list = followingIds;

        return list?.includes(currentId || "");
    },[followingIds, currentId]);

    const handleFollow = useCallback(async()=>{
        
        setLoading(true);
        let followingId;
        if(isFollowing){

            followingId = await axios.delete(`/api/${userId}/follow`, {
                data:{ currentId }
            });

            if(!followingId){
                console.log(followingId);
            }

            toast.success("Unfollowed");

        }else{
            followingId = await axios.put(`/api/${userId}/follow`, {
                currentId
            });

            if(!followingId){
                console.log(followingId);
            }

            toast.success("follwing");
        }

        setLoading(false);
        router.refresh();
    },[currentId, userId, setLoading, isFollowing, router]);

    if(loading){
        return(
            <Loader />
        )
    }

  return (
    <>
        <Button
                disabled={loading}
                 onClick={handleFollow}
                className={twMerge(`
                    self-end
                    
                    rounded-full
                    mt-3
                    mr-3
                `,
                    isFollowing ? "bg-black text-white outline outline-white": "bg-white text-black",
                    isFollowing ? "hover:bg-neutral-900 hover:text-neutral-100": `hover:bg-neutral-100 hover:text-neutral-800`
                )}
                
                >
                    {isFollowing ? "Following" :"Follow"}
        </Button>
    </>
  )
}

export default FollowBtn