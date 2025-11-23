"use client"

import { useState, useRef, useEffect } from 'react'
import { XMarkIcon, MinusIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { useStore, MessageThread } from '@/store/useStore'

interface ChatWindowProps {
  thread: MessageThread
  position: number // 0, 1, or 2 for positioning multiple windows
}

export default function ChatWindow({ thread, position }: ChatWindowProps) {
  const [message, setMessage] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { sendMessage, markAsRead, closeChat } = useStore()
  const otherUser = thread.participants.find(p => p.id !== 'current-user')
  
  useEffect(() => {
    // Mark messages as read when window is open
    if (!isMinimized) {
      markAsRead(thread.id)
    }
  }, [thread.messages.length, isMinimized, markAsRead, thread.id])
  
  useEffect(() => {
    // Scroll to bottom on new messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [thread.messages])
  
  const handleSend = () => {
    if (message.trim()) {
      sendMessage(thread.id, message.trim())
      setMessage('')
    }
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  
  if (!otherUser) return null
  
  // Position calculation for multiple windows
  const rightOffset = 20 + (position * 340)
  
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 z-50 w-80 sm:w-96"
      style={{ right: `${rightOffset}px` }}
    >
      <div className={`bg-white rounded-t-lg shadow-2xl border border-gray-200 ${isMinimized ? 'h-14' : 'h-[500px]'} flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b bg-maroon-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Image
                src={otherUser.avatar}
                alt={otherUser.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              {otherUser.verified && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <div className="font-medium text-sm">{otherUser.name}</div>
              {thread.isTyping && (
                <div className="text-xs text-maroon-100">typing...</div>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-maroon-700 rounded transition-colors"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => closeChat(thread.id)}
              className="p-1 hover:bg-maroon-700 rounded transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {!isMinimized && (
          <>
            {/* Product Info (if applicable) */}
            {thread.product && (
              <div className="p-2 bg-gray-50 border-b">
                <div className="flex items-center gap-2">
                  <Image
                    src={thread.product.imageSrc}
                    alt={thread.product.name}
                    width={40}
                    height={40}
                    className="rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-900 truncate">
                      {thread.product.name}
                    </div>
                    <div className="text-xs text-gray-500">{thread.product.price}</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {thread.messages.map((msg) => {
                const isSelf = msg.senderId === 'current-user'
                const sender = thread.participants.find(p => p.id === msg.senderId)
                
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[70%] ${isSelf ? 'flex-row-reverse' : ''}`}>
                      {!isSelf && (
                        <Image
                          src={sender?.avatar || ''}
                          alt={sender?.name || ''}
                          width={24}
                          height={24}
                          className="rounded-full max-h-10 min-w-10 flex-shrink-0"
                        />
                      )}
                      <div>
                        <div
                          className={`px-3 py-2 rounded-lg ${
                            isSelf
                              ? 'bg-maroon-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        <div className={`text-xs text-gray-400 mt-1 ${isSelf ? 'text-right' : ''}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              
              {/* Typing Indicator */}
              {thread.isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={otherUser.avatar}
                      alt={otherUser.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <div className="bg-gray-100 px-3 py-2 rounded-lg">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
                />
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="p-2 bg-maroon-600 text-white rounded-lg hover:bg-maroon-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}