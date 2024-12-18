import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue,
  useUIState
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'

import {
  spinner,
  BotCard,
  BotMessage,
  SystemMessage,
  Stock,
  Purchase
} from '@/components/stocks'

import { z } from 'zod'
import { EventsSkeleton } from '@/components/stocks/events-skeleton'
import { Events } from '@/components/stocks/events'
import { StocksSkeleton } from '@/components/stocks/stocks-skeleton'
import { Stocks } from '@/components/stocks/stocks'
import { StockSkeleton } from '@/components/stocks/stock-skeleton'
import {
  formatNumber,
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid
} from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { Chat, Message, ReactionStatusPromptAnswer } from '@/lib/types'

import axios from 'axios'
import { BASE_URL } from '@/config'
import { useAuth } from '../hooks/use-auth'

async function confirmPurchase(symbol: string, price: number, amount: number) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  const purchasing = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2">
        Purchasing {amount} ${symbol}...
      </p>
    </div>
  )

  const systemMessage = createStreamableUI(null)

  runAsyncFnWithoutBlocking(async () => {
    await sleep(1000)

    purchasing.update(
      <div className="inline-flex items-start gap-1 md:items-center">
        {spinner}
        <p className="mb-2">
          Purchasing {amount} ${symbol}... working on it...
        </p>
      </div>
    )

    await sleep(1000)

    purchasing.done(
      <div>
        <p className="mb-2">
          You have successfully purchased {amount} ${symbol}. Total cost:{' '}
          {formatNumber(amount * price)}
        </p>
      </div>
    )

    systemMessage.done(
      <SystemMessage>
        You have purchased {amount} shares of {symbol} at ${price}. Total cost ={' '}
        {formatNumber(amount * price)}.
      </SystemMessage>
    )

    // aiState.done({
    //   ...aiState.get(),
    //   messages: [
    //     ...aiState.get().messages,
    //     {
    //       id: nanoid(),
    //       role: 'system',
    //       content: `[User has purchased ${amount} shares of ${symbol} at ${price}. Total cost = ${amount * price
    //         }]`
    //     }
    //   ]
    // })
  })

  return {
    purchasingUI: purchasing.value,
    newMessage: {
      id: nanoid(),
      display: systemMessage.value
    }
  }
}
function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
async function submitUserMessage(content: string, promptId: string, access_token: string) {
  'use server'


  const history = getMutableAIState()
  history.update([...history.get(), {
    id: promptId,
    role: 'user',
    content: content
  }])

  const assistantVoteInfo = createStreamableUI()

  const textStream = createStreamableUI(<SpinnerMessage />)
  runAsyncFnWithoutBlocking(async () => {
    axios
      .post(
        `${BASE_URL}/telegram/prompt`,
        // `${BASE_URL}/telegram/prompt/demo`,
        { message: content, promptId },
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      )
      .then(response => {
        assistantVoteInfo.done(
          <p className=" ">
            This result reached a <span style={{ color: '#0045C6' }}>{Number(response.data.data.accuraty).toFixed(1)}% </span> + consensus from <span style={{ color: '#0045C6' }}>{response.data.data.nodes}</span> nodes running <span style={{ color: '#0045C6' }}>{getRandomArbitrary(5, 14)} LLMs</span>.
          </p>)
        textStream.done(
          <div>
            <BotMessage
              content={response.data.data.message} promptId={promptId} />
          </div>

        )

        history.done([...history.get(), {
          id: promptId,
          role: 'assistant',
          reactionStatus: ReactionStatusPromptAnswer.Normal,
          content: response.data.data.message
        }])

      })
      .catch(error => {
        // Handle the error properly
        let msg = ''
        if (axios.isAxiosError(error)) {
          // Error is an AxiosError
          msg = error.message
          console.error('Axios error occurred:', error.message);

          // Access additional error details
          if (error.response) {
            msg = error.response.data.message
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
          } else if (error.request) {
            msg = error.request
            console.error('No response received:', error.request);
          } else {
            msg = error.message
            console.error('Error setting up the request:', error.message);
          }
        } else {
          // Handle other types of errors (non-Axios errors)
          msg = `${error}`
          console.error('An unexpected error occurred:', error);
        }
        assistantVoteInfo.done()
        textStream.done(
          <BotMessage content={msg}
          >
          </BotMessage >
        )
        history.done([...history.get(), {
          id: promptId,
          role: 'assistant',
          content: msg
        }])

      })
  })
  return {
    id: promptId,
    assistantVoteInfo: assistantVoteInfo.value,
    display: textStream.value
  }

  // let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  // let textNode: undefined | React.ReactNode

  // const result = await streamUI({
  //   model: openai('gpt-3.5-turbo'),
  //   initial: <SpinnerMessage />,
  //   system: `\
  //   You are a stock trading conversation bot and you can help users buy stocks, step by step.
  //   You and the user can discuss stock prices and the user can adjust the amount of stocks they want to buy, or place an order, in the UI.

  //   Messages inside [] means that it's a UI element or a user event. For example:
  //   - "[Price of AAPL = 100]" means that an interface of the stock price of AAPL is shown to the user.
  //   - "[User has changed the amount of AAPL to 10]" means that the user has changed the amount of AAPL to 10 in the UI.

  //   If the user requests purchasing a stock, call \`show_stock_purchase_ui\` to show the purchase UI.
  //   If the user just wants the price, call \`show_stock_price\` to show the price.
  //   If you want to show trending stocks, call \`list_stocks\`.
  //   If you want to show events, call \`get_events\`.
  //   If the user wants to sell stock, or complete another impossible task, respond that you are a demo and cannot do that.

  //   Besides that, you can also chat with users and do some calculations if needed.`,
  //   messages: [
  //     ...aiState.get().messages.map((message: any) => ({
  //       role: message.role,
  //       content: message.content,
  //       name: message.name
  //     }))
  //   ],
  //   text: ({ content, done, delta }) => {
  //     if (!textStream) {
  //       textStream = createStreamableValue('')
  //       textNode = <BotMessage content={textStream.value} />
  //     }

  //     if (done) {
  //       textStream.done()
  //       aiState.done({
  //         ...aiState.get(),
  //         messages: [
  //           ...aiState.get().messages,
  //           {
  //             id: nanoid(),
  //             role: 'assistant',
  //             content
  //           }
  //         ]
  //       })
  //     } else {
  //       textStream.update(delta)
  //     }

  //     return textNode
  //   },
  //   tools: {
  //     listStocks: {
  //       description: 'List three imaginary stocks that are trending.',
  //       parameters: z.object({
  //         stocks: z.array(
  //           z.object({
  //             symbol: z.string().describe('The symbol of the stock'),
  //             price: z.number().describe('The price of the stock'),
  //             delta: z.number().describe('The change in price of the stock')
  //           })
  //         )
  //       }),
  //       generate: async function* ({ stocks }) {
  //         yield (
  //           <BotCard>
  //             <StocksSkeleton />
  //           </BotCard>
  //         )

  //         await sleep(1000)

  //         const toolCallId = nanoid()

  //         aiState.done({
  //           ...aiState.get(),
  //           messages: [
  //             ...aiState.get().messages,
  //             {
  //               id: nanoid(),
  //               role: 'assistant',
  //               content: [
  //                 {
  //                   type: 'tool-call',
  //                   toolName: 'listStocks',
  //                   toolCallId,
  //                   args: { stocks }
  //                 }
  //               ]
  //             },
  //             {
  //               id: nanoid(),
  //               role: 'tool',
  //               content: [
  //                 {
  //                   type: 'tool-result',
  //                   toolName: 'listStocks',
  //                   toolCallId,
  //                   result: stocks
  //                 }
  //               ]
  //             }
  //           ]
  //         })

  //         return (
  //           <BotCard>
  //             <Stocks props={stocks} />
  //           </BotCard>
  //         )
  //       }
  //     },
  //     showStockPrice: {
  //       description:
  //         'Get the current stock price of a given stock or currency. Use this to show the price to the user.',
  //       parameters: z.object({
  //         symbol: z
  //           .string()
  //           .describe(
  //             'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'
  //           ),
  //         price: z.number().describe('The price of the stock.'),
  //         delta: z.number().describe('The change in price of the stock')
  //       }),
  //       generate: async function* ({ symbol, price, delta }) {
  //         yield (
  //           <BotCard>
  //             <StockSkeleton />
  //           </BotCard>
  //         )

  //         await sleep(1000)

  //         const toolCallId = nanoid()

  //         aiState.done({
  //           ...aiState.get(),
  //           messages: [
  //             ...aiState.get().messages,
  //             {
  //               id: nanoid(),
  //               role: 'assistant',
  //               content: [
  //                 {
  //                   type: 'tool-call',
  //                   toolName: 'showStockPrice',
  //                   toolCallId,
  //                   args: { symbol, price, delta }
  //                 }
  //               ]
  //             },
  //             {
  //               id: nanoid(),
  //               role: 'tool',
  //               content: [
  //                 {
  //                   type: 'tool-result',
  //                   toolName: 'showStockPrice',
  //                   toolCallId,
  //                   result: { symbol, price, delta }
  //                 }
  //               ]
  //             }
  //           ]
  //         })

  //         return (
  //           <BotCard>
  //             <Stock props={{ symbol, price, delta }} />
  //           </BotCard>
  //         )
  //       }
  //     },
  //     showStockPurchase: {
  //       description:
  //         'Show price and the UI to purchase a stock or currency. Use this if the user wants to purchase a stock or currency.',
  //       parameters: z.object({
  //         symbol: z
  //           .string()
  //           .describe(
  //             'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'
  //           ),
  //         price: z.number().describe('The price of the stock.'),
  //         numberOfShares: z
  //           .number()
  //           .optional()
  //           .describe(
  //             'The **number of shares** for a stock or currency to purchase. Can be optional if the user did not specify it.'
  //           )
  //       }),
  //       generate: async function* ({ symbol, price, numberOfShares = 100 }) {
  //         const toolCallId = nanoid()

  //         if (numberOfShares <= 0 || numberOfShares > 1000) {
  //           aiState.done({
  //             ...aiState.get(),
  //             messages: [
  //               ...aiState.get().messages,
  //               {
  //                 id: nanoid(),
  //                 role: 'assistant',
  //                 content: [
  //                   {
  //                     type: 'tool-call',
  //                     toolName: 'showStockPurchase',
  //                     toolCallId,
  //                     args: { symbol, price, numberOfShares }
  //                   }
  //                 ]
  //               },
  //               {
  //                 id: nanoid(),
  //                 role: 'tool',
  //                 content: [
  //                   {
  //                     type: 'tool-result',
  //                     toolName: 'showStockPurchase',
  //                     toolCallId,
  //                     result: {
  //                       symbol,
  //                       price,
  //                       numberOfShares,
  //                       status: 'expired'
  //                     }
  //                   }
  //                 ]
  //               },
  //               {
  //                 id: nanoid(),
  //                 role: 'system',
  //                 content: `[User has selected an invalid amount]`
  //               }
  //             ]
  //           })

  //           return <BotMessage content={'Invalid amount'} />
  //         } else {
  //           aiState.done({
  //             ...aiState.get(),
  //             messages: [
  //               ...aiState.get().messages,
  //               {
  //                 id: nanoid(),
  //                 role: 'assistant',
  //                 content: [
  //                   {
  //                     type: 'tool-call',
  //                     toolName: 'showStockPurchase',
  //                     toolCallId,
  //                     args: { symbol, price, numberOfShares }
  //                   }
  //                 ]
  //               },
  //               {
  //                 id: nanoid(),
  //                 role: 'tool',
  //                 content: [
  //                   {
  //                     type: 'tool-result',
  //                     toolName: 'showStockPurchase',
  //                     toolCallId,
  //                     result: {
  //                       symbol,
  //                       price,
  //                       numberOfShares
  //                     }
  //                   }
  //                 ]
  //               }
  //             ]
  //           })

  //           return (
  //             <BotCard>
  //               <Purchase
  //                 props={{
  //                   numberOfShares,
  //                   symbol,
  //                   price: +price,
  //                   status: 'requires_action'
  //                 }}
  //               />
  //             </BotCard>
  //           )
  //         }
  //       }
  //     },
  //     getEvents: {
  //       description:
  //         'List funny imaginary events between user highlighted dates that describe stock activity.',
  //       parameters: z.object({
  //         events: z.array(
  //           z.object({
  //             date: z
  //               .string()
  //               .describe('The date of the event, in ISO-8601 format'),
  //             headline: z.string().describe('The headline of the event'),
  //             description: z.string().describe('The description of the event')
  //           })
  //         )
  //       }),
  //       generate: async function* ({ events }) {
  //         yield (
  //           <BotCard>
  //             <EventsSkeleton />
  //           </BotCard>
  //         )

  //         await sleep(1000)

  //         const toolCallId = nanoid()

  //         aiState.done({
  //           ...aiState.get(),
  //           messages: [
  //             ...aiState.get().messages,
  //             {
  //               id: nanoid(),
  //               role: 'assistant',
  //               content: [
  //                 {
  //                   type: 'tool-call',
  //                   toolName: 'getEvents',
  //                   toolCallId,
  //                   args: { events }
  //                 }
  //               ]
  //             },
  //             {
  //               id: nanoid(),
  //               role: 'tool',
  //               content: [
  //                 {
  //                   type: 'tool-result',
  //                   toolName: 'getEvents',
  //                   toolCallId,
  //                   result: events
  //                 }
  //               ]
  //             }
  //           ]
  //         })

  //         return (
  //           <BotCard>
  //             <Events props={events} />
  //           </BotCard>
  //         )
  //       }
  //     }
  //   }
  // })

  // return {
  //   id: nanoid(),
  //   display: result.value
  // }
}
async function submitUserReaction(promptId: string, n_status: ReactionStatusPromptAnswer, access_token: string) {
  'use server'
  try {
    const res = await axios.post(
      `${BASE_URL}/telegram/prompt/status`,
      { promptId, status: n_status },
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    const aiState = getMutableAIState<typeof AI>()
    const n_messages = aiState.get()
    console.log(n_messages.length)
    for (let index = 0; index < n_messages.length; index++) {
      const element = n_messages[index];
      if (element.id === promptId && element.role == 'assistant') {
        element.reactionStatus = n_status
        break;
      }
    }
    aiState.done(
      n_messages
    )

    return true

  } catch (error) {
    throw error
  }


}

export type ServerMessage = {
  role: 'user' | 'assistant' | 'system';
  id: string
  reactionStatus?: ReactionStatusPromptAnswer
  content: string;
}

export type ClientMessage = {
  id: string
  assistantVoteInfo?: React.ReactNode
  display: React.ReactNode
}

async function loadHistoryPrompt(access_token: string) {

  'use server'

  try {
    const respone = await axios.get(
      `${BASE_URL}/telegram/prompts`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )


    return respone.data.data.reverse()

  } catch (error) {
    console.log(error)
  }


}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    submitUserMessage,
    submitUserReaction,
    confirmPurchase,
    loadHistoryPrompt
  },
  initialUIState: [],
  initialAIState: [],
  // onGetUIState: async () => {
  //   'use server'


  //   // const historyFromDB = await loadChatFromDB();
  //   const historyFromApp = getAIState();
  //   console.log(historyFromApp)

  //   // if (historyFromApp.length !== historyFromApp.length) {
  //   // return historyFromApp.map((item: { content: any }) => { item.content })
  //   return getUIStateFromAIState(historyFromApp)

  //   // }

  // },
  //   onSetAIState: async ({ state, done }) => {
  //     'use server'
  //     console.log('canlog' + !done)
  //     if (!done) return

  //     console.log('canlog' + state)

  //     // const session = await auth()
  //     // if (!session || !session.user) return

  //     // const { chatId, messages } = state

  //     // const createdAt = new Date()
  //     // const userId = session.user.id as string
  //     // const path = `/chat/${chatId}`

  //     // const firstMessageContent = messages[0].content as string
  //     // const title = firstMessageContent.substring(0, 100)

  //     // const chat: Chat = {
  //     //   id: chatId,
  //     //   title,
  //     //   userId,
  //     //   createdAt,
  //     //   messages,
  //     //   path
  //     // }

  //     // await saveChat(chat)
  //   }
})

// export const getUIStateFromAIState = (aiState: ServerMessage[]): ClientMessage[] => {
//   const a = aiState.map((message) => {
//     return ({
//       id: message.id,
//       display:
//         message.role === 'user' ? (
//           <UserMessage>{message.content as string}</UserMessage>
//         ) : message.role === 'assistant' &&
//           typeof message.content === 'string' ? (
//           <div className="flex flex-col">
//             <BotMessage content={message.content} />
//           </div>
//         ) : null
//     })
//   })
//   return a

// }
