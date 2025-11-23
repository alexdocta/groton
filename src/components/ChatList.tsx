"use client"

import { useState } from 'react'
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { useStore } from '@/store/useStore'

interface ChatListProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatList({ isOpen, onClose }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const { messageThreads, toggleChat, markAsRead } = useStore()
  
  const filteredThreads = messageThreads.filter(thread => {
    const otherUser = thread.participants.find(p => p.id !== 'current-user')
    return otherUser?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           thread.product?.name.toLowerCase().includes(searchQuery.toLowerCase())
  })
  
  const sortedThreads = [...filteredThreads].sort((a, b) => 
    new Date(b.lastMessage).getTime() - new Date(a.lastMessage).getTime()
  )
  
  const handleOpenChat = (threadId: string) => {
    markAsRead(threadId)
    toggleChat(threadId)
    onClose()
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-40"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {sortedThreads.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-gray-900 font-medium mb-1">No messages yet</h3>
                    <p className="text-sm text-gray-500">Start a conversation by messaging a seller</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {sortedThreads.map(thread => {
                      const otherUser = thread.participants.find(p => p.id !== 'current-user')
                      if (!otherUser) return null
                      
                      const lastMessage = thread.messages[thread.messages.length - 1]
                      const isUnread = thread.unreadCount > 0
                      
                      return (
                        <button
                          key={thread.id}
                          onClick={() => handleOpenChat(thread.id)}
                          className="w-full p-4 hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="flex gap-3">
                            <div className="relative flex-shrink-0">
                              <Image
                                src={otherUser.avatar}
                                alt={otherUser.name}
                                width={48}
                                height={48}
                                className="rounded-full"
                              />
                              {otherUser.verified && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-1">
                                <h3 className={`font-medium text-gray-900 ${isUnread ? 'font-semibold' : ''}`}>
                                  {otherUser.name}
                                </h3>
                                <span className="text-xs text-gray-500">
                                  {formatTime(lastMessage.timestamp)}
                                </span>
                              </div>
                              
                              {thread.product && (
                                <div className="text-xs text-gray-500 mb-1">
                                  Re: {thread.product.name}
                                </div>
                              )}
                              
                              <p className={`text-sm truncate ${isUnread ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                                {lastMessage.senderId === 'current-user' && 'You: '}
                                {lastMessage.text}
                              </p>
                              
                              {isUnread && (
                                <div className="mt-1">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-maroon-100 text-maroon-800">
                                    {thread.unreadCount} new
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function formatTime(timestamp: Date | string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  
  if (diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    if (diffMinutes < 1) return 'Just now'
    return `${diffMinutes}m ago`
  }
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffHours < 48) return 'Yesterday'
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}