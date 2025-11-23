"use client"

import { useParams } from 'next/navigation'
import ProductList from '@/components/productList'
import NewArrivals from '@/components/NewArrivals'
import { 
  BookOpenIcon, 
  HomeIcon, 
  ComputerDesktopIcon, 
  TrophyIcon,
  AcademicCapIcon,
  PaintBrushIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { motion } from 'motion/react'

// Category configuration matching QuickCategories component
const categoryConfig: Record<string, {
  name: string
  description: string
  icon: any
  color: string
  lightColor: string
  textColor: string
  heroImage?: string
  subcategories?: { name: string; href: string }[]
}> = {
  textbooks: {
    name: 'Textbooks & Study Materials',
    description: 'Save up to 70% on course books from fellow students',
    icon: BookOpenIcon,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    subcategories: [
      { name: 'AP & Honors', href: '/category/textbooks?filter=ap' },
      { name: 'Science', href: '/category/textbooks?filter=science' },
      { name: 'Mathematics', href: '/category/textbooks?filter=math' },
      { name: 'Literature', href: '/category/textbooks?filter=literature' },
    ]
  },
  dorm: {
    name: 'Dorm Room Essentials',
    description: 'Everything you need to make your dorm room feel like home',
    icon: HomeIcon,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    subcategories: [
      { name: 'Furniture', href: '/category/dorm?filter=furniture' },
      { name: 'Bedding', href: '/category/dorm?filter=bedding' },
      { name: 'Storage', href: '/category/dorm?filter=storage' },
      { name: 'Decor', href: '/category/dorm?filter=decor' },
    ]
  },
  electronics: {
    name: 'Electronics & Tech',
    description: 'Laptops, calculators, and all your tech needs',
    icon: ComputerDesktopIcon,
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    subcategories: [
      { name: 'Laptops', href: '/category/electronics?filter=laptops' },
      { name: 'Calculators', href: '/category/electronics?filter=calculators' },
      { name: 'Accessories', href: '/category/electronics?filter=accessories' },
      { name: 'Audio', href: '/category/electronics?filter=audio' },
    ]
  },
  sports: {
    name: 'Sports & Recreation',
    description: 'Gear for every sport and season',
    icon: TrophyIcon,
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    subcategories: [
      { name: 'Team Sports', href: '/category/sports?filter=team' },
      { name: 'Fitness', href: '/category/sports?filter=fitness' },
      { name: 'Outdoor', href: '/category/sports?filter=outdoor' },
      { name: 'Equipment', href: '/category/sports?filter=equipment' },
    ]
  },
  uniforms: {
    name: 'School Uniforms & Apparel',
    description: 'Dress code essentials and school spirit wear',
    icon: AcademicCapIcon,
    color: 'bg-maroon-500',
    lightColor: 'bg-maroon-50',
    textColor: 'text-maroon-600',
    subcategories: [
      { name: 'Blazers', href: '/category/uniforms?filter=blazers' },
      { name: 'Shirts & Ties', href: '/category/uniforms?filter=shirts' },
      { name: 'Sports Uniforms', href: '/category/uniforms?filter=sports' },
      { name: 'Spirit Wear', href: '/category/uniforms?filter=spirit' },
    ]
  },
  arts: {
    name: 'Art & Music Supplies',
    description: 'Creative tools and instruments for artists and musicians',
    icon: PaintBrushIcon,
    color: 'bg-pink-500',
    lightColor: 'bg-pink-50',
    textColor: 'text-pink-600',
    subcategories: [
      { name: 'Instruments', href: '/category/arts?filter=instruments' },
      { name: 'Art Supplies', href: '/category/arts?filter=supplies' },
      { name: 'Sheet Music', href: '/category/arts?filter=music' },
      { name: 'Studio Equipment', href: '/category/arts?filter=studio' },
    ]
  },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params?.slug as string
  const category = categoryConfig[slug]

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h1>
          <Link 
            href="/"
            className="text-maroon-600 hover:text-maroon-700 font-medium"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    )
  }

  const Icon = category.icon

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className={`${category.lightColor} border-b border-gray-200`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              </li>
              <li>
                <Link href="/categories" className="text-gray-500 hover:text-gray-700 text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              </li>
              <li>
                <span className={`font-medium ${category.textColor} text-sm`}>
                  {category.name}
                </span>
              </li>
            </ol>
          </nav>

          {/* Category Title and Description */}
          <div className="flex items-start gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`${category.color} rounded-2xl p-4`}
            >
              <Icon className="h-10 w-10 text-white" />
            </motion.div>
            <div className="flex-1">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-gray-900 sm:text-4xl"
              >
                {category.name}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-2 text-lg text-gray-600"
              >
                {category.description}
              </motion.p>
            </div>
          </div>

          {/* Subcategories */}
          {category.subcategories && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.name}
                  href={sub.href}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-200 transition-colors"
                >
                  {sub.name}
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Filters and Sorting Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <button className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Condition:</span>
                <select className="rounded-lg border-gray-300 text-sm focus:border-maroon-500 focus:ring-maroon-500">
                  <option>All</option>
                  <option>Like New</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Price:</span>
                <select className="rounded-lg border-gray-300 text-sm focus:border-maroon-500 focus:ring-maroon-500">
                  <option>All</option>
                  <option>Under $25</option>
                  <option>$25 - $50</option>
                  <option>$50 - $100</option>
                  <option>Over $100</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="rounded-lg border-gray-300 text-sm focus:border-maroon-500 focus:ring-maroon-500">
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Best Deals</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Listings */}
      <div className="pb-16">
        <ProductList 
          title={`Popular ${category.name}`}
          description="Top picks in this category"
          showViewAll={false}
        />
        
        {/* Category-specific promotions */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`rounded-2xl ${category.lightColor} p-8 text-center`}
          >
            <h3 className="text-2xl font-bold text-gray-900">
              Looking for something specific?
            </h3>
            <p className="mt-2 text-gray-600">
              Set up an alert and we'll notify you when new {category.name.toLowerCase()} are listed
            </p>
            <button className={`mt-4 inline-flex items-center px-6 py-3 rounded-lg ${category.color} text-white font-medium hover:opacity-90 transition-opacity`}>
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Create Alert
            </button>
          </motion.div>
        </div>

        <NewArrivals 
          title={`New ${category.name}`}
          description="Just listed by your fellow students"
          showViewAll={false}
        />
      </div>
    </div>
  )
}