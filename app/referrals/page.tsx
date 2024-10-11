'use client'

import { IconLeaderboard } from "@/components/ui/icons"
import { BASE_URL } from "@/config"
import { useAuth } from "@/lib/hooks/use-auth"
import Image from "next/image"
import { use } from "react"


export default function IndexPage() {
  const { user } = useAuth()
  const INVITE_URL = 'https://t.me/referral_showcase_bot/start'
  const handleCoppyLink = () => {
    const inviteLink = `${INVITE_URL}?startapp=${user?.telegramId}`
    navigator.clipboard.writeText(inviteLink)
    alert('Invite link copied to clipboard')
  }

  // Hàm đăng nhập
  const getLeaderboard = async (token: string): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/telegram/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const responeJson = await res.json();
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

        <div className=' grow w-full overflow-auto '
        >
        </div>
      </div>
      <div className='bg-[#181818] bg-opacity-[0.18] shadow-referralLink rounded-full h-[42px]  mt-[22px] mx-[40px]'>
        <p>{`${INVITE_URL}?startapp=${user?.telegramId}`}</p>
      </div>
    </div>
  )
}
