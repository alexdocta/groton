"use client"

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, MapPinIcon, ChatBubbleLeftRightIcon, HeartIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { motion } from 'motion/react'

interface Product {
  id: number
  name: string
  price: string
  originalPrice: string
  condition: string
  conditionColor: string
  seller: string
  dorm: string
  imageSrc: string
  imageAlt: string
  badge?: string
  description?: string
  postedDate?: string
  meetupLocation?: string
}

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  if (!product) return null

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="sm:w-1/2">
                      <div className="relative">
                        <Image
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          width={400}
                          height={400}
                          className="w-full h-64 object-cover rounded-lg"
                        />
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
                          <HeartIcon className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:ml-6 sm:w-1/2">
                      <Dialog.Title as="h3" className="text-xl font-semibold text-gray-900">
                        {product.name}
                      </Dialog.Title>
                      
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${product.conditionColor}`}>
                          {product.condition}
                        </span>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-bold text-gray-900">{product.price}</p>
                          <p className="text-lg text-gray-500 line-through">{product.originalPrice}</p>
                        </div>
                        <span className="text-sm font-medium text-maroon-600">
                          Save {Math.round(((parseFloat(product.originalPrice.slice(1)) - parseFloat(product.price.slice(1))) / parseFloat(product.originalPrice.slice(1))) * 100)}%
                        </span>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Description</h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {product.description || `Great condition ${product.name.toLowerCase()} from a fellow student. Perfect for campus life!`}
                        </p>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          <span>Pickup: {product.meetupLocation || product.dorm}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Seller:</span>
                          <span>{product.seller}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Posted:</span>
                          <span>{product.postedDate || '2 days ago'}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 inline-flex items-center justify-center rounded-lg bg-maroon-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-maroon-700 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:ring-offset-2"
                        >
                          <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                          Message Seller
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:ring-offset-2"
                        >
                          <HeartIcon className="h-4 w-4" />
                        </motion.button>
                      </div>

                      <div className="mt-4 p-3 bg-maroon-50 rounded-lg">
                        <div className="flex items-start">
                          <svg className="h-5 w-5 text-maroon-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-maroon-800">Safety Tip</h3>
                            <div className="mt-1 text-sm text-maroon-700">
                              Meet in designated campus safe zones. Inspect items before payment.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}