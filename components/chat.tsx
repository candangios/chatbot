'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Message, Session, UserData } from '@/lib/types'
import { usePathname, useRouter } from 'next/navigation'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'
import WebApp from '@twa-dev/sdk'
import { PromptForm } from './prompt-form'
import { ButtonScrollToBottom } from './button-scroll-to-bottom'

import { Button } from './ui/button'
import { useAuth } from '@/lib/hooks/use-auth'
import Image from 'next/image'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: Session
}

export function Chat({ id, className, session }: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()
  const { user, auth, access_token } = useAuth()
  // const [_, setNewChatId] = useLocalStorage('newChatId', id)

  useEffect(() => {
    if (session?.user) {
      if (!path.includes('chat') && messages.length === 1) {
        window.history.replaceState({}, '', `/chat/${id}`)
      }
    }
  }, [id, path, session?.user, messages])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

  // useEffect(() => {
  //   setNewChatId(id)
  // })

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  const authenticateUser = async () => {
    const WebApp = (await import('@twa-dev/sdk')).default
    WebApp.ready()
    const initData = WebApp.initData
    if (initData) {
      try {
        auth(initData, WebApp.initDataUnsafe.start_param)
      } catch (e) {
        if (typeof e === 'string') {
          toast(e) // works, `e` narrowed to string
        } else if (e instanceof Error) {
          toast(e.message)
        }
      }
    } else {
      toast('Please use webview in telegram.')
      if (window.location.hostname == "localhost") {
        auth('user=%7B%22id%22%3A692302440%2C%22first_name%22%3A%22ToTheMoon%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22CanDang1707%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-96176797667967538&chat_type=private&auth_date=1728445979&hash=f43ecb78146611c03ca188763547bcb03c75a98814058c3b516a6ee600b6e8d0')
        // auth('user=%7B%22id%22%3A7318407034%2C%22first_name%22%3A%22Anh%22%2C%22last_name%22%3A%22Ki%E1%BB%81u%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=5219902035523301637&chat_type=private&auth_date=1728441931&hash=b6d82c55099970f3a98c829d228946be54876ee1c26f108a925a04282a386b75', '692302440')      
      }
    }
  }


  return (
    <div className='relative mx-[25px] pt-[16px] flex h-[calc(100vh_-_86px)] '>

      <div className="flex flex-col w-full bg-gradient-to-b from-[#F5F5F5] to-[#E5E5E5] rounded-[48px]">
        <h1 className="w-full h-[75px] text-[#393E46] font-outfit font-bold text-[28px] text-center pt-[20px]">
          MachinaFi
        </h1>
        <div className="w-full flex-grow z-0 overflow-y-scroll" ref={scrollRef}>
          <ButtonScrollToBottom
            isAtBottom={isAtBottom}
            scrollToBottom={scrollToBottom}
          />

          <div className={cn('', className)} ref={messagesRef}>
            {messages.length ? (
              <ChatList messages={messages} isShared={false} session={session} />
            ) : (
              <EmptyScreen />
            )}
            <div className="w-full h-px" ref={visibilityRef} />
          </div>
        </div>
        <div>
          {messages.length > 0 && (<div className="pl-[50px] mt-[2px] mb-[10px] text-[8px] pr-[50px]">{messages[messages.length - 1].assistantVoteInfo}</div>)}
        </div>
        <div className="px-6 w-full">
          {user ? (
            <ChatPanel
              id={id}
              input={input}
              setInput={setInput}
              isAtBottom={isAtBottom}
              scrollToBottom={scrollToBottom}
            />
          ) : (
            <>
              <Button
                onClick={authenticateUser}
                className="flex justify-between bg-[#606069] w-full shadow-inputText  rounded-full h-[42px]  mt-[22px] mb-2"
              >
                <p className="text-white w-full text-center text-[12px]">Join now</p>
              </Button>
            </>
          )}
        </div>
      </div>
      <Image className='absolute top-[20px] right-[-75px] z-10' src='/images/EDITION.png' width={152} height={160} alt='' />
    </div>

  )
}
