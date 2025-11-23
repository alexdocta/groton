"use client"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { 
  CheckBadgeIcon, 
  ChatBubbleLeftRightIcon,
  ShareIcon,
  FlagIcon,
  ClockIcon,
  StarIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { mockUsers, useStore } from '@/store/useStore'
import QuickViewModal from '@/components/QuickViewModal'
import ChatList from '@/components/ChatList'

// Mock products for the profile
const userListings = [
  {
    id: 101,
    name: 'AP Biology Textbook',
    price: '$45',
    originalPrice: '$280',
    condition: 'Like New',
    conditionColor: 'bg-green-100 text-green-800',
    imageSrc: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop',
    imageAlt: 'Biology textbook',
    description: 'Latest edition, barely used. All pages intact.',
    postedDate: '2 days ago',
    meetupLocation: 'Science Building'
  },
  {
    id: 102,
    name: 'Mini Fridge',
    price: '$80',
    originalPrice: '$150',
    condition: 'Good',
    conditionColor: 'bg-yellow-100 text-yellow-800',
    imageSrc: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop',
    imageAlt: 'Mini fridge',
    description: 'Perfect for dorm room. Works great!',
    postedDate: '1 week ago',
    meetupLocation: 'Whitman Hall'
  },
  {
    id: 103,
    name: 'Desk Lamp',
    price: '$20',
    originalPrice: '$45',
    condition: 'Like New',
    conditionColor: 'bg-green-100 text-green-800',
    imageSrc: 'https://luxledlights.com/cdn/shop/files/Brooklyn_Desk-USB_Black-Slate_1200x1200_5fda5593-2d09-4f46-9102-bcf0c3e8e5db-01.webp?v=1718132789&width=480',
    imageAlt: 'Desk lamp',
    description: 'LED lamp with adjustable brightness',
    postedDate: '3 days ago',
    meetupLocation: 'Library'
  }
]

// Mock reviews
const reviews = [
  {
    id: 1,
    reviewer: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 5,
    date: '2024-01-15',
    comment: 'Great seller! Item exactly as described and very responsive.',
    type: 'buyer'
  },
  {
    id: 2,
    reviewer: 'Mike Williams',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rating: 5,
    date: '2024-01-10',
    comment: 'Super easy transaction. Met on time and product was perfect!',
    type: 'buyer'
  },
  {
    id: 3,
    reviewer: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 4,
    date: '2024-01-05',
    comment: 'Good communication, fair prices. Would buy from again.',
    type: 'buyer'
  }
]

export default function ProfilePage() {
  const params = useParams()
  const userId = params.id as string
  const [activeTab, setActiveTab] = useState<'listings' | 'reviews' | 'about'>('listings')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [chatListOpen, setChatListOpen] = useState(false)
  
  const { createThread, messageThreads, userListings, deleteListing } = useStore()
  
  // Get user from mock data
  const user = mockUsers[userId] || mockUsers['alex-chen']
  
  // Check if viewing own profile
  const isOwnProfile = userId === 'current-user'
  
  // Calculate total unread messages
  const totalUnread = messageThreads.reduce((sum, thread) => sum + thread.unreadCount, 0)
  
  // Use actual user listings if viewing own profile, otherwise use mock listings  
  const displayListings = isOwnProfile ? (userListings.length > 0 ? userListings : userListings) : userListings
  
  const handleMessage = () => {
    if (isOwnProfile) {
      setChatListOpen(true)
    } else {
      createThread(user.id)
    }
  }
  
  const handleQuickView = (product: any) => {
    setSelectedProduct({ ...product, seller: user.name, dorm: user.dorm })
    setIsQuickViewOpen(true)
  }
  
  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={120}
                  height={120}
                  className="rounded-full"
                />
                {user.verified && (
                  <div className="absolute bottom-2 right-2 bg-white rounded-full p-1">
                    <CheckBadgeIcon className="h-6 w-6 text-maroon-600" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                    <p className="text-gray-600">{user.year} • {user.dorm}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        Responds in {user.responseTime}
                      </span>
                      <span>Member since {new Date(user.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleMessage}
                      className="inline-flex items-center px-4 py-2 bg-maroon-600 text-white rounded-lg hover:bg-maroon-700 transition-colors relative"
                    >
                      <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                      {isOwnProfile ? 'My Chats' : 'Message'}
                      {isOwnProfile && totalUnread > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                          <span className="text-xs text-white font-bold">{totalUnread > 9 ? '9+' : totalUnread}</span>
                        </span>
                      )}
                    </button>
                    {!isOwnProfile && (
                      <>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <ShareIcon className="h-5 w-5 text-gray-600" />
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <FlagIcon className="h-5 w-5 text-gray-600" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{user.stats.itemsSold}</div>
                    <div className="text-sm text-gray-500">Items Sold</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{user.stats.itemsBought}</div>
                    <div className="text-sm text-gray-500">Items Bought</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-bold text-gray-900">{user.stats.avgRating}</span>
                      <StarIconSolid className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="text-sm text-gray-500">{user.stats.totalReviews} Reviews</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-500">Response Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('listings')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'listings'
                      ? 'border-maroon-600 text-maroon-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Active Listings ({userListings.length})
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'reviews'
                      ? 'border-maroon-600 text-maroon-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'about'
                      ? 'border-maroon-600 text-maroon-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  About
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {/* Listings Tab */}
              {activeTab === 'listings' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {displayListings.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group relative"
                    >
                      <div className="relative">
                        <div 
                          className="w-full h-40 sm:h-48 bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
                          onClick={() => handleQuickView(product)}
                        >
                          <Image
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                          />
                        </div>
                        {isOwnProfile ? (
                          <div className="absolute top-2 right-2 flex gap-1">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                // Edit functionality could be added here
                              }}
                              className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                            >
                              <svg className="h-3.5 w-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                if (confirm('Are you sure you want to delete this listing?')) {
                                  deleteListing(product.id)
                                }
                              }}
                              className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                            >
                              <svg className="h-3.5 w-3.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                            <BookmarkIcon className="h-4 w-4 text-gray-600" />
                          </button>
                        )}
                      </div>
                      
                      <div className="mt-3">
                        <h3 
                          className="text-sm font-medium text-gray-900 cursor-pointer hover:text-maroon-600"
                          onClick={() => handleQuickView(product)}
                        >
                          {product.name}
                        </h3>
                        <div className="mt-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${product.conditionColor}`}>
                            {product.condition}
                          </span>
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                          <p className="text-lg font-semibold text-gray-900">{product.price}</p>
                          <p className="text-sm text-gray-500 line-through">{product.originalPrice}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{product.postedDate}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b pb-6 last:border-0">
                      <div className="flex items-start gap-4">
                        <Image
                          src={review.avatar}
                          alt={review.reviewer}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{review.reviewer}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <StarIconSolid
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(review.date).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                              {review.type === 'buyer' ? 'Bought from' : 'Sold to'} {user.name}
                            </span>
                          </div>
                          <p className="mt-3 text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* About Tab */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Bio</h3>
                    <p className="text-gray-700">{user.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Preferred Meetup Spots</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Library Steps', 'Student Center', 'Dining Hall', user.dorm].map(spot => (
                        <span
                          key={spot}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          <MapPinIcon className="h-3 w-3" />
                          {spot}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Selling Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Textbooks', 'Dorm Essentials', 'Electronics', 'School Supplies'].map(category => (
                        <span
                          key={category}
                          className="px-3 py-1 bg-maroon-50 text-maroon-700 rounded-full text-sm"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ShoppingBagIcon className="h-4 w-4" />
                      <span>Completed {user.stats.itemsSold + user.stats.itemsBought} transactions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <CurrencyDollarIcon className="h-4 w-4" />
                      <span>Helped students save over $2,400 this semester</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
      
      {/* Chat List Panel */}
      <ChatList isOpen={chatListOpen} onClose={() => setChatListOpen(false)} />
    </>
  )
}