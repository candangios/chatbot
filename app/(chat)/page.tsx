'use client'
import { cn, nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI, ClientMessage, ServerMessage } from '@/lib/chat/actions'
import * as Tabs from "@radix-ui/react-tabs";
import { ReactionStatusPromptAnswer } from '@/lib/types'
import Referrals from '@/components/custom/referrals';
import Misstion from '@/components/custom/misstion';
import { delay } from 'framer-motion';
import axios from 'axios';
import { BASE_URL } from '@/config';
import { useAuth } from '@/lib/hooks/use-auth';
import { useEffect } from 'react';
import { useActions, useUIState } from 'ai/rsc';
import About from '@/components/custom/about';
import { BotMessage, UserMessage } from '@/components/stocks/message';


export default function IndexPage() {
  const { access_token } = useAuth();
  const [messages, setMessages] = useUIState<typeof AI>()
  const { loadHistoryPrompt } = useActions()


  useEffect(() => {
    async function history(access_token: string) {
      const historys = await loadHistoryPrompt(access_token)
      let historymessages: ClientMessage[] = []

      historys.forEach((element: {
        status: ReactionStatusPromptAnswer | undefined;
        promptContent: string
        systemAnswer: string, promptId: string
      }) => {
        historymessages.push({ id: element.promptId, display: <UserMessage>{element.promptContent}</UserMessage> }, { id: element.promptId, display: <BotMessage promptId={element.promptId} content={element.systemAnswer} status={element.status} /> })

      });
      setMessages(currentMessages => [
        ...currentMessages.concat(historymessages)
      ])

    }
    if (access_token) {
      history(access_token)
    }
  }, [access_token])

  return (
    // <AI>
    <Tabs.Root defaultValue="machinafi" orientation="horizontal">
      <Tabs.Content value="referrals">
        <Referrals />
      </Tabs.Content>
      <Tabs.Content value="machinafi">
        <Chat />
      </Tabs.Content>
      <Tabs.Content value="mission">
        <About />
      </Tabs.Content>

      <div className=' bottom-0 w-full flex justify-center items-center h-[82px] bg-transparent '>
        <Tabs.List defaultValue='machinafi' className='flex flex-row justify-around items-center bg-[#181818]/50  w-full h-[46px] rounded-t-[12px] overflow-hidden'>
          <Tabs.Trigger value="referrals" className=" TabsTrigger" >
            <p
              className=
              'text-[#FFDAFB] font-bold font-outfit text-[14px]'
            >
              Referrals
            </p>
          </Tabs.Trigger>
          <Tabs.Trigger value="machinafi" className="TabsTrigger">
            <p
              className=
              'text-[#FFDAFB]  font-bold font-outfit text-[14px]'
            >
              MachinaFi
            </p>
          </Tabs.Trigger>
          <Tabs.Trigger value="mission" className='TabsTrigger'>
            <p
              className=
              'text-[#FFDAFB] font-bold font-outfit text-[14px]'
            >
              About
            </p>
          </Tabs.Trigger>
        </Tabs.List>
      </div>
    </Tabs.Root>
    // </AI>

    // 
    // <div className="mx-[25px] pt-[20px] ">
    //   <Chat id={id} />
    // </div>
    // <AI initialAIState={[{
    //   id: 'helo1',
    //   role: 'assistant',
    //   reactionStatus: ReactionStatusPromptAnswer.Normal,
    //   content: 'response.data.data.message'
    // }]} >
    //   <div className='flex flex-col w-full h-full'>
    //     <Chat />
    //   </div>
    // </AI >
  )
}
