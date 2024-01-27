
import React from 'react';
import PostCard from '@/app/components/PostCard';
import { getPostFeedProps } from '@/types';

interface postFeedProps{
    posts: getPostFeedProps[];
    currentId: string | null | undefined;
}

const PostFeed:React.FC<postFeedProps> = ({
    posts,
    currentId
}) => {

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
                currentId={currentId}
            />
          ))
        }
    </div>
  )
}

export default PostFeed