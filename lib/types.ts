import { CoreMessage } from 'ai'

export type Message = CoreMessage & {
  id: string
  status?: ReactionStatusPromptAnswer
}

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
    error: string
  }
>

export interface Session {
  user: {
    id: string
    email: string
  }
}

export interface AuthResult {
  type: string
  message: string
}

export interface User extends Record<string, any> {
  id: string
  email: string
  password: string
  salt: string
}

// tele user
export interface UserData {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code: string
  is_premeum?: boolean
}

export enum ReactionStatusPromptAnswer {
  Normal = 0,
  ThumbUp = 1,
  ThumbDown = 2,

}
