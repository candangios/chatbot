import { Separator } from '@/components/ui/separator'
import { ClientMessage } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import Link from 'next/link'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export interface ChatList {
  messages: ClientMessage[]
  session?: Session
  isShared: boolean
}

export function ChatList({ messages, session, isShared }: ChatList) {

  if (!messages.length) {
    return null
  }

  return (
    <div className="w-full h-full mx-auto max-w-2xl pl-[15px] ">
      {/* {!isShared && !session ? (
        <>
          <div className="group relative mb-4 flex items-start md:-ml-12">
            <div className="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border shadow-sm">
              <ExclamationTriangleIcon />
            </div>
            <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
              <p className="text-muted-foreground leading-normal">
                Please{' '}
                <Link href="/login" className="underline">
                  log in
                </Link>{' '}
                or{' '}
                <Link href="/signup" className="underline">
                  sign up
                </Link>{' '}
                to save and revisit your chat history!
              </p>
            </div>
          </div>
          <Separator className="my-4" />
        </>
      ) : null} */}

      {messages.map((message, index) => (
        <div key={index}>
          {message.display}
          {index < messages.length - 1 && <div className="h-3" />}
        </div>
      ))}
    </div>
  )
}
