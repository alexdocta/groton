"use client"

import {
  BookOpenIcon,
  HomeIcon
} from '@heroicons/react/24/outline'
import { motion } from 'motion/react'
import Link from 'next/link'

const categories = [
  {
    name: 'Textbooks & Study Materials',
    description: 'Save up to 70% on course books',
    href: '/category/textbooks',
    icon: BookOpenIcon,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    name: 'Dorm Room Essentials',
    description: 'Everything for your space',
    href: '/category/dorm',
    icon: HomeIcon,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
]

export default function QuickCategories() {
  return (
    <div className="bg-white py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Find exactly what you need for campus life
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={category.href}
                className="group relative flex flex-col overflow-hidden rounded-xl bg-white p-3 sm:p-4 lg:p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-lg hover:ring-gray-300"
              >
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                  <div className={`${category.lightColor} rounded-lg p-2 sm:p-3 transition-all group-hover:scale-110`}>
                    <category.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${category.textColor}`} aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm sm:text-base font-semibold text-gray-900 group-hover:${category.textColor}`}>
                      {category.name}
                    </h3>
                    <p className="mt-0.5 text-xs sm:text-sm text-gray-600 hidden sm:block">{category.description}</p>
                  </div>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center text-sm font-medium text-maroon-600 hover:text-maroon-700"
          >
            View all categories
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}