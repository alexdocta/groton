"use client"

import { CurrencyDollarIcon, UserGroupIcon, SquaresPlusIcon } from '@heroicons/react/24/outline'
import { motion } from 'motion/react'

const incentives = [
  {
    name: 'Campus-Only Community',
    description: 'All users verified with school email. Trade safely with students you know and trust.',
    icon: UserGroupIcon,
  },
  {
    name: 'Reduce Costs',
    description: 'Save money by buying gently used items instead of brand new. The smart way to shop on campus.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Focused Hub',
    description: 'Everything you need in one place - textbooks, study materials, and dorm essentials.',
    icon: SquaresPlusIcon,
  },
]

export default function Incentive() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why CampusSwap?
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Built by students, for students. A marketplace that understands campus life.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-md sm:max-w-none">
          <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-3">
            {incentives.map((incentive, index) => (
              <motion.div
                key={incentive.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center sm:text-left"
              >
                <div className="sm:flex sm:items-start">
                  <div className="sm:flex-shrink-0">
                    <div className="flow-root">
                      <div className="inline-flex items-center justify-center rounded-xl bg-maroon-50 p-3 shadow-lg ring-1 ring-maroon-100">
                        <incentive.icon className="h-8 w-8 text-maroon-600" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-6">
                    <h3 className="text-lg font-semibold text-gray-900">{incentive.name}</h3>
                    <p className="mt-2 text-sm text-gray-600">{incentive.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hidden for MVP - Join students CTA
        <div className="mt-8 bg-gradient-to-r from-maroon-50 to-teal-50 rounded-2xl p-4 sm:p-6 text-center">
          <div className="mx-auto max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-900">Join 1,500+ students already saving</h3>
            <p className="mt-3 text-gray-600">
              The average student saves $450 per semester on textbooks alone. Start your sustainable campus shopping journey today.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button className="inline-flex items-center justify-center rounded-full bg-maroon-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-maroon-700 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:ring-offset-2 transition-all hover:scale-105">
                Start Selling
              </button>
              <button className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-medium text-maroon-600 shadow-lg ring-1 ring-maroon-100 hover:bg-maroon-50 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:ring-offset-2 transition-all hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
        */}
      </div>
    </div>
  )
}