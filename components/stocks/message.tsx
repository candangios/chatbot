'use client'

import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { spinner } from './spinner'
import { CodeBlock } from '../ui/codeblock'
import { MemoizedReactMarkdown } from '../markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { StreamableValue } from 'ai/rsc'
import { useStreamableText } from '@/lib/hooks/use-streamable-text'
import Image from 'next/image'

// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex items-start ">
      <div className="flex size-[32px] shrink-0 select-none items-center justify-center rounded-full  bg-background shadow-sm">
        <IconUser />
      </div>
      <div className="flex-1 space-y-2 overflow-hidden pl-2 text-[#0C0D0E] ml-8 py-2">

        {children}
      </div>
    </div>
  )
}

export function BotMessage({
  content,
  className,
  children,

}: {
  content: string | StreamableValue<string>
  className?: string
  children?: React.ReactNode
}) {
  const text = useStreamableText(content)

  return (
    <div className={cn('group relative flex items-start ', className)}>
      <div className="flex size-[32px] shrink-0 select-none items-center justify-center rounded-full  bg-primary text-primary-foreground shadow-sm">
        <Image src='/images/ChatBotAvatar.png' alt='chat bot' width={32} height={32} />
        {/* <IconOpenAI /> */}
      </div>
      <div className='flex flex-col'>
        <div className="ml-4 flex-1 space-y-2 overflow-hidden rounded-md border border-[#CCCCCC] bg-[#E6E6E6] px-5 py-4" >
          <MemoizedReactMarkdown
            className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
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
        <div className='px-5'>
          {children}
        </div>
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
        <Image src='/images/ChatBotAvatar.png' alt='chat bot' width={32} height={32} />
        {/* <IconOpenAI /> */}
      </div>
      <div className="ml-4 h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
        {spinner}
      </div>
    </div>
  )
}
