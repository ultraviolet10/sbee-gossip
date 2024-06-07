import React from 'react'

interface FeedCardProps {}

const FeedCard: React.FC<FeedCardProps> = () => {
  return (
    <div className='flex flex-col items-start justify-center w-full h-[500px] rounded-xl bg-white border-[2px] border-gray-200'>
      {/* date of post */}
      <span className=''></span>
      {/* title */}
      <span></span>
      {/* content */}
      <span></span>

      {/* voting section */}
      <div className='flex flex-row items-center justify-between w-full'>
        <div className='flex flex-row w-[60%] items-center justify-center'>
          <button className='flex flex-row items-center justify-between w-[50%] h-[50px] bg-[#97c236]'>I kinda believe it</button>
          <button className='flex flex-row items-center justify-between w-[50%] h-[50px] bg-[#c24836]'>This is BS</button>
        </div>
        {/* percentage */}
        <span className='text-gray-200 text-[20px]'>true!!</span>
      </div>
    </div>
  )
}

export default FeedCard