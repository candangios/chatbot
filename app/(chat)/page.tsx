
import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Next.js AI Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()
  // const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()


  return (

    <AI initialAIState={{ chatId: id, messages: [] }} >
      <div className='flex flex-col w-full h-full'>
        <Chat id={id} missingKeys={missingKeys} />
        <div className='w-full h-[82px] flex justify-around items-center'>
          <Button className='w-32 rounded-full bg-[#6ED4D3] hover:bg-[#22FFF4] drop-shadow-tabButton ' >Referrals</Button>
          <Button className='w-32 rounded-full bg-[#6ED4D3] hover:bg-[#22FFF4] ' >1Chain.AI</Button>
          <Button className='w-32 rounded-full bg-[#6ED4D3] hover:bg-[#22FFF4] ' >Mission</Button>
        </div>
      </div>



    </AI >
  )


}
