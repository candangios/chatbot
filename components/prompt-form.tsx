'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { useActions, useUIState } from 'ai/rsc'

import { UserMessage } from './stocks/message'
import { type AI } from '@/lib/chat/actions'
import { Button } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { useAuth } from '@/lib/hooks/use-auth'

export function PromptForm({
  input,
  setInput,
  onFocusInput
}: {
  input: string
  setInput: (value: string) => void
  onFocusInput: (isFocus: boolean) => void
}) {
  const router = useRouter()
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState<typeof AI>()
  const { access_token } = useAuth()

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault()

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target['message']?.blur()
        }

        const value = input.trim()
        setInput('')
        if (!value) return

        // Optimistically add user message UI
        const promotId = nanoid()
        setMessages(currentMessages => [
          ...currentMessages,
          {
            id: promotId,
            assistantVoteInfo: <></>,
            display: <UserMessage>{value}</UserMessage>
          }
        ])

        // Submit and get response message
        const responseMessage = await submitUserMessage(value, promotId, access_token)
        setMessages(currentMessages => [...currentMessages, responseMessage])
      }}
    >
      <div className=" flex h-[60px] w-full grow flex-row items-center overflow-hidden  ">
        <Input
          ref={inputRef}
          tabIndex={0}
          onKeyDown={() => { onKeyDown }}
          placeholder="Ask me anything."
          className=" w-full h-[42px] resize-none bg-[#606069] font-sans text-[12px] rounded-full   pl-4 py-[1.3rem] focus:outline-none shadow-inputText text-white"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          value={input}
          onFocus={(event) => {
            onFocusInput(true)
          }}
          onBlur={(event) => {
            onFocusInput(false)
          }}


          onChange={e => setInput(e.target.value)}
        />
        <div className="top-[13px]">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                disabled={input === ''}
              >
                <IconArrowElbow />
                <span className="sr-only">Send Question</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send Question</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
