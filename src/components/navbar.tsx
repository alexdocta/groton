"use client"

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useStore } from '@/store/useStore'
import ChatList from '@/components/ChatList'
import { SellListingDialog } from '@/components/SellListingDialog'

const navigation = {
  categories: [
    {
      name: 'Browse',
      featured: [
        { name: 'New Arrivals', href: '/new' },
        { name: 'Trending Now', href: '/trending' },
        { name: 'Best Deals', href: '/deals' },
        { name: 'Ending Soon', href: '/ending-soon' },
      ],
      categories: [
        { name: 'Textbooks', href: '/category/textbooks' },
        { name: 'Dorm Essentials', href: '/category/dorm' },
        { name: 'Electronics', href: '/category/electronics' },
        { name: 'Sports Gear', href: '/category/sports' },
      ],
    },
  ],
  pages: [
    { name: 'Tutoring', href: '/tutoring' },
    { name: 'Alumni', href: '/alumni' },
    { name: 'Programs', href: '/programs' },
  ],
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [chatListOpen, setChatListOpen] = useState(false)
  const { messageThreads } = useStore()
  
  // Calculate total unread messages
  const totalUnread = messageThreads.reduce((sum, thread) => sum + thread.unreadCount, 0)

  return (
    <div className="bg-white sticky top-0 z-10">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link href="/category/textbooks" className="-m-2 block p-2 font-medium text-gray-900">
                      Textbooks
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="/category/dorm" className="-m-2 block p-2 font-medium text-gray-900">
                      Dorm Essentials
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="/category/electronics" className="-m-2 block p-2 font-medium text-gray-900">
                      Electronics
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="/category/sports" className="-m-2 block p-2 font-medium text-gray-900">
                      Sports Gear
                    </Link>
                  </div>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link href="/signin" className="-m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="/signup" className="-m-2 block p-2 font-medium text-gray-900">
                      Create account
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white border-b border-gray-200">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <button
              type="button"
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link href="/" className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center"
                >
                  <div className="h-8 w-8 bg-maroon-600 rounded-lg flex items-center justify-center mr-2">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-gray-900">CampusSwap</span>
                </motion.div>
              </Link>
            </div>

            {/* Flyout menus */}
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {navigation.categories.map((category) => (
                  <Popover key={category.name} className="flex">
                    {({ open }) => (
                      <>
                        <div className="relative flex">
                          <Popover.Button className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 focus:outline-none">
                            {category.name}
                          </Popover.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                    {category.featured.map((item) => (
                                      <div key={item.name} className="group relative text-base sm:text-sm">
                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-maroon-50 group-hover:opacity-75">
                                          <div className="h-32 w-full bg-gradient-to-br from-maroon-100 to-maroon-100" />
                                        </div>
                                        <Link href={item.href} className="mt-6 block font-medium text-gray-900">
                                          <span className="absolute inset-0 z-10" aria-hidden="true" />
                                          {item.name}
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-xl">
                                    {category.categories.map((item) => (
                                      <div key={item.name}>
                                        <Link href={item.href} className="font-medium text-gray-900 hover:text-maroon-600">
                                          {item.name}
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                ))}

                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </Popover.Group>

            <div className="ml-auto flex items-center">
              {/* Sell button */}
              <div className="hidden lg:flex mr-6">
                <SellListingDialog />
              </div>

              {/* Sell button for mobile, Search for desktop */}
              <div className="flex lg:ml-6">
                <div className="lg:hidden">
                  <SellListingDialog 
                    trigger={
                      <button className="p-2 text-maroon-600 hover:text-maroon-700">
                        <PlusCircleIcon className="h-6 w-6" aria-hidden="true" />
                        <span className="sr-only">Sell</span>
                      </button>
                    }
                  />
                </div>
                <button className="hidden lg:block p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Messages */}
              <div className="ml-4 flow-root lg:ml-6">
                <button 
                  onClick={() => setChatListOpen(true)}
                  className="group -m-2 flex items-center p-2 relative"
                >
                  <ChatBubbleLeftRightIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {totalUnread > 0 ? totalUnread : ''}
                  </span>
                  {totalUnread > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{totalUnread > 9 ? '9+' : totalUnread}</span>
                    </span>
                  )}
                  <span className="sr-only">messages</span>
                </button>
              </div>

           

              {/* Profile */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link href="/profile/current-user" className="group -m-2 flex items-center p-2">
                  <UserIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Chat List Panel */}
      <ChatList isOpen={chatListOpen} onClose={() => setChatListOpen(false)} />
    </div>
  )
}