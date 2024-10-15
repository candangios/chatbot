import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'

export default async function IndexPage() {
  const id = nanoid()

  return (
    <div className="mx-[25px] pt-[20px] ">
      <Chat id={id} />
    </div>
    // <AI initialAIState={{ chatId: id, messages: [] }} >
    //   <div className='flex flex-col w-full h-full'>
    //     <Chat id={id} />
    //   </div>
    // </AI >
  )
}
