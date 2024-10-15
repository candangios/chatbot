import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 bg-[#E6E6E6] p-8">
        <h1 className="text-lg te font-semibold">
          Welcome to MachinaFi Chatbot!
        </h1>
        <p className="leading-normal text-[12px]">
          {/* <ExternalLink href="https://1chain.ai/i">1chain.AIs</ExternalLink> is */}
          MachinaFI Agent Protocol (WAAP) is designed to embed AI assistants into dApps, enabling users to perform complex blockchain tasks through simple chat commands. These AI assistants use Large Language Models (LLMs) to create specialized AI models that can communicate with crypto infrastructures, protocols, and apps to execute tasks easily, securely, and efficiently for new users. These specialized models, known as Large Action Models (LAMs), revolutionize the user experience in the crypto space, making it incredibly straightforward and accessible, thus driving mass crypto adoption.
        </p>
      </div>
    </div>
  )
}
