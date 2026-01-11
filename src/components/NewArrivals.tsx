"use client"

import { useState } from 'react'
import { MapPinIcon, BookmarkIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import QuickViewModal from './QuickViewModal'
import { useStore } from '@/store/useStore'

const newProducts = [
  {
    id: 5,
    name: 'White 3-Ring Binder',
    href: '/product/5',
    price: '$8',
    originalPrice: '$15',
    condition: 'Good',
    conditionColor: 'bg-yellow-100 text-yellow-800',
    seller: 'Emma Wilson',
    sellerId: 'emma-wilson',
    dorm: 'South Hall',
    imageSrc: '/binder.jpg',
    imageAlt: 'White binder',
    description: 'Standard white 3-ring binder. Great for organizing notes and assignments.',
    postedDate: '6 hours ago',
    meetupLocation: 'South Hall Lobby'
  },
  {
    id: 6,
    name: 'Fabletics Athletic Shorts',
    href: '/product/6',
    price: '$15',
    originalPrice: '$35',
    condition: 'Like New',
    conditionColor: 'bg-green-100 text-green-800',
    seller: 'Lisa Park',
    sellerId: 'sarah-johnson',
    dorm: 'Science Center',
    imageSrc: '/shorts.jpg',
    imageAlt: 'Fabletics shorts',
    description: 'Gray Fabletics athletic shorts with drawstring. Comfortable for workouts or casual wear.',
    postedDate: '12 hours ago',
    meetupLocation: 'Science Center Lab'
  },
  {
    id: 7,
    name: 'Third by Wendy Wasserstein',
    href: '/product/7',
    price: '$12',
    originalPrice: '$25',
    condition: 'Good',
    conditionColor: 'bg-yellow-100 text-yellow-800',
    seller: 'James Brown',
    sellerId: 'mike-williams',
    dorm: 'East Wing',
    imageSrc: '/book.jpg',
    imageAlt: 'Third play script',
    description: 'Drama play script by Wendy Wasserstein. Great for theater class or personal reading.',
    postedDate: '1 day ago',
    meetupLocation: 'East Wing Common Room'
  },
  {
    id: 8,
    name: 'Interpreter of Maladies',
    href: '/product/8',
    price: '$15',
    originalPrice: '$30',
    condition: 'Like New',
    conditionColor: 'bg-green-100 text-green-800',
    seller: 'Chris Lee',
    sellerId: 'alex-chen',
    dorm: 'Arts House',
    imageSrc: '/book2.jpg',
    imageAlt: 'Interpreter of Maladies book',
    badge: 'Pulitzer Winner',
    description: 'Pulitzer Prize winning short story collection by Jhumpa Lahiri. Perfect for English class.',
    postedDate: '2 days ago',
    meetupLocation: 'Arts House Reading Room'
  },
  {
    id: 9,
    name: 'Advanced Mathematics Textbook',
    href: '/product/9',
    price: '$18',
    originalPrice: '$45',
    condition: 'Good',
    conditionColor: 'bg-yellow-100 text-yellow-800',
    seller: 'Maya Patel',
    sellerId: 'emma-wilson',
    dorm: 'Riverside Hall',
    imageSrc: '/book3.jpg',
    imageAlt: 'Advanced Mathematics textbook',
    description: 'Precalculus with Discrete Mathematics and Data Analysis. Great for math courses.',
    postedDate: '3 hours ago',
    meetupLocation: 'Riverside Hall Entrance'
  },
  {
    id: 10,
    name: 'Razer Gaming Mouse',
    href: '/product/10',
    price: '$18',
    originalPrice: '$40',
    condition: 'Good',
    conditionColor: 'bg-yellow-100 text-yellow-800',
    seller: 'David Kim',
    sellerId: 'mike-williams',
    dorm: 'Library Residence',
    imageSrc: '/mouse.jpg',
    imageAlt: 'Razer gaming mouse',
    description: 'Wired Razer gaming mouse in good condition. Great for gaming or everyday use.',
    postedDate: '18 hours ago',
    meetupLocation: 'Library Main Entrance'
  },
  {
    id: 11,
    name: 'Gold Baseball Bat',
    href: '/product/11',
    price: '$20',
    originalPrice: '$45',
    condition: 'Good',
    conditionColor: 'bg-yellow-100 text-yellow-800',
    seller: 'Rachel Green',
    sellerId: 'sarah-johnson',
    dorm: 'STEM House',
    imageSrc: '/bat.jpg',
    imageAlt: 'Baseball bat',
    description: 'Gold baseball bat with decorative artwork. Great for practice or display.',
    postedDate: '8 hours ago',
    meetupLocation: 'STEM House Study Room'
  },
  {
    id: 12,
    name: 'Dry-Erase Monthly Planner',
    href: '/product/12',
    price: '$10',
    originalPrice: '$22',
    condition: 'Like New',
    conditionColor: 'bg-green-100 text-green-800',
    seller: 'Jordan Taylor',
    sellerId: 'alex-chen',
    dorm: 'Central Campus',
    imageSrc: '/calendar.jpg',
    imageAlt: 'Dry-erase monthly planner',
    description: 'Reusable dry-erase calendar planner. Perfect for tracking assignments and activities.',
    postedDate: '1 day ago',
    meetupLocation: 'Student Center'
  },
]

interface NewArrivalsProps {
  title?: string
  description?: string
  showViewAll?: boolean
}

export default function NewArrivals({ 
  title = "New Arrivals", 
  description = "Fresh listings from your fellow students",
  showViewAll = true 
}: NewArrivalsProps) {
  const [selectedProduct, setSelectedProduct] = useState<typeof newProducts[0] | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const { createThread } = useStore()

  const handleQuickView = (product: typeof newProducts[0]) => {
    setSelectedProduct(product)
    setIsQuickViewOpen(true)
  }

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false)
    setSelectedProduct(null)
  }
  
  const handleMessageSeller = (product: typeof newProducts[0]) => {
    createThread(product.sellerId, {
      id: product.id,
      name: product.name,
      price: product.price,
      imageSrc: product.imageSrc,
      seller: product.seller,
      sellerId: product.sellerId
    })
  }

  return (
    <>
      <div className="bg-white py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            </div>
            {showViewAll && (
              <Link
                href="/new"
                className="hidden sm:block text-sm font-medium text-maroon-600 hover:text-maroon-700"
              >
                View all
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4 xl:gap-x-6">
            {newProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative"
              >
                <div className="relative">
                  <div 
                    className="w-full h-40 sm:h-64 bg-gray-200 rounded-lg overflow-hidden group-hover:opacity-90 transition-opacity cursor-pointer"
                    onClick={() => handleQuickView(product)}
                  >
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      width={400}
                      height={400}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  {product.badge && (
                    <div className="absolute top-2 left-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                        product.badge === 'Hot Deal' ? 'bg-red-100 text-red-800' :
                        product.badge === 'Top Rated' ? 'bg-maroon-100 text-maroon-800' :
                        product.badge === 'New' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {product.badge}
                      </span>
                    </div>
                  )}
                  <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                    <BookmarkIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <div className="mt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 
                        className="text-xs sm:text-sm font-medium text-gray-900 cursor-pointer hover:text-maroon-600 line-clamp-2"
                        onClick={() => handleQuickView(product)}
                      >
                        {product.name}
                      </h3>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${product.conditionColor}`}>
                          {product.condition}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-1 flex items-center text-xs sm:text-sm text-gray-600">
                    <MapPinIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="truncate">{product.dorm}</span>
                  </div>

                  <div className="mt-1 text-xs text-gray-500">
                    <span>by </span>
                    <Link 
                      href={`/profile/${product.sellerId}`} 
                      className="hover:text-maroon-600 hover:underline"
                    >
                      {product.seller}
                    </Link>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm sm:text-lg font-semibold text-gray-900">{product.price}</p>
                    <p className="text-xs sm:text-sm text-gray-500 line-through">{product.originalPrice}</p>
                    <span className="text-xs font-medium text-maroon-600">
                      Save {Math.round(((parseFloat(product.originalPrice.slice(1)) - parseFloat(product.price.slice(1))) / parseFloat(product.originalPrice.slice(1))) * 100)}%
                    </span>
                  </div>

                  <div className="mt-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleMessageSeller(product)}
                      className="w-full inline-flex items-center justify-center rounded-lg bg-maroon-600 px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-white shadow-sm hover:bg-maroon-700 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:ring-offset-2 transition-colors"
                    >
                      <ChatBubbleLeftRightIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Message Seller</span>
                      <span className="sm:hidden">Message</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {showViewAll && (
            <div className="mt-6 text-center sm:hidden">
              <Link
                href="/new"
                className="text-sm font-medium text-maroon-600 hover:text-maroon-700"
              >
                View all new arrivals
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />
    </>
  )
}