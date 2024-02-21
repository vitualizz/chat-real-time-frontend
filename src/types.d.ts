export interface Chat {
  id: number
  username: string
  lastMessage: string
  userId: number
}

export interface Message {
  id: number
  chatId: number
  content: string
  createdAt: Date
  senderUsername: string
  userId: number
}
