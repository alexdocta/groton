"use client"

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const categories = [
  'All Categories',
  'Textbooks',
  'Dorm Essentials',
  'Electronics',
  'Sports Gear',
  'School Uniforms',
  'Art Supplies',
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('All Categories')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Subscribe:', { email, category })
    setEmail('')
  }

  return (
    <div className="bg-gradient-to-br from-maroon-600 via-maroon-500 to-maroon-600 zebra-pattern-dark">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Never Miss a Deal
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-lg text-maroon-100">
            Get instant alerts when items you're looking for are posted. Be the first to snag the best deals on campus.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-4 max-w-md">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <label htmlFor="category" className="sr-only">
                Category preference
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full rounded-lg border-0 bg-white/10 backdrop-blur px-4 py-3 text-white placeholder-maroon-200 shadow-lg ring-1 ring-white/20 focus:ring-2 focus:ring-white appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="text-gray-900">
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-maroon-200" aria-hidden="true" />
            </div>

            <div className="flex gap-3">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg border-0 bg-white/10 backdrop-blur px-4 py-3 text-white placeholder-maroon-200 shadow-lg ring-1 ring-white/20 focus:ring-2 focus:ring-white"
                placeholder="Enter your school email"
              />
              <button
                type="submit"
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-maroon-600 shadow-lg hover:bg-maroon-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-maroon-600 transition-all hover:scale-105"
              >
                Subscribe
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-maroon-100">
            We'll only notify you about items matching your preferences. Unsubscribe anytime.
          </p>
        </form>

        <div className="mx-auto mt-6 grid max-w-2xl grid-cols-3 gap-3 sm:gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-white">89%</div>
            <div className="mt-1 text-sm text-maroon-100">Find items faster</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">24hr</div>
            <div className="mt-1 text-sm text-maroon-100">Average response time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">2.5x</div>
            <div className="mt-1 text-sm text-maroon-100">More likely to save</div>
          </div>
        </div>
      </div>
    </div>
  )
}