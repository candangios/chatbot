'use client'

import { useAuth } from "@/lib/hooks/use-auth"
import { use } from "react"


export default function IndexPage() {
  const { user } = useAuth()
  const INVITE_URL = 'https://t.me/referral_showcase_bot/start'
  const handleCoppyLink = () => {
    const inviteLink = `${INVITE_URL}?startapp=${user?.telegramId}`
    navigator.clipboard.writeText(inviteLink)
    alert('Invite link copied to clipboard')
  }

  return (
    <div className=' flex flex-col w-full h-full'>
      <div className=' flex flex-col w-full h-full bg-[#ffffff] bg-opacity-[0.03] rounded-[48px] shadow-inner'>
        <h1 className='w-full  h-[75px] text-[#22FFF4] shadow-sm font-bold text-[28px] text-center py-6'>Leadboard</h1>
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
