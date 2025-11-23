"use client"

import { motion, useInView } from 'motion/react'
import { useRef, useState, useEffect } from 'react'

const stats = [
  { id: 1, name: 'Active Listings', value: 2847, suffix: '', prefix: '' },
  { id: 2, name: 'Saved This Semester', value: 45230, suffix: '', prefix: '$' },
  { id: 3, name: 'Happy Students', value: 1523, suffix: '+', prefix: '' },
  { id: 4, name: 'Campus Partners', value: 12, suffix: '', prefix: '' },
]

function CountUp({ end, duration = 2, prefix = '', suffix = '' }: { end: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [end, duration, isInView])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function CommunityStats() {
  return (
    <div className="bg-white py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by students across campus
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Join a thriving community making campus commerce sustainable and affordable
          </p>
        </div>
        
        <dl className="mt-6 grid grid-cols-2 gap-0.5 overflow-hidden rounded-2xl text-center lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-maroon-50 to-maroon-50 px-3 py-6 sm:p-8 lg:p-10"
            >
              <dt className="text-base font-medium text-gray-600">{stat.name}</dt>
              <dd className="mt-1 text-4xl font-extrabold tracking-tight text-maroon-600">
                <CountUp 
                  end={stat.value} 
                  duration={2} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix}
                />
              </dd>
            </motion.div>
          ))}
        </dl>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-maroon-50 px-6 py-3">
            <svg className="h-5 w-5 text-maroon-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-maroon-700">
              Growing 20% month over month
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}