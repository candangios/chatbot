'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
const missions = [{ type: 'Point' }, { type: 'Mission' }, { type: 'Claim' }, { type: 'Claim' }, { type: 'Mission' }, { type: 'Point' }, { type: 'Claim' }, { type: 'Point' }, { type: 'Point' },]

export default function Misstion() {
  return (
    <div className='relative mx-[25px] pt-[31px] flex h-[calc(100vh_-_102px)] overflow-hidden'>
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
              Missions
            </h1>
          </div>
          <div className="flex flex-wrap w-full gap-[13px] overflow-auto mb-[50px] mt-[20px] items-center justify-center ">

            {missions?.map((item, index) => {
              return (<div
                key={index}
                className={cn("w-30 flex items-center justify-center aspect-mission bg-point bg-cover drop-shadow-title", { 'bg-mission': (item.type === "Mission") }, { 'bg-point': (item.type === "Point") }, { 'bg-claim': (item.type === "Claim") })}
              >
                <p className='text-white text-[14px] font-bold drop-shadow-title'>Coming soon</p>

              </div>)
            })}
          </div>

          <div className=" grow w-full overflow-auto px-7 "></div>
        </div>
      </div>
    </div>

  )
}
