"use client"

import { useEffect } from 'react'
import { XMarkIcon, ChatBubbleLeftRightIcon, CheckCircleIcon, TagIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { useStore, mockUsers } from '@/store/useStore'

export default function NotificationToast() {
  const { notifications, markNotificationAsRead, clearNotification, toggleChat } = useStore()
  
  // Auto-dismiss notifications after 5 seconds
  useEffect(() => {
    notifications.forEach(notification => {
      if (!notification.read) {
        const timer = setTimeout(() => {
          markNotificationAsRead(notification.id)
          setTimeout(() => {
            clearNotification(notification.id)
          }, 1000)
        }, 5000)
        
        return () => clearTimeout(timer)
      }
    })
  }, [notifications, markNotificationAsRead, clearNotification])
  
  const handleNotificationClick = (notification: typeof notifications[0]) => {
    if (notification.threadId) {
      toggleChat(notification.threadId)
    }
    markNotificationAsRead(notification.id)
    setTimeout(() => {
      clearNotification(notification.id)
    }, 300)
  }
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
      case 'response':
        return <ChatBubbleLeftRightIcon className="h-5 w-5 text-maroon-600" />
      case 'sold':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />
      case 'price_drop':
        return <TagIcon className="h-5 w-5 text-purple-600" />
      default:
        return <ExclamationCircleIcon className="h-5 w-5 text-gray-600" />
    }
  }
  
  // Only show unread notifications
  const visibleNotifications = notifications.filter(n => !n.read).slice(0, 3)
  
  return (
    <div className="fixed top-20 right-4 z-50 space-y-3">
      <AnimatePresence>
        {visibleNotifications.map((notification) => {
          const user = notification.userId ? mockUsers[notification.userId] : null
          
          return (
            <motion.div
              key={notification.id}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start gap-3">
                {user ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatTimeAgo(notification.timestamp)}
                  </p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    markNotificationAsRead(notification.id)
                    clearNotification(notification.id)
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <XMarkIcon className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              
              {notification.type === 'message' && (
                <div className="mt-3 pt-3 border-t">
                  <span className="text-xs text-maroon-600 font-medium">
                    Click to open chat →
                  </span>
                </div>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

function formatTimeAgo(timestamp: Date | string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  
  if (diffSeconds < 60) return 'Just now'
  const diffMinutes = Math.floor(diffSeconds / 60)
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}