'use client'
import { useState, useEffect, useRef } from 'react'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import PersonIcon from '@mui/icons-material/Person'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false)
  const [message, setMessage] = useState('')
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', text: 'Hello! How can I help you?' },
  ])
  const [isBotTyping, setIsBotTyping] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (message.trim() === '') return

    const userMsg = { sender: 'user', text: message }
    setChatLog((prev) => [...prev, userMsg])
    setMessage('')
    setIsBotTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botMsg = {
        sender: 'bot',
        text: 'This is a sample message response',
      }
      setChatLog((prev) => [...prev, botMsg])
      setIsBotTyping(false)
    }, 2500)
  }

  // ✅ Scroll to bottom whenever chatLog or typing state changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatLog, isBotTyping])

  return (
    <>
      {/* Typing dots animation */}
      <style jsx>{`
        @keyframes typingDots {
          0% {
            content: 'Typing.';
          }
          33% {
            content: 'Typing..';
          }
          66% {
            content: 'Typing...';
          }
          100% {
            content: 'Typing.';
          }
        }
        .typing-dots::after {
          display: inline-block;
          content: '.';
          animation: typingDots 1s steps(3, end) infinite;
        }
      `}</style>

      <div
        onClick={() => setShowChat(!showChat)}
        className="fixed right-24 bottom-[1rem] w-12 h-12 flex items-center justify-center shadow-lg shadow-black hover:cursor-pointer bg-white rounded-full"
      >
        <SmartToyIcon style={{ fontSize: '36px' }} />
      </div>

      {showChat && (
        <div className="fixed right-24 bottom-[calc(4rem)] p-5 shadow-2xl shadow-black/50 h-[450px] w-[400px] bg-white rounded-md">
          <div className="flex flex-col h-full">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowChat(false)}
              className="absolute top-9 right-8 text-white shadow-2xl hover:text-black"
            >
              <CloseIcon />
            </button>

            {/* CHAT HEADER */}
            <div>
              <h2 className="font-semibold text-lg tracking-wide bg-black border px-3.5 py-3.5 rounded-lg text-white">
                Chat with Unibot
              </h2>
            </div>

            {/* CHAT MESSAGES */}
            <div
              ref={chatContainerRef}
              className="flex flex-col flex-1 p-2 mt-5 overflow-y-auto gap-3"
            >
              {chatLog.map((msg, index) =>
                msg.sender === 'bot' ? (
                  <div key={index} className="flex w-full items-start gap-2">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-black text-white rounded-full">
                      <SmartToyIcon style={{ fontSize: '20px' }} />
                    </div>
                    <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="flex items-start justify-end w-full gap-2"
                  >
                    <div className="bg-blue-100 p-2 rounded-lg max-w-xs">
                      <p className="break-words whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    </div>
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border bg-black text-white rounded-full">
                      <PersonIcon style={{ fontSize: '20px' }} />
                    </div>
                  </div>
                ),
              )}

              {/* BOT TYPING ANIMATION */}
              {isBotTyping && (
                <div className="flex w-full items-start gap-2">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-black text-white rounded-full">
                    <SmartToyIcon style={{ fontSize: '20px' }} />
                  </div>
                  <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                    <p className="text-gray-500 typing-dots"></p>
                  </div>
                </div>
              )}
            </div>

            {/* CHAT INPUT */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                placeholder="Type your message here..."
                className="border border-gray-300 rounded-lg py-2 px-4 w-full text-gray-800"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>
                <SendIcon className="text-black" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot
