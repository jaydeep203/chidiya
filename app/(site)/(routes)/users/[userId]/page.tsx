import React from 'react'
import Header from '../../../components/Header';
import ProfileSection from './components/ProfileSection';
import getUser from '@/app/(site)/actions/getUser';
import getCurrentUser from '@/app/(site)/actions/getCurrentUser';
import ProfileFeed from './components/ProfileFeed';
import getFollowers from '@/app/(site)/actions/getFollowers';

export const revalidate = 0;

export default async function Profile({params} : {
  params:{userId:string;}
}) {
  const user = await getUser(params.userId);
  const currentUser = await getCurrentUser();
  const followers = await getFollowers(params.userId);

    return (
      <div className='
        w-full
        h-full
      '>
        <Header title={user?.name} />
        <ProfileSection 
          currentId={currentUser?.id}
          user={user}
          followers={followers}
        />
        <ProfileFeed 
          userId={params.userId}
        />
      </div>
    );
  }
