
'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
const missions = [{ type: 'Point' }, { type: 'Mission' }, { type: 'Claim' }, { type: 'Claim' }, { type: 'Mission' }, { type: 'Point' }, { type: 'Claim' }, { type: 'Point' }, { type: 'Point' },]

export default function About() {
  return (
    <div className='relative mx-[25px] pt-[31px] flex h-[calc(100vh_-_86px)] overflow-hidden'>
      <div className=" flex flex-col w-full h-full ">
        <div className=" flex flex-col w-full h-full bg-[#ffffff] bg-opacity-[0.03] rounded-[48px] shadow-referralLinkBg">
          <div className="relative -full  h-[65px] mt-[20px]">
            <Image
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
              src="./leaderboard.svg"
              width={200}
              height={55}

              priority={false}
              alt=""
            />
            <h1 className="relative bg-gradient-to-r from-[#E2E2E2] to-[#F999F5] bg-clip-text text-transparent  drop-shadow-title font-outfit font-bold text-[28px] text-center z-10">
              About
            </h1>
          </div>
          <div className="px-10  w-full gap-[13px] overflow-auto mb-[50px] mt-[20px] ">

            <h1 className='text-white text-[20px]'>Welcome to MachinaFi! Here’s how to get the most out of your interactions with the bot.</h1>
            <div className='my-3 text-[#AE959E] text-[14px]'>
              <li>You can type in your own question or select from a list of suggested questions.</li>
              <li>Once you select a question, it will disappear from the list and won’t be available to choose again.</li>
              <li>After receiving an answer, you can respond with either a thumbs up 👍, thumbs down 👎</li>
              <li>Each reaction (thumbs up/down or suggest) will earn you 10 </li>
            </div>


            <h1 className='text-white text-[20px]'>Leaderboard and Referrals</h1>
            <div className='my-3 text-[#AE959E]'>
              <li>A leaderboard 📊 displays top users based on points.</li>
              <li>Each successful referral earns you an extra 100 points 🎉, helping you climb the leaderboard faster.</li>
            </div>
            <p className='text-[#AE959E]'>Enjoy exploring and engaging with MachinaFi, and make the most of every interaction!</p>


          </div>

          <div className=" grow w-full overflow-auto px-7 "></div>
        </div>
      </div>
    </div>

  )
}



