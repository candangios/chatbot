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
    <div className={`fixed bottom-0 w-full flex justify-center items-center h-[82px] bg-transparent `}>
      <MaxWidthWrapper >
        <div className='px-[25px]'>
          <div className="flex flex-row justify-around items-center bg-[#181818]/50  w-full h-[46px] rounded-t-[12px] overflow-hidden">
            <Link
              href="/referrals"
              className={cn('flex-1 h-full flex items-center justify-center rounded-[2px]', { 'bg-[#B04795]': isReferralsActive })}
            >

              <p
                className={cn(
                  'text-[#6ED4D3] hover:text-[#ffffff] font-bold font-outfit text-[14px]',
                  { 'text-[#FFFFFF]': isReferralsActive }
                )}
              >
                Referrals
              </p>
            </Link>
            <Link
              href="/"
              className={cn('flex-1 h-full flex items-center justify-center rounded-[2px]', { 'bg-[#B04795]': isHomeActive })}

            >

              <p
                className={cn(
                  'text-[#6ED4D3] hover:text-[#ffffff] font-bold font-outfit text-[14px]',
                  { 'text-[#FFFFFF]': isHomeActive }
                )}
              >
                MachinaFi
              </p>
            </Link>
            <Link
              href="/mission"
              className={cn('flex-1 h-full flex items-center justify-center rounded-[2px]', { 'bg-[#B04795]': isMissionActive })}
            >
              <p
                className={cn(
                  'text-[#6ED4D3] hover:text-[#ffffff] font-bold font-outfit text-[14px] opacity-100',
                  { 'text-[#FFFFFF]': isMissionActive }
                )}
              >
                Mission
              </p>
            </Link>
          </div>
        </div >

      </MaxWidthWrapper >
    </div >
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
