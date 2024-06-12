import React from 'react'

import FeedCard from './FeedCard'

interface FeedLayoutProps {
  // posts, votes
}

const FeedLayout: React.FC<FeedLayoutProps> = () => {
  return (
    <div className='flex flex-col w-full md:w-[70%] h-full overflow-y-auto items-center justify-center space-y-4'>
      <FeedCard />
      <FeedCard />
    </div>
  )
}

export default FeedLayout