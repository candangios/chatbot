import * as React from 'react'
import { shareChat } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconShare } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { ChatShareDialog } from '@/components/chat-share-dialog'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import type { AI, ClientMessage } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'
import { useAuth } from '@/lib/hooks/use-auth'

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) {
  const [aiState] = useAIState()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const { access_token } = useAuth()
  const [isShowExample, setIsShowExample] = React.useState(false)

  const exampleMessages = [
    {
      content: 'What is the Bitcoin?',
    },
    {
      content: 'Will SOL reach 200$ at the end of 2024?',
    },
    {
      content: 'What coin should i buy for 2025?',
    },

  ]

  return (
    <div >
      <div className=" flex  w-full  flex-wrap gap-[5px] items-center justify-center overflow-hidden ">
        {(messages.length == 0) &&
          exampleMessages.map((example, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-zinc-50 px-4 h-[14px] rounded-[1px] bg-[#D9D9D9]`}
              onClick={async () => {

                const promptId = nanoid()

                setMessages(currentMessages => [
                  ...currentMessages,
                  {
                    id: promptId,
                    display: <UserMessage>{example.content}</UserMessage>
                  }
                ])

                const responseMessage = await submitUserMessage(
                  example.content, promptId, access_token
                )

                setMessages(currentMessages => [
                  ...currentMessages,
                  responseMessage
                ])
              }}
            >
              <div className="text-[10px] font-sans text-center">{example.content}</div>

            </div>
          ))}
      </div>
      <PromptForm input={input} setInput={setInput} onFocusInput={(isFocus) => {
        // setIsShowExample(isFocus)
      }} />
    </div>
  )
}
