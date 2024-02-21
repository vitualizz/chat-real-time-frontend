import { type FC, useState, useEffect, useCallback } from 'react'
import ChatList from './components/ChatList'
import ChatBox from './components/ChatBox'
import type { Chat, Message } from './types'
import useWebSocket from 'react-use-websocket'

const WS_URL = import.meta.env.VITE_WEBSOCKET_URL // 'wss://xxxxxx.region.amazonaws.com/stage'

const App: FC = () => {
  const [socketUrl, setSocketUrl] = useState(WS_URL + '/?userId=1')
  const { sendJsonMessage, lastMessage } = useWebSocket(socketUrl, {
    onOpen: () => { console.log('WebSocket connection opened') },
    onClose: () => { console.log('WebSocket connection closed') },
    onError: (event) => { console.error('WebSocket error:', event) },
    onMessage: (event) => { console.log('WebSocket message:', event.data) },
    heartbeat: false
  })

  const [currentUserId, setCurrentUserId] = useState(1)
  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const [chats] = useState<Chat[]>([
    { id: 1, username: 'Alice', lastMessage: 'Hello', userId: 1 },
    { id: 2, username: 'Bob', lastMessage: 'Hi', userId: 2 },
    { id: 3, username: 'Charlie', lastMessage: 'Hey', userId: 3 }
  ])

  const [messages, setMessages] = useState<Message[]>([])

  const onChatClick = (id: number): void => {
    const chat = chats.find((chat) => chat.id === id)
    if (chat !== undefined) {
      setActiveChat(chat)
    }
  }

  const onSendMessage = useCallback((content: string): void => {
    if (activeChat !== null) {
      const newMessage = {
        action: 'broadcast',
        data: {
          chatId: activeChat.id,
          content,
          currentUserId,
          userIds: [activeChat.userId, currentUserId]
        }
      }
      console.log('Sending message:', newMessage)
      sendJsonMessage(newMessage)
    }
  }, [activeChat, currentUserId, sendJsonMessage])

  const onChangeUser = useCallback((userId: number) => {
    setCurrentUserId(userId)
    setSocketUrl(WS_URL + '/?userId=' + userId)
  }, [])

  useEffect(() => {
    if (lastMessage !== null) {
      const { chatId, content, userId } = JSON.parse(lastMessage.data as string)
      const sender = chats.find((chat) => chat.userId === userId)
      const newMessage = {
        chatId,
        id: Date.now(),
        content,
        createdAt: new Date(),
        senderUsername: sender?.username ?? 'Unknown',
        userId
      }
      setMessages(prev => prev.concat(newMessage))
    }
  }, [chats, lastMessage, currentUserId])

  return (
    <>
      <div className='flex'>
        <div className='w-1/4'>
          <select
            className='w-full p-2'
            value={currentUserId}
            onChange={(event) => { onChangeUser(Number(event.target.value)) }}
          >
            {chats.map((chat) => (
              <option key={chat.id} value={chat.userId}>
                {chat.username}
              </option>
            ))}
          </select>
          <ChatList chats={chats} onItemClick={onChatClick} currentUserId={currentUserId}/>
        </div>
        <div className='w-3/4 p-4'>
          {activeChat === null
            ? (
            <div className='text-center p-8 text-2xl text-gray-500'>
              Select a chat to start messaging
            </div>
              )
            : (
              <ChatBox chats={chats} currentUserId={currentUserId} messages={messages} chat={activeChat} onSendMessage={onSendMessage}/>
              )}
        </div>
      </div>
    </>
  )
}

export default App
