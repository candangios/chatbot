import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 bg-[#E6E6E6] p-8">
        <h1 className="text-lg te font-semibold">
          Welcome to 1Chain.AI Chatbot!
        </h1>
        <p className="leading-normal text-black">

          <ExternalLink href="https://1chain.ai/i">
            1chain.AIs
          </ExternalLink>{' '}
          is a Web3 protocol that simplifies dApp onboarding with AI agents boasting over 99% accuracy. Using a Decentralized AI Fidelity Network (DAFN), it prevents AI hallucinations and ensures precise prompt interpretation. Our goal is to build trust, lower barriers, and drive crypto adoption.
        </p>
      </div>
    </div>
  )
}
