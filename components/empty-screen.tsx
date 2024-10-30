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
          MachinaFi is the first-ever Web3 AI model, entirely built and owned by the TON community, and brought to life by 1chain.AI. This groundbreaking model gives TON users the unique power to train, engage with, and benefit directly from a decentralized AI—an AI that learns and grows from real community interactions. By participating, users don’t just passively use AI; they actively shape and own a part of the future of decentralized intelligence, with the chance to unlock exclusive rewards. Early adopters will play a vital role in developing MachinaFi’s intelligence and capabilities, potentially gaining even greater benefits as the ecosystem expands.
        </p>
      </div>
    </div>
  )
}
