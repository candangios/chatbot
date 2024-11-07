'use client'

import { spinner } from '@/components/stocks'
import { SpinnerMessage } from '@/components/stocks/message'
import { Button } from '@/components/ui/button'
import { IconLeaderboard } from '@/components/ui/icons'
import { BASE_URL } from '@/config'
import { useAuth, User } from '@/lib/hooks/use-auth'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Referrals() {
  const { user, access_token } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<[User] | null>(null)

  const INVITE_URL = 'http://t.me/MachinaFi_bot/AIbot/start'

  const handleCoppyLink = () => {
    if (users) {
      const inviteLink = `${INVITE_URL}?startapp=${user?.telegramId}`
      navigator.clipboard.writeText(inviteLink)
      toast('Invite link copied to clipboard')
    } else {
      toast('Please use webview in telegram.')
    }
  }
  useEffect(() => {
    if (access_token) {
      getLeaderboard(access_token)
    }
  }, [access_token])

  // Hàm đăng nhập
  const getLeaderboard = async (token: string): Promise<void> => {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/telegram/leaderboard`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      setIsLoading(false)
      const data = await res.json()
      setUsers(data.data)
    } catch (error) {
      setIsLoading(false)
      console.error('Error get leader board:', error)
    }
  }

  return (
    <div className='relative mx-[25px] pt-[31px] flex h-[calc(100vh_-_86px)] overflow-hidden'>
      <div className=" flex flex-col w-full h-full">
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
            <h1 className="relative bg-gradient-to-r from-[#E2E2E2] to-[#F999F5] bg-clip-text text-transparent drop-shadow-title font-outfit font-bold text-[28px] text-center">
              Leaderboard
            </h1>
          </div>

          <div className=" grow w-full overflow-auto px-7 mt-[20px] ">
            {isLoading && (
              <div className="w-full flex items-center justify-center">
                {spinner}
              </div>
            )}
            {users?.map((userItem, index) => {
              const isOwner = (user && user.telegramId === userItem.telegramId)
              return (
                <div
                  key={index}
                  className=" w-full flex h-[20px] my-1 justify-between"
                >
                  <div className="w-40 flex ">
                    <p className="w-12 ml-5 text-[#6580D8] font-outfit font-semibold  size=[15px]">
                      {index + 1}
                    </p>
                    <p className={cn('text-[#999999] font-sans text-[14px]', { 'text-white text[16px]': isOwner })}>
                      {userItem.firstName}
                    </p>
                    <p className=" ml-1 text-[#999999] font-sans text-[14px]">
                      {userItem.lastName}
                    </p>
                  </div>

                  <p className={cn('text-white font-sans font-normal text-[15px] mr-[20px]', { 'font-semibold text-[#FFECA3] text-[20px]': isOwner })}>
                    {userItem.point}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
        <Button
          onClick={handleCoppyLink}
          className="flex justify-between z-10 bg-[#181818] bg-opacity-[0.18] shadow-referralLink rounded-full h-[48px]  mt-[19px] mx-[40px]"
        >
          <p className="text-white text-[12px]">REFERRAL LINKS</p>
          <Image src="./codeReferral.svg" width={24} height={24} alt="" />
        </Button>
        {/* <div className='bg-[#181818] bg-opacity-[0.18] shadow-referralLink rounded-full h-[42px]  mt-[22px] mx-[40px]'>
        <p>{`${INVITE_URL}?startapp=${user?.telegramId}`}</p>
      </div> */}
      </div>
    </div>

  )
}
