import React from 'react'

interface FeedCardProps {}

const FeedCard: React.FC<FeedCardProps> = () => {
  return (
    <div className='flex flex-col z-10 items-start justify-between p-6 w-full h-[400px] rounded-xl bg-white border-[2px] border-gray-200 font-comic'>
      <div className='flex flex-col items-start justify-center w-full px-4'>
        {/* date of post */}
        <span className='text-black text-[15px] text-left mb-4'>23 August, 08:21 AM. 3min ago.</span>
        {/* title */}
        <span className='text-black text-[25px] text-left font-bold'>Lorem ipsum dolor sit amet consectetur. Et sollicitudin donec turpis lacus consectetur.</span>
        {/* content */}
        <span className='text-black text-[20px] text-left'>Lorem ipsum dolor sit amet consectetur. Et sollicitudin donec turpis lacus consectetur in phasellus neque augue. Enim amet volutpat volutpat tincidunt viverra nulla. Blandit ultrices turpis vestibulum sed tortor tortor sit placerat nibh. Arcu ac non risus ut tortor aliquam est. Learn more</span>
      </div>
      
      {/* voting section */}
      <div className='flex flex-row items-center justify-between w-full px-4'>
        <div className='flex flex-row w-[60%] items-center justify-center space-x-4'>
          <button className='flex flex-row items-center justify-between w-[50%] h-[50px] bg-[#97c236] rounded-xl px-3 font-bold text-[20px]'>I kinda believe it</button>
          <button className='flex flex-row items-center justify-between w-[50%] h-[50px] bg-[#c24836] rounded-xl px-3 font-bold text-[20px]'>This is BS</button>
        </div>
        {/* percentage stat */}
        <span className='text-black text-[20px]'>true!!</span>
      </div>
    </div>
  )
}

export default FeedCard