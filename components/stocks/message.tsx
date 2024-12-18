'use client'

import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { spinner } from './spinner'
import { CodeBlock } from '../ui/codeblock'
import { MemoizedReactMarkdown } from '../markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { getMutableAIState, StreamableValue, useActions, useAIState } from 'ai/rsc'
import { useStreamableText } from '@/lib/hooks/use-streamable-text'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Message, ReactionStatusPromptAnswer } from '@/lib/types'
import { useAuth } from '@/lib/hooks/use-auth'
import { useEffect, useState } from 'react'
import { ServerMessage } from '@/lib/chat/actions'


// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex items-start  pr-[98px] ">
      <div className="flex size-[32px] shrink-0 select-none items-center justify-center rounded-full  bg-background shadow-sm">
        <IconUser />
      </div>
      <div className="flex-1 space-y-2 overflow-hidden pl-2 text-[12px] ml-4 py-2">
        {children}
      </div>
    </div>
  )
}

export function BotMessage({
  content,
  className,
  children,
  promptId,
  status
}: {
  content: string | StreamableValue<string>
  className?: string
  children?: React.ReactNode,
  promptId?: string,
  status?: ReactionStatusPromptAnswer
}) {
  const { access_token } = useAuth()
  const [aiState] = useAIState()
  const { submitUserReaction } = useActions()
  const [curStatus, setCurStatus] = useState<ReactionStatusPromptAnswer | null>(status ?? null)
  const text = useStreamableText(content)
  useEffect(() => {
    const messages: ServerMessage[] = aiState

    const message = messages.find((item) => item.id === promptId && item.role === 'assistant')

    if (message && message.reactionStatus !== null) {

      setCurStatus(message.reactionStatus!)
    }
  }, [promptId])

  async function onChangedAnswerStatus(n_status: ReactionStatusPromptAnswer) {
    try {
      await submitUserReaction(promptId, n_status, access_token)
      setCurStatus(n_status)
    } catch (error) {
      console.error('Error saving referral', error)
    }
  }

  return (
    <div className={cn('group relative flex items-start  ', className)}>
      <div className="flex size-[32px] shrink-0 select-none items-center justify-center rounded-full  bg-primary text-primary-foreground shadow-sm">
        <Image
          src="/images/ChatBotAvatar.png"
          alt="chat bot"
          width={32}
          height={32}
        />
      </div>
      <div className="flex flex-row w-full">
        <div className="ml-[4px] flex-1  space-y-2 overflow-hidden rounded-[5px] border border-[#CCCCCC] bg-[#E6E6E6] px-[20px] py-[15px]">

          <MemoizedReactMarkdown
            className="prose break-words text-[12px] dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 "
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              p({ children }) {
                return <p className="mb-2 last:mb-0  text-[#0C0D0E] ">{children}</p>
              },
              code({ node, inline, className, children, ...props }) {
                if (children.length) {
                  if (children[0] == '▍') {
                    return (
                      <span className="mt-1 animate-pulse cursor-default">▍</span>
                    )
                  }

                  children[0] = (children[0] as string).replace('`▍`', '▍')
                }

                const match = /language-(\w+)/.exec(className || '')

                if (inline) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }

                return (
                  <CodeBlock
                    key={Math.random()}
                    language={(match && match[1]) || ''}
                    value={String(children).replace(/\n$/, '')}
                    {...props}
                  />
                )
              }
            }}
          >
            {text}
          </MemoizedReactMarkdown>
        </div>
        <div className='flex ml-[5px] mr-[20px] items-center justify-center'>
          {curStatus == ReactionStatusPromptAnswer.Normal && (
            <div className='flex gap-[5px] flex-row'>
              <Button size='fit' variant='ghost' onClick={() => onChangedAnswerStatus(ReactionStatusPromptAnswer.ThumbUp)}>
                <Image
                  src="./ThumbUp.svg"
                  width={20}
                  height={20}
                  priority={false}
                  alt=""
                />
              </Button>
              <Button size='fit' variant='ghost' onClick={() => onChangedAnswerStatus(ReactionStatusPromptAnswer.ThumbDown)}>
                <Image
                  src="./ThumbDown.svg"
                  width={20}
                  height={20}
                  priority={false}
                  alt=""
                />
              </Button>
            </div>
          )
          }
          {
            curStatus == ReactionStatusPromptAnswer.ThumbUp && (<Image
              src="./SelectedThumbUp.svg"
              width={20}
              height={20}
              priority={false}
              alt=""
            />)
          }
          {
            curStatus == ReactionStatusPromptAnswer.ThumbDown && (<Image
              src="./SelectedThumbDown.svg"
              width={20}
              height={20}
              priority={false}
              alt=""
            />)
          }

        </div>
        {/* {children} */}
      </div>
    </div>
  )
}

export function BotCard({
  children,
  showAvatar = true
}: {
  children: React.ReactNode
  showAvatar?: boolean
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          'flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm',
          !showAvatar && 'invisible'
        )}
      >
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1 pl-2">{children}</div>
    </div>
  )
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'
      }
    >
      <div className={'max-w-[600px] flex-initial p-2'}>{children}</div>
    </div>
  )
}

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start ">
      <div className="flex size-[32px] shrink-0 select-none items-center justify-center rounded-full  bg-primary text-primary-foreground shadow-sm">
        <Image
          src="/images/ChatBotAvatar.png"
          alt="chat bot"
          width={32}
          height={32}
        />
        {/* <IconOpenAI /> */}
      </div>
      <div className="ml-4 h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
        {spinner}
      </div>
    </div>
  )
}


