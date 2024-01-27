import React from 'react'
import Header from './components/Header';
import Form from './components/Form';
import getPosts from './actions/getPosts';
import PostFeed from './components/PostFeed';
import getCurrentUser from './actions/getCurrentUser';

export const revalidate = 0;

export default async function Home() {
    const posts = await getPosts();
    const currentUser = await getCurrentUser();

    return (
      <div className='
        w-full
        h-full
      '>
        <Header title="Home" />
        <Form placeholder='Type Something...' profileImage={currentUser?.profileImage} userId={currentUser?.id} />
        <PostFeed posts={posts} currentId={currentUser?.id} />
      </div>
    );
  }
