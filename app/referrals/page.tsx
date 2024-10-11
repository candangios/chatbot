'use client'

import { spinner } from "@/components/stocks"
import { SpinnerMessage } from "@/components/stocks/message"
import { Button } from "@/components/ui/button"
import { IconLeaderboard } from "@/components/ui/icons"
import { BASE_URL } from "@/config"
import { useAuth, User } from "@/lib/hooks/use-auth"
import Image from "next/image"
import { use, useEffect, useState } from "react"
import { toast } from "sonner"
import { set } from "zod"


export default function IndexPage() {
  const { user, access_token } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<[User] | null>(null)

  const INVITE_URL = 'https://t.me/referral_showcase_bot/start'

  const handleCoppyLink = () => {
    const inviteLink = `${INVITE_URL}?startapp=${user?.telegramId}`
    navigator.clipboard.writeText(inviteLink)
    toast('Invite link copied to clipboard')
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
          Authorization: `Bearer ${access_token}`,
        },
      });
      setIsLoading(false)
      const data = await res.json();
      setUsers(data.data)

    } catch (error) {
      console.error('Error get leader board:', error);
    }
  };


  return (
    <div className=' flex flex-col w-full h-full'>
      <div className=' flex flex-col w-full h-full bg-[#ffffff] bg-opacity-[0.03] rounded-[48px] shadow-referralLinkBg'>
        <div className="relative -full  h-[65px] mt-5">
          <Image className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" src='./leaderboard.svg' width={177} height={55} alt="" />
          <h1 className=' relative text-[#22FFF4] shadow-sm font-bold text-[28px] text-center py-[4px] z-100'>Leaderboard</h1>
        </div>

        <div className=' grow w-full overflow-auto px-7 '

        >
          {isLoading && (<div className="w-full flex items-center justify-center">{spinner}</div>)}
          {users?.map((user, index) => {
            return (
              < div key={index} className=" w-full flex h-[20px] my-1 justify-between">
                <div className="w-40 flex ">
                  <p className="w-12 ml-5 text-[#6580D8] font-outfit font-semibold  size=[19px]">{index + 1}</p>
                  <p className="text-[#999999] font-sans text-[14px]">{user.firstName}</p>
                  <p className=" ml-1 text-[#999999] font-sans text-[14px]">{user.lastName}</p>
                </div>


                <p className="text-white font-sans font-normal text-[15px]">{user.point}</p>

              </div>
            )
          })}
        </div>
      </div>
      <Button onClick={handleCoppyLink} className='flex justify-between bg-[#181818] bg-opacity-[0.18] shadow-referralLink rounded-full h-[48px]  mt-[22px] mx-9'>
        <p className="text-white text-[12px]">REFERRAL LINKS</p>
        <Image src='./codeReferral.svg' width={24} height={24} alt="" />
      </Button>
      {/* <div className='bg-[#181818] bg-opacity-[0.18] shadow-referralLink rounded-full h-[42px]  mt-[22px] mx-[40px]'>
        <p>{`${INVITE_URL}?startapp=${user?.telegramId}`}</p>
      </div> */}
    </div>
  )
}
