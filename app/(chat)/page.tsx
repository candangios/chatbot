
import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'

export const metadata = {
  title: 'Next.js AI Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()
  // const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()


  return (

    <AI initialAIState={{ chatId: id, messages: [] }} >
      {/* <div className='flex flex-col w-full h-full'> */}
      <Chat id={id} missingKeys={missingKeys} />
      {/* <div className='w-full h-3 bg-white'></div> */}
      {/* </div> */}



    </AI >
  )


}
