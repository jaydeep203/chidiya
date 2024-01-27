"use client";
import React from 'react'
import {HashLoader} from "react-spinners";

const loading = () => {
  return (
    <div className='
        w-full
        h-[100vh]
        flex
        justify-center
        items-center
    '>
        <HashLoader color='orange' className="h-8 w-8" />
    </div>
  )
}

export default loading