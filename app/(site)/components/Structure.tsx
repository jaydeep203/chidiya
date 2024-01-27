import React from 'react';
import Sidebar from './Sidebar';
import Peoples from './Peoples';
import MobileMenu from './MobileMenu';

interface StructureProps{
    children: React.ReactNode;
}

const Structure:React.FC<StructureProps> = ({
    children
}) => {
  return (
    <div className='
        w-full
        flex
        justify-center
    '>
        <div className='
            w-full
            sm:w-full
            lg:w-[70%]
            h-[100vh]
            flex
            flex-row
        '>
            <div className='
                hidden
                sm:flex
                sm:w-[25%]
                border-r-[2px]
                border-solid
                border-neutral-700
            '>
                <Sidebar />
            </div>
            <div className='
                w-full
                sm:w-[50%]
                max-h-[100vh]
                overflow-y-scroll
                no-scrollbar
            '>
                {children}
            </div>
            <div className='
                hidden
                sm:w-[25%]
                sm:flex
                border-l-[2px]
                border-solid
                border-neutral-700
            '>
                <Peoples />
            </div>
            <MobileMenu />
        </div>
    </div>
  )
}

export default Structure