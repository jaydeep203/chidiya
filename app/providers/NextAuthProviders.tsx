"use client";
import React from 'react';
import {SessionProvider} from "next-auth/react";

interface nextAuthProps{
    children: React.ReactNode;
}

const NextAuthProviders:React.FC<nextAuthProps> = ({
    children
}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default NextAuthProviders