"use client"

import {
  AcademicCapIcon,
  UserGroupIcon,
  SunIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { motion } from 'motion/react'
import Link from 'next/link'

const services = [
  {
    name: 'Peer Tutoring',
    description: 'Get help from top students in any subject',
    href: '/tutoring',
    icon: AcademicCapIcon,
    color: 'purple',
    stats: '50+ Active Tutors',
    gradient: 'from-purple-500 to-purple-600',
    lightGradient: 'from-purple-50 to-purple-100',
  },
  {
    name: 'Alumni Connect',
    description: 'Connect with alumni for mentorship & internships',
    href: '/alumni',
    icon: UserGroupIcon,
    color: 'blue',
    stats: '200+ Alumni Mentors',
    gradient: 'from-blue-500 to-blue-600',
    lightGradient: 'from-blue-50 to-blue-100',
  },
  {
    name: 'Summer Programs',
    description: 'Discover enriching summer opportunities',
    href: '/programs',
    icon: SunIcon,
    color: 'orange',
    stats: '100+ Programs Listed',
    gradient: 'from-orange-500 to-orange-600',
    lightGradient: 'from-orange-50 to-orange-100',
  },
]

export default function CampusServices() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-4 sm:py-6 zebra-pattern">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={service.href}
                className="group relative block overflow-hidden rounded-xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-xl hover:ring-gray-300"
              >
                {/* Background Gradient - Fixed positioning */}
                <div className={`absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-br ${service.lightGradient} opacity-0 transition-opacity group-hover:opacity-100`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex rounded-lg bg-gradient-to-r ${service.gradient} p-2 sm:p-3 shadow-lg`}>
                    <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="mt-3 text-base font-semibold text-gray-900 group-hover:text-gray-800 sm:text-lg">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                    {service.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="mt-3 flex items-center justify-between sm:mt-4">
                    <span className={`text-xs font-medium sm:text-sm ${
                      service.color === 'purple' ? 'text-purple-600' :
                      service.color === 'blue' ? 'text-blue-600' :
                      'text-orange-600'
                    }`}>
                      {service.stats}
                    </span>
                    <ArrowRightIcon className="h-3 w-3 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-gray-600 sm:h-4 sm:w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 sm:text-sm">
            Your complete campus hub for academics, networking, and growth
          </p>
        </div>
      </div>
    </div>
  )
}