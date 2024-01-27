import Avatar from '@/app/components/Avatar'
import React from 'react'
import getAllUsers from '../actions/getAllUsers'
import Link from 'next/link';

const Peoples = async() => {
  const users = await getAllUsers();

  return (
    <div className='
      w-full
      flex
    '>
      <div className='
        w-[85%]
        mx-auto
        mt-4
      '>
        <div className='
          w-full
          bg-zinc-800
          rounded-lg
          py-4
          px-3
          flex
          flex-col
          gap-3
        '>
          <h1 className='
            text-white
            text-lg
            text-wrap
          '>
            Who to Follow
          </h1>
          <div className='
            w-full
            flex
            flex-col
            gap-2
          '>
            {
              users.map(({id, name, username, profileImage}) => (
              <div 
                key={username}
                className='
                  w-full
                  py-2
                  flex
                  flex-row
                  items-center
                  gap-3
                ' >
                    <Avatar profile={profileImage} userId={id} />
                    <div className='
                      flex
                      flex-col
                    '>
                      <Link href={`/users/${id}`} className='text-white text-wrap text-sm'>
                        {name}
                      </Link>
                      <Link href={`/users/${id}`} className='text-neutral-400 text-sm'>
                        @{username}
                      </Link>
                    </div>
              </div>
              ))
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default Peoples