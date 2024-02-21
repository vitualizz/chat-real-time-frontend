import { type FC, useState } from 'react'
import type { Chat, Message } from '../types'

interface ChatBoxProps {
  chat: Chat
  chats: Chat[]
  messages: Message[]
  onSendMessage: (content: string) => void
  currentUserId: number
}

const ChatBox: FC<ChatBoxProps> = ({ chat, chats, currentUserId, messages, onSendMessage }) => {
  const [message, setMessage] = useState('')
  const chatCurrentUser = chats.find((chat) => chat.userId === currentUserId)
  const chatIds = [chat.id, chatCurrentUser?.id]
  const userIds = [chat.userId, currentUserId]
  const filteredMessages = messages.filter((message) => chatIds.includes(message.chatId) && userIds.includes(message.userId))

  return (
    <div className='bg-gray-50 p-4'>
      <h2 className='text-lg font-semibold'>{chat.username}</h2>
      <div className='border rounded-md p-4'>
        <p>{chatIds} - {userIds}</p>
        {filteredMessages.map((message: Message) => (
          <div key={message.id} className='mb-2'>
            <div className='text-sm font-semibold'>{message.senderUsername}</div>
            <div>{message.content} ({message.chatId} = {message.userId})</div>
          </div>
        ))}
      </div>
      <div className='mt-4 flex gap-2 items-center'>
        <input
          type='text'
          className='w-full border rounded-md p-2'
          placeholder='Type a message...'
          value={message}
          onChange={(event) => { setMessage(event.target.value) }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onSendMessage(message)
              setMessage('')
            }
          }}
        />
        <button
          className='mt-2 bg-blue-500 text-white rounded-md p-2'
          onClick={() => { onSendMessage(message) }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatBox
