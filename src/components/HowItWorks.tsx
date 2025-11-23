"use client"

import { CameraIcon, ChatBubbleLeftRightIcon, CheckCircleIcon, PlusIcon } from '@heroicons/react/24/outline'
import { motion } from 'motion/react'

const steps = [
  {
    id: 1,
    name: 'List Your Item',
    description: 'Snap a photo, set your price, and post in seconds. No complicated forms.',
    icon: CameraIcon,
    iconBackground: 'bg-blue-500',
    iconForeground: 'text-white',
  },
  {
    id: 2,
    name: 'Connect with Buyers',
    description: 'Chat safely through our platform. Negotiate prices and arrange meetups.',
    icon: ChatBubbleLeftRightIcon,
    iconBackground: 'bg-purple-500',
    iconForeground: 'text-white',
  },
  {
    id: 3,
    name: 'Meet on Campus',
    description: 'Exchange at designated safe zones. Public, monitored locations for security.',
    icon: PlusIcon,
    iconBackground: 'bg-orange-500',
    iconForeground: 'text-white',
  },
  {
    id: 4,
    name: 'Complete Exchange',
    description: 'Mark as sold, leave a review. Build your reputation in the community.',
    icon: CheckCircleIcon,
    iconBackground: 'bg-maroon-500',
    iconForeground: 'text-white',
  },
]

export default function HowItWorks() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Four simple steps to start saving and earning on campus
          </p>
        </div>

        <div className="mt-6">
          <div className="relative">
            {/* Connection line for desktop */}
            <div className="hidden lg:block absolute top-10 left-24 right-24 h-0.5 bg-gray-200" aria-hidden="true" />
            
            <div className="relative grid grid-cols-1 gap-y-12 lg:grid-cols-4 lg:gap-x-12">
              {steps.map((step, stepIdx) => (
                <motion.div
                  key={step.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: stepIdx * 0.1 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center">
                    {/* Icon */}
                    <div className="flex h-20 w-20 items-center justify-center">
                      <div className={`${step.iconBackground} rounded-full p-4 shadow-lg`}>
                        <step.icon className={`h-8 w-8 ${step.iconForeground}`} aria-hidden="true" />
                      </div>
                    </div>
                    
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 lg:right-auto lg:left-8">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white shadow-md ring-2 ring-white">
                        <span className="text-sm font-bold text-gray-900">{step.id}</span>
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-6 text-center">
                      <h3 className="text-lg font-semibold text-gray-900">{step.name}</h3>
                      <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center">
 
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-maroon-50 rounded-full">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-maroon-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-maroon-500"></span>
            </span>
            <span className="text-sm font-medium text-maroon-700">
              247 students active right now
            </span>
          </div>
          
          <div className="mt-6">
            <button className="inline-flex items-center justify-center rounded-full bg-maroon-600 px-8 py-3 text-base font-medium text-white shadow-lg hover:bg-maroon-700 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:ring-offset-2 transition-all hover:scale-105">
              Get Started Free
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}