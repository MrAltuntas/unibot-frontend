'use client'
import { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import PersonIcon from '@mui/icons-material/Person'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import CircularProgress from '@mui/material/CircularProgress'

interface ChatMessage {
  userId: string
  text: string
  username: string
  timestamp: number
  type: 'user' | 'bot' | 'system'
  messageId: string
  botId?: string
  replyTo?: string
}

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false)
  const [message, setMessage] = useState('')
  const [chatLog, setChatLog] = useState<ChatMessage[]>([])
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  const socketRef = useRef<Socket | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const userId = useRef<string>(
    `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  )
  const username = useRef<string>('Student')

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatLog, isBotTyping])

  // Initialize socket connection
  useEffect(() => {
    if (showChat && !socketRef.current) {
      initializeSocket()
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [showChat])

  const initializeSocket = () => {
    setIsConnecting(true)
    setConnectionError(null)

    // Initialize socket connection
    socketRef.current = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8000',
      {
        transports: ['websocket', 'polling'],
      },
    )

    const socket = socketRef.current

    // Connection successful
    socket.on('connect', () => {
      console.log('🔌 Connected to chatbot server')
      setIsConnected(true)
      setIsConnecting(false)

      // Join chatbot session
      socket.emit('join_chatbot', {
        userId: userId.current,
        username: username.current,
      })
    })

    // Chatbot connected confirmation
    socket.on('chatbot_connected', (data) => {
      console.log('🤖 Chatbot session established:', data)
    })

    // Receive bot messages
    socket.on('chatbot_message', (messageData: ChatMessage) => {
      setChatLog((prev) => [...prev, messageData])
    })

    // Message sent confirmation
    socket.on('message_sent', (messageData: ChatMessage) => {
      setChatLog((prev) => [...prev, messageData])
    })

    // Bot typing indicator
    socket.on('bot_typing', (data: { typing: boolean }) => {
      setIsBotTyping(data.typing)
    })

    // Error handling
    socket.on('chatbot_error', (error) => {
      console.error('Chatbot error:', error)
      setConnectionError(error.message)
      setIsBotTyping(false)
    })

    // Connection error
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error)
      setIsConnected(false)
      setIsConnecting(false)
      setConnectionError('Failed to connect to chatbot. Please try again.')
    })

    // Disconnection
    socket.on('disconnect', (reason) => {
      console.log('🔌 Disconnected from chatbot:', reason)
      setIsConnected(false)
      setIsConnecting(false)
    })

    // Pong response for health check
    socket.on('pong', (data) => {
      console.log('📡 Ping response:', data)
    })
  }

  const handleSendMessage = () => {
    if (message.trim() === '' || !socketRef.current || !isConnected) return

    // Send message via socket
    socketRef.current.emit('user_message', {
      message: message.trim(),
      userId: userId.current,
    })

    setMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const pingServer = () => {
    if (socketRef.current) {
      socketRef.current.emit('ping', { clientTime: Date.now() })
    }
  }

  return (
    <>
      {/* Typing dots animation */}
      <style jsx>{`
        @keyframes typingDots {
          0% {
            content: 'UniBot is typing.';
          }
          33% {
            content: 'UniBot is typing..';
          }
          66% {
            content: 'UniBot is typing...';
          }
          100% {
            content: 'UniBot is typing.';
          }
        }

        .typing-dots::after {
          display: inline-block;
          content: 'UniBot is typing.';
          animation: typingDots 1s steps(3, end) infinite;
        }
      `}</style>

      {/* Chatbot trigger icon */}
      <div
        onClick={() => setShowChat(!showChat)}
        className="fixed right-6 bottom-6 w-14 h-14 flex items-center justify-center shadow-lg hover:cursor-pointer bg-gradient-to-br from-blue-500 to-purple-600 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 z-50"
      >
        <SmartToyIcon style={{ fontSize: '28px', color: 'white' }} />
        {!isConnected && showChat && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
        )}
        {isConnected && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        )}
      </div>

      {showChat && (
        <div className="fixed right-6 bottom-24 shadow-2xl h-[500px] w-[400px] bg-white rounded-2xl border border-gray-200 overflow-hidden z-50">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <SmartToyIcon style={{ fontSize: '20px' }} />
                </div>
                <div>
                  <h3 className="font-semibold">UniBot</h3>
                  <p className="text-xs opacity-90">
                    {isConnecting
                      ? 'Connecting...'
                      : isConnected
                        ? 'Online'
                        : 'Offline'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <CloseIcon style={{ fontSize: '20px' }} />
              </button>
            </div>

            {/* Connection Status */}
            {connectionError && (
              <div className="bg-red-50 border-l-4 border-red-400 p-3">
                <p className="text-red-700 text-sm">{connectionError}</p>
                <button
                  onClick={initializeSocket}
                  className="text-red-600 underline text-sm mt-1"
                >
                  Retry Connection
                </button>
              </div>
            )}

            {/* Chat Messages */}
            <div
              ref={chatContainerRef}
              className="flex flex-col flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50"
            >
              {isConnecting && (
                <div className="flex items-center justify-center p-4">
                  <CircularProgress size={24} />
                  <span className="ml-2 text-gray-600">
                    Connecting to UniBot...
                  </span>
                </div>
              )}

              {chatLog.map((msg, index) => (
                <div
                  key={msg.messageId || index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.type === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <SmartToyIcon
                        style={{ fontSize: '16px', color: 'white' }}
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm'
                        : 'bg-white border border-gray-200 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {msg.text}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.type === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {msg.type === 'user' && (
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                      <PersonIcon
                        style={{ fontSize: '16px', color: 'white' }}
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* Bot typing indicator */}
              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-2">
                    <SmartToyIcon
                      style={{ fontSize: '16px', color: 'white' }}
                    />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm p-3">
                    <p className="text-gray-500 text-sm typing-dots"></p>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:border-blue-500"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={!isConnected}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!isConnected || message.trim() === ''}
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
                >
                  <SendIcon style={{ fontSize: '16px' }} />
                </button>
              </div>

              {/* Debug controls (remove in production) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={pingServer}
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    Ping
                  </button>
                  <span className="text-xs text-gray-500">
                    Status: {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot
