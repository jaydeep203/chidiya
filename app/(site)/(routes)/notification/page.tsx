import React from 'react'
import Header from '../../components/Header';

export default function Notification() {
    return (
      <div className='
        w-full
        h-full
        text-white
      '>
        <Header title="Notifications" />
          <div className='
            text-neutral-400
            mt-5
            ml-5
          '>
            No Notifications
          </div>
      </div>
    );
  }
