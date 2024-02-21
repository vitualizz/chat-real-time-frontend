import { type FC } from 'react'
import { type Chat } from '../types'

interface ChatListProps {
  chats: Chat[]
  onItemClick: (id: number) => void
  currentUserId: number
}

const ChatList: FC<ChatListProps> = ({ chats, onItemClick, currentUserId }) => {
  const filteredChats = chats.filter((chat) => chat.userId !== currentUserId)
  return (
    <div className='bg-white p-4 rounded-md shadow-md'>
      <div className='bg-gray-700 text-white p-4'>
        <h1 className='text-lg font-semibold'>Chats</h1>
      </div>
      <ul className='mt-5'>
        {filteredChats.map((chat: Chat) => (
          <li
            className='cursor-pointer bg-gray-200 hover:bg-gray-300 transition duration-200 rounded-md mb-2'
            key={chat.id}
            onClick={() => { onItemClick(chat.id) }}
          >
            <div className='p-4'>
              <div className='text-lg font-semibold'>{chat.username}</div>
              <div className='text-sm text-gray-500'>{chat.lastMessage}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatList
