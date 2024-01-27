import getCurrentUser from '@/app/(site)/actions/getCurrentUser';
import getPosts from '@/app/(site)/actions/getPosts'
import PostCard from '@/app/components/PostCard';
import React from 'react'

const ProfileFeed = async({userId}: {userId:string}) => {
    const posts = await getPosts(userId);
    const currentUser = await getCurrentUser();
  return (
    <div className='
        w-full
        pb-20
    '>
        {
          posts?.map((post,index) => (
            <PostCard 
                key={index}
                post={post}
                currentId={currentUser?.id}
            />
          ))
        }
    </div>
  )
}

export default ProfileFeed