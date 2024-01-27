import { getCommentFeedProps } from '@/types';
import React from 'react';
import ReplyCard from './ReplyCard';

interface replyFeedProps{
    comments:getCommentFeedProps[]
}

const ReplyFeed:React.FC<replyFeedProps>  = ({
    comments
}) => {
  return (
    <div className='w-full'>
        {
            comments.map((comment, index)=>(
                <ReplyCard 
                    key={index}
                    comment={comment}
                />
            ))
        }
    </div>
  )
}

export default ReplyFeed