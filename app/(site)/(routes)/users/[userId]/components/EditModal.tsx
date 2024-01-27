"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useCallback, useEffect, useState } from 'react'
import {IoClose} from "react-icons/io5";
import { twMerge } from 'tailwind-merge';
import useEditModal from '@/app/hooks/useEditModal';
import {CldUploadButton} from "next-cloudinary";
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';
import { User } from '@prisma/client';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';



const EditModal = () => {
    const [profileImage, setProfileImage] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(false);

    const editModal = useEditModal();
    const router = useRouter();
    const session = useSession();

    useEffect(()=>{
        if(session.status==="authenticated"){
        const fetchUser = async() => {
          const user = await axios.get("/api/current");
          if(!user){
            console.log(user);
          }
          setProfileImage(user.data.profileImage);
          setCoverImage(user.data.coverImage);
          setName(user.data.name);
          setUsername(user.data.username);
          setBio(user.data.bio);
          setId(user.data.id);

        }
    
        fetchUser();
    }
    
      },[setProfileImage, setCoverImage, setName, setUsername, setBio, session]);


    const handleProfileImage = useCallback((result:any)=>{
        setProfileImage(result?.info?.secure_url);
    },[setProfileImage]);


    const handleCoverImage = useCallback((result:any)=>{
        setCoverImage(result?.info?.secure_url);
    },[setCoverImage]);

    const onSubmit = useCallback(async() => {
        try{
            setLoading(true);
            const response = await axios.patch("/api/edit", {
                name,
                username,
                bio,
                profileImage,
                coverImage,
                id
            });

            if(!response){
                console.log(response);
            }

            toast.success("Profile updated successfully.");
            setLoading(false);
            router.refresh();
            editModal.onClose();



        }catch(error){
            console.log(error);
        }

    },[setLoading, name, username, bio, profileImage, coverImage, id, editModal, router]);

  return (
    <div className={twMerge(`
        w-full
        h-screen
        z-20
    `,
       editModal.isOpen? "fixed" : "hidden"
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
                max-h-screen
                overflow-y-scroll
                no-scrollbar
            '>
                <div className='
                    flex
                    flex-row
                    w-full
                    items-center
                    justify-between
                '>
                    <h1 className='text-2xl text-white font-bold'>
                        Edit Your Profile
                    </h1>
                    <Button 
                        onClick={() => editModal.onClose()}
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
                    <div className='
                        bg-black
                        w-fit
                        py-1
                        outline
                        outline-1
                        outline-neutral-700
                        border-none
                    '>
                        <CldUploadButton
                            options={{maxFiles:1}}
                            onUpload={handleProfileImage}
                            uploadPreset='h0ca77es'
                            className='
                                relative
                                w-28
                                h-28
                                rounded-lg
                            '
                        >
                            <Image
                                src={profileImage || "/images/placeholder.png"}
                                alt='Project image'
                                fill
                                className='
                                    p-2
                                    rounded-lg
                                    object-cover
                                    boject-center
                                '
                            />
                            <FaEdit className='
                                absolute
                                top-3
                                right-3
                                text-orange-500
                                h-5
                                w-5
                            ' />
                        </CldUploadButton>
                    </div>
                    <div
                        className='
                            bg-black
                            py-1
                            outline
                            outline-1
                            outline-neutral-700
                            border-none
                            p-2
                            flex
                        '
                    >

                        <CldUploadButton
                            options={{maxFiles:1}}
                            onUpload={handleCoverImage}
                            uploadPreset='h0ca77es'
                            className='
                                relative
                                mx-auto
                                w-full
                                h-28
                                py-3
                                rounded-lg
                                bg-zinc-500
                            '
                        >
                            {
                                coverImage && (
                                    <Image
                                        src={coverImage}
                                        alt='cover image'
                                        fill
                                        className='
                                            p-2
                                            rounded-lg
                                            object-cover
                                            boject-center
                                        '
                                    />
                                )
                            }
                            <FaEdit className='
                                absolute
                                top-3
                                right-3
                                text-orange-500
                                h-5
                                w-5
                            ' />
                        </CldUploadButton>

                    </div>
                    <Input 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder='Name'
                        className='
                            bg-black
                            py-3
                            lg:py-4
                            outline
                            outline-1
                            outline-neutral-700
                            border-none
                            text-white
                            text-base
                                '
                        />
                            <Input 
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                placeholder='Username'
                                className='
                                    bg-black
                                    py-3
                                    lg:py-4
                                    outline
                                    outline-1
                                    outline-neutral-700
                                    border-none
                                    text-white
                                    text-base
                                '
                            />

                    <Input 
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                        placeholder='Bio'
                        className='
                            bg-black
                            py-3
                            lg:py-4
                            outline
                            outline-1
                            outline-neutral-700
                            border-none
                            text-white
                            text-base
                        '
                    />
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <Button 
                        disabled={loading}
                        onClick={onSubmit}
                        className='
                            w-full
                            rounded-full
                            bg-white
                            text-black
                            hover:bg-neutral-200
                            hover:text-neutral-800
                    '>
                        Save 
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditModal