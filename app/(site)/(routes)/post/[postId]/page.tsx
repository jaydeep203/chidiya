import React from 'react'
import Header from '@/app/(site)/components/Header';
import getPost from '@/app/(site)/actions/getPost';
import PostCard from '@/app/components/PostCard';
import getCurrentUser from '@/app/(site)/actions/getCurrentUser';
import Form from '@/app/(site)/components/Form';
import ReplyCard from './components/ReplyCard';
import getComments from '@/app/(site)/actions/getComments';
import ReplyFeed from './components/ReplyFeed';

export const revalidate = 0;

export default async function Post({params}:{
    params:{postId:string}
}){

    const post = await getPost(params.postId);
    const comments = await getComments(params.postId);
    const currentUser = await getCurrentUser();

    return (
      <div className='
        h-full
        w-full
      '>
        <Header title='Post' />
        <PostCard 
            currentId={currentUser?.id}
            post={post}
        />
        <Form
            postId={params.postId}
            isReply={true}
            profileImage={currentUser?.profileImage}
            userId={currentUser?.id}
            placeholder='Type Your Reply...'
        />
        <ReplyFeed comments={comments} />

      </div>
    );
  }
