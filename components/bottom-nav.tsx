'use client'

import React from 'react'

import Link from 'next/link'
import useScrollingEffect from '@/lib/hooks/use-scroll'
import useNavigation from '@/lib/hooks/use-navigation'
import MaxWidthWrapper from './max-width-wrapper'
import { cn } from '@/lib/utils'

const BottomNav = () => {
  const scrollDirection = useScrollingEffect() // Use the custom hook
  const navClass = scrollDirection === 'up' ? '' : 'opacity-25 duration-500'

  const { isHomeActive, isReferralsActive, isMissionActive } = useNavigation()

  return (
    <div className={`fixed bottom-0 w-full py-4 h-[82px] bg-transparent z-10`}>
      <MaxWidthWrapper>
        <div className="flex flex-row justify-around items-center bg-transparent w-full">
          <Link
            href="/referrals"
            className={cn(
              ' flex items-center justify-center w-32 h-12 rounded-full  bg-[#2A6772] hover:bg-[#21A5AD] drop-shadow-tabButton',
              { 'bg-[#21A5AD]': isReferralsActive }
            )}
          >
            <p
              className={cn(
                'text-[#6ED4D3] hover:text-[#ffffff] font-bold font-outfit',
                { 'text-[#FFFFFF]': isReferralsActive }
              )}
            >
              Referrals
            </p>
          </Link>
          <Link
            href="/"
            className={cn(
              ' flex items-center justify-center w-32 h-12 rounded-full  bg-[#2A6772] hover:bg-[#21A5AD] drop-shadow-tabButton',
              { 'bg-[#21A5AD]': isHomeActive }
            )}
          >
            <p
              className={cn(
                'text-[#6ED4D3] hover:text-[#ffffff] font-bold font-outfit',
                { 'text-[#FFFFFF]': isHomeActive }
              )}
            >
              MachinaFi
            </p>
          </Link>
          <Link
            href="/mission"
            className={cn(
              ' flex items-center justify-center w-32 h-12 rounded-full  bg-[#2A6772] hover:bg-[#21A5AD] drop-shadow-tabButton',
              { 'bg-[#21A5AD]': isMissionActive }
            )}
          >
            <p
              className={cn(
                'text-[#6ED4D3] hover:text-[#ffffff] font-bold font-outfit',
                { 'text-[#FFFFFF]': isMissionActive }
              )}
            >
              Mission
            </p>
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

{
  /* <div className='w-full h-[82px] flex justify-around items-center'>
  <Button className='w-32 rounded-full bg-[#6ED4D3] hover:bg-[#22FFF4] drop-shadow-tabButton ' >Referrals</Button>
  <Button className='w-32 rounded-full bg-[#6ED4D3] hover:bg-[#22FFF4] ' >1Chain.AI</Button>
  <Button className='w-32 rounded-full bg-[#6ED4D3] hover:bg-[#22FFF4] ' >Mission</Button>
</div> */
}

export default BottomNav
