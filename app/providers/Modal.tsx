"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useCallback, useState } from 'react'
import {IoClose} from "react-icons/io5";
import { twMerge } from 'tailwind-merge';
import useLoginModal from '../hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Modal = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [varient, setVarient] = useState("login");
    const [loading, setLoading] = useState(false);


    const loginModal = useLoginModal();

    const login = useCallback(async()=>{
        try{
            await signIn("credentials", {
                email,
                password
            });

            loginModal.onClose();

        }catch(error){
            console.log(error);
        }
    },[email, password, loginModal]);

    const register = useCallback(async()=>{
        try{
            setLoading(true);
            const user = await axios.post("/api/register", {
                name,
                username,
                email,
                password
            });

            if(!user){
                console.log(user);
                toast.error("something went wrong");
            }

            toast.success(`welcome ${user.data.name}`);
            setLoading(false);
            login();
            loginModal.onClose();

        }catch(error){
            console.log(error);
        }
    },[email, password, name, username, loginModal, setLoading, login]);

    

    const toggleVarient = () => {
        varient == "login" ? setVarient("register") : setVarient("login");
    }

  return (
    <div className={twMerge(`
        w-full
        h-screen
        z-20
    `,
        loginModal.isOpen? "fixed" : "hidden"
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
                    {varient=="login" ? "Login": "Register"}
                    </h1>
                    <Button 
                        onClick={() => loginModal.onClose()}
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
                    <Input 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder='Email'
                        className='
                            bg-black
                            py-3
                            lg:py-4
                            outline
                            outline-1
                            outline-neutral-700
                            border-none
                            text-white
                            text-lg
                        '
                    />
                    
                    {
                        varient==="register" && (
                        <>
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
                                    text-lg
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
                                    text-lg
                                '
                            />

                        </>
                        )
                    }

                    <Input 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type='password'
                        placeholder='password'
                        className='
                            bg-black
                            py-3
                            lg:py-4
                            outline
                            outline-1
                            outline-neutral-700
                            border-none
                            text-white
                            text-lg
                        '
                    />
                </div>
                {
                    varient==="login" && (
                        <div className='text-neutral-400 text-sm flex flex-col'>
                            * use for test login
                            <span>
                                email: test@mail.com
                            </span>
                            <span>
                                password: test
                            </span>
                        </div>
                    )
                }
                <div className='w-full flex flex-col gap-2'>
                    <Button 
                        disabled={loading}
                        onClick={varient=="login"? login : register}
                        className='
                        w-full
                        rounded-full
                        bg-white
                        text-black
                        hover:bg-neutral-200
                        hover:text-neutral-800
                    '>
                        {varient=="login" ? "Sign In": "Sign Up"} 
                    </Button>
                    <div className='
                        flex
                        flex-row
                        text-neutral-600
                        text-sm
                        justify-center
                        gap-1
                    '>
                        {varient=="login"? "First time using Chidiya?" : "Already have an Account?"}
                        <span 
                            onClick={toggleVarient}
                            className='
                            text-white
                            hover:underline
                            cursor-pointer
                        '>
                            {varient=="login"? "Create an Account": "Login here"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal