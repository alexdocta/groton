'use client'

import { Fragment, useState, useMemo } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { 
  XMarkIcon, 
  FunnelIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import QuickViewModal from '@/components/QuickViewModal'
import { useStore } from '@/store/useStore'

const sortOptions = [
  { name: 'Most Popular', value: 'popular' },
  { name: 'Best Rating', value: 'rating' },
  { name: 'Newest', value: 'newest' },
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
]

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'textbooks', label: 'Textbooks', count: 234 },
      { value: 'dorm', label: 'Dorm Essentials', count: 189 },
      { value: 'electronics', label: 'Electronics', count: 145 },
      { value: 'sports', label: 'Sports & Recreation', count: 98 },
      { value: 'uniforms', label: 'School Uniforms', count: 76 },
      { value: 'arts', label: 'Art & Music', count: 54 },
    ],
  },
  {
    id: 'condition',
    name: 'Condition',
    options: [
      { value: 'new', label: 'New', count: 45 },
      { value: 'like-new', label: 'Like New', count: 123 },
      { value: 'good', label: 'Good', count: 234 },
      { value: 'fair', label: 'Fair', count: 98 },
    ],
  },
  {
    id: 'price',
    name: 'Price Range',
    options: [
      { value: '0-25', label: 'Under $25', count: 156 },
      { value: '25-50', label: '$25 - $50', count: 189 },
      { value: '50-100', label: '$50 - $100', count: 145 },
      { value: '100-200', label: '$100 - $200', count: 78 },
      { value: '200+', label: 'Over $200', count: 34 },
    ],
  },
  {
    id: 'location',
    name: 'Pickup Location',
    options: [
      { value: 'north', label: 'North Campus', count: 234 },
      { value: 'south', label: 'South Campus', count: 189 },
      { value: 'east', label: 'East Campus', count: 145 },
      { value: 'west', label: 'West Campus', count: 98 },
      { value: 'central', label: 'Central Campus', count: 156 },
    ],
  },
  {
    id: 'seller',
    name: 'Seller Type',
    options: [
      { value: 'verified', label: 'Verified Sellers', count: 412 },
      { value: 'top-rated', label: 'Top Rated', count: 234 },
      { value: 'new', label: 'New Sellers', count: 67 },
    ],
  },
]

// Sample products from all categories
const allProducts = [
  {
    id: 1,
    name: 'AP Biology Textbook (Campbell)',
    category: 'Textbooks',
    price: '$45',
    originalPrice: '$280',
    condition: 'Like New',
    conditionColor: 'bg-green-100 text-green-800',
    seller: 'Alex Chen',
    sellerId: 'alex-chen',
    dorm: 'Whitman Hall',
    imageSrc: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop',
    imageAlt: 'Biology textbook on desk',
    badge: 'Hot Deal',
    description: 'Comprehensive biology textbook in excellent condition.',
    postedDate: '1 day ago',
    meetupLocation: 'Science Building Lobby'
  },
  {
    id: 2,
    name: 'Mini Fridge (3.2 cu ft)',
    category: 'Dorm Essentials',
    price: '$80',
    originalPrice: '$150',
    condition: 'Good',
    conditionColor: 'bg-yellow-100 text-yellow-800',
    seller: 'Sarah Johnson',
    sellerId: 'sarah-johnson',
    dorm: 'Foster House',
    imageSrc: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop',
    imageAlt: 'Compact mini fridge',
    description: 'Perfect for dorm room. Energy efficient and compact.',
    postedDate: '3 days ago',
    meetupLocation: 'Foster House Common Room'
  },
  {
    id: 3,
    name: 'TI-84 Plus Graphing Calculator',
    category: 'Electronics',
    price: '$65',
    originalPrice: '$120',
    condition: 'Like New',
    conditionColor: 'bg-green-100 text-green-800',
    seller: 'Mike Williams',
    sellerId: 'mike-williams',
    dorm: 'North Campus',
    imageSrc: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48f?w=400&h=400&fit=crop',
    imageAlt: 'Graphing calculator',
    badge: 'Top Rated',
    description: 'Barely used calculator, all functions working perfectly.',
    postedDate: '2 days ago',
    meetupLocation: 'Math Department'
  },
  {
    id: 4,
    name: 'Lacrosse Stick (STX Stallion)',
    category: 'Sports',
    price: '$35',
    originalPrice: '$90',
    condition: 'Good',
    conditionColor: 'bg-yellow-100 text-yellow-800',
    seller: 'Tom Davis',
    sellerId: 'alex-chen',
    dorm: 'Athletic Dorm',
    imageSrc: 'https://www.sportsetc.net/wp-content/uploads/2024/01/hackees-lacrosse-stick-lacrosse-stick-hackees-navy-476467.webp',
    imageAlt: 'Lacrosse stick',
    description: 'Well-maintained lacrosse stick. Great for beginners.',
    postedDate: '5 days ago',
    meetupLocation: 'Athletic Center'
  },
  {
    id: 5,
    name: 'School Blazer (Size M)',
    category: 'Uniforms',
    price: '$40',
    originalPrice: '$120',
    condition: 'Good',
    conditionColor: 'bg-yellow-100 text-yellow-800',
    seller: 'James Brown',
    sellerId: 'mike-williams',
    dorm: 'East Wing',
    imageSrc: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
    imageAlt: 'School uniform blazer',
    description: 'Official school blazer in good condition.',
    postedDate: '1 day ago',
    meetupLocation: 'East Wing Common Room'
  },
  {
    id: 6,
    name: 'Acoustic Guitar (Yamaha)',
    category: 'Arts',
    price: '$120',
    originalPrice: '$300',
    condition: 'Fair',
    conditionColor: 'bg-orange-100 text-orange-800',
    seller: 'Chris Lee',
    sellerId: 'alex-chen',
    dorm: 'Arts House',
    imageSrc: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop',
    imageAlt: 'Acoustic guitar',
    badge: 'Rare Find',
    description: 'Yamaha acoustic guitar with some wear but great sound.',
    postedDate: '2 days ago',
    meetupLocation: 'Arts House Music Room'
  },
  {
    id: 7,
    name: 'Organic Chemistry Model Kit',
    category: 'Textbooks',
    price: '$15',
    originalPrice: '$35',
    condition: 'Like New',
    conditionColor: 'bg-green-100 text-green-800',
    seller: 'Lisa Park',
    sellerId: 'sarah-johnson',
    dorm: 'Science Center',
    imageSrc: 'https://cdn.schoolspecialty.com/881209a5-f76d-46a7-8734-b1970064d7bd/529267_JPG%20Output.jpg',
    imageAlt: 'Chemistry model kit',
    description: 'Complete molecular model kit for organic chemistry.',
    postedDate: '12 hours ago',
    meetupLocation: 'Science Center Lab'
  },
  {
    id: 8,
    name: 'Desk Lamp with USB Ports',
    category: 'Dorm Essentials',
    price: '$20',
    originalPrice: '$45',
    condition: 'New',
    conditionColor: 'bg-blue-100 text-blue-800',
    seller: 'Emma Wilson',
    sellerId: 'emma-wilson',
    dorm: 'South Hall',
    imageSrc: 'https://luxledlights.com/cdn/shop/files/Brooklyn_Desk-USB_Black-Slate_1200x1200_5fda5593-2d09-4f46-9102-bcf0c3e8e5db-01.webp',
    imageAlt: 'Modern desk lamp',
    badge: 'New',
    description: 'Brand new LED desk lamp with two USB charging ports.',
    postedDate: '6 hours ago',
    meetupLocation: 'South Hall Lobby'
  },
  {
    id: 9,
    name: 'MacBook Pro 13" (2020)',
    category: 'Electronics',
    price: '$800',
    originalPrice: '$1299',
    condition: 'Good',
    conditionColor: 'bg-yellow-100 text-yellow-800',
    seller: 'David Kim',
    sellerId: 'mike-williams',
    dorm: 'Tech House',
    imageSrc: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    imageAlt: 'MacBook Pro laptop',
    badge: 'Hot Deal',
    description: 'Well-maintained MacBook Pro, perfect for college.',
    postedDate: '4 hours ago',
    meetupLocation: 'Library Study Room'
  },
  {
    id: 10,
    name: 'Hockey Gear Set',
    category: 'Sports',
    price: '$150',
    originalPrice: '$400',
    condition: 'Good',
    conditionColor: 'bg-yellow-100 text-yellow-800',
    seller: 'Ryan Miller',
    sellerId: 'alex-chen',
    dorm: 'Athletic Dorm',
    imageSrc: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop',
    imageAlt: 'Hockey equipment',
    description: 'Complete hockey gear set including pads and helmet.',
    postedDate: '3 days ago',
    meetupLocation: 'Ice Rink Entrance'
  },
  {
    id: 11,
    name: 'Drawing Tablet (Wacom)',
    category: 'Arts',
    price: '$75',
    originalPrice: '$150',
    condition: 'Like New',
    conditionColor: 'bg-green-100 text-green-800',
    seller: 'Amy Zhang',
    sellerId: 'emma-wilson',
    dorm: 'Arts House',
    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqcOFBra82GDleZ_SpJVOYPvpa9-6CavhQFg&s',
    imageAlt: 'Digital drawing tablet',
    description: 'Professional drawing tablet, barely used.',
    postedDate: '1 day ago',
    meetupLocation: 'Art Studio'
  },
  {
    id: 12,
    name: 'Winter Uniform Set',
    category: 'Uniforms',
    price: '$85',
    originalPrice: '$200',
    condition: 'Good',
    conditionColor: 'bg-yellow-100 text-yellow-800',
    seller: 'Sophie Chen',
    sellerId: 'sarah-johnson',
    dorm: 'West Hall',
    imageSrc: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
    imageAlt: 'School winter uniform',
    description: 'Complete winter uniform set, size medium.',
    postedDate: '2 days ago',
    meetupLocation: 'West Hall Reception'
  },
]

export default function BrowsePage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState(sortOptions[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [selectedProduct, setSelectedProduct] = useState<typeof allProducts[0] | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const { createThread, userListings } = useStore()

  const handleQuickView = (product: typeof allProducts[0]) => {
    setSelectedProduct(product)
    setIsQuickViewOpen(true)
  }

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false)
    setSelectedProduct(null)
  }
  
  const handleMessageSeller = (product: typeof allProducts[0]) => {
    createThread(product.sellerId, {
      id: product.id,
      name: product.name,
      price: product.price,
      imageSrc: product.imageSrc,
      seller: product.seller,
      sellerId: product.sellerId
    })
  }

  const handleFilterChange = (filterId: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const current = prev[filterId] || []
      if (checked) {
        return { ...prev, [filterId]: [...current, value] }
      } else {
        return { ...prev, [filterId]: current.filter(v => v !== value) }
      }
    })
  }

  const activeFiltersCount = Object.values(selectedFilters).flat().length
  
  // Combine user listings with mock products
  const combinedProducts = useMemo(() => {
    // Add user badge to user listings
    const userListingsWithBadge = userListings.map(listing => ({
      ...listing,
      isUserListing: true
    }))
    return [...userListingsWithBadge, ...allProducts]
  }, [userListings])
  
  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = [...combinedProducts]
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.seller.toLowerCase().includes(query) ||
        product.dorm.toLowerCase().includes(query)
      )
    }
    
    // Apply category filter
    if (selectedFilters.category?.length > 0) {
      filtered = filtered.filter(product => {
        const productCategory = product.category.toLowerCase().replace(/\s+/g, '-')
        return selectedFilters.category.some(cat => {
          if (cat === 'textbooks') return product.category === 'Textbooks'
          if (cat === 'dorm') return product.category === 'Dorm Essentials'
          if (cat === 'electronics') return product.category === 'Electronics'
          if (cat === 'sports') return product.category === 'Sports'
          if (cat === 'uniforms') return product.category === 'Uniforms'
          if (cat === 'arts') return product.category === 'Arts'
          return false
        })
      })
    }
    
    // Apply condition filter
    if (selectedFilters.condition?.length > 0) {
      filtered = filtered.filter(product => {
        return selectedFilters.condition.some(cond => {
          if (cond === 'new') return product.condition === 'New'
          if (cond === 'like-new') return product.condition === 'Like New'
          if (cond === 'good') return product.condition === 'Good'
          if (cond === 'fair') return product.condition === 'Fair'
          return false
        })
      })
    }
    
    // Apply price filter
    if (selectedFilters.price?.length > 0) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price.slice(1))
        return selectedFilters.price.some(range => {
          if (range === '0-25') return price < 25
          if (range === '25-50') return price >= 25 && price < 50
          if (range === '50-100') return price >= 50 && price < 100
          if (range === '100-200') return price >= 100 && price < 200
          if (range === '200+') return price >= 200
          return false
        })
      })
    }
    
    // Apply sorting
    if (selectedSort.value === 'price-asc') {
      filtered.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)))
    } else if (selectedSort.value === 'price-desc') {
      filtered.sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)))
    } else if (selectedSort.value === 'newest') {
      // Sort by posted date (would need actual dates in real app)
      filtered.reverse()
    }
    
    return filtered
  }, [searchQuery, selectedFilters, selectedSort, combinedProducts])

  return (
    <>
      <div className="bg-white">
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />
          
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-maroon-500 focus:outline-hidden"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              
              {/* Mobile Filters */}
              <form className="mt-4">
                {filters.map((section) => (
                  <Disclosure key={section.name} as="div" className="border-t border-gray-200 pt-4 pb-4">
                    <fieldset>
                      <legend className="w-full px-2">
                        <DisclosureButton className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                          <span className="text-sm font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="size-5 rotate-0 transform group-data-open:-rotate-180"
                            />
                          </span>
                        </DisclosureButton>
                      </legend>
                      <DisclosurePanel className="px-4 pt-4 pb-2">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center justify-between">
                              <div className="flex gap-3">
                                <div className="flex h-5 shrink-0 items-center">
                                  <div className="group grid size-4 grid-cols-1">
                                    <input
                                      defaultValue={option.value}
                                      id={`${section.id}-${optionIdx}-mobile`}
                                      name={`${section.id}[]`}
                                      type="checkbox"
                                      onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}
                                      className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-maroon-600 checked:bg-maroon-600 indeterminate:border-maroon-600 indeterminate:bg-maroon-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                    />
                                    <svg
                                      fill="none"
                                      viewBox="0 0 14 14"
                                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                    >
                                      <path
                                        d="M3 8L6 11L11 3.5"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-checked:opacity-100"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <label htmlFor={`${section.id}-${optionIdx}-mobile`} className="text-sm text-gray-500">
                                  {option.label}
                                </label>
                              </div>
                              {option.count && (
                                <span className="text-xs text-gray-400">({option.count})</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </fieldset>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
          {/* Header */}
          <div className="border-b border-gray-200 pt-16 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Browse All Listings</h1>
            <p className="mt-4 text-base text-gray-500">
              Discover great deals from your fellow students across all categories
            </p>
            
            {/* Search Bar */}
            <div className="mt-6 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for textbooks, electronics, dorm essentials..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 text-sm placeholder-gray-500 focus:border-maroon-500 focus:outline-none focus:ring-1 focus:ring-maroon-500"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedFilters).map(([filterId, values]) =>
                    values.map(value => {
                      const filter = filters.find(f => f.id === filterId)
                      const option = filter?.options.find(o => o.value === value)
                      return (
                        <span
                          key={`${filterId}-${value}`}
                          className="inline-flex items-center gap-1 rounded-full bg-maroon-50 px-3 py-1 text-sm text-maroon-700"
                        >
                          {option?.label}
                          <button
                            onClick={() => handleFilterChange(filterId, value, false)}
                            className="ml-1 hover:text-maroon-900"
                          >
                            <XMarkIcon className="h-3 w-3" />
                          </button>
                        </span>
                      )
                    })
                  )}
                  <button
                    onClick={() => setSelectedFilters({})}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Filters and Product Grid */}
          <div className="pt-6 pb-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>
              
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center lg:hidden"
              >
                <span className="text-sm font-medium text-gray-700">Filters</span>
                <FunnelIcon aria-hidden="true" className="ml-1 size-5 shrink-0 text-gray-400" />
                {activeFiltersCount > 0 && (
                  <span className="ml-2 rounded-full bg-maroon-600 px-2 py-0.5 text-xs text-white">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              
              {/* Desktop Filters */}
              <div className="hidden lg:block">
                <form className="divide-y divide-gray-200">
                  {filters.map((section) => (
                    <div key={section.name} className="py-6 first:pt-0 last:pb-0">
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                        <div className="space-y-3 pt-6">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center justify-between">
                              <div className="flex gap-3">
                                <div className="flex h-5 shrink-0 items-center">
                                  <div className="group grid size-4 grid-cols-1">
                                    <input
                                      defaultValue={option.value}
                                      id={`${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      type="checkbox"
                                      onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}
                                      className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-maroon-600 checked:bg-maroon-600 indeterminate:border-maroon-600 indeterminate:bg-maroon-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                    />
                                    <svg
                                      fill="none"
                                      viewBox="0 0 14 14"
                                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                    >
                                      <path
                                        d="M3 8L6 11L11 3.5"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-checked:opacity-100"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <label htmlFor={`${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                                  {option.label}
                                </label>
                              </div>
                              {option.count && (
                                <span className="text-xs text-gray-400">({option.count})</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))}
                </form>

                {/* Create Alert */}
                <div className="mt-10 rounded-lg bg-maroon-50 p-4">
                  <h3 className="text-sm font-medium text-maroon-900">Can't find what you need?</h3>
                  <p className="mt-1 text-sm text-maroon-700">
                    Create an alert and we'll notify you when it's posted.
                  </p>
                  <button className="mt-3 text-sm font-medium text-maroon-600 hover:text-maroon-700">
                    Create alert →
                  </button>
                </div>
              </div>
            </aside>
            
            {/* Product Grid */}
            <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
              <h2 id="product-heading" className="sr-only">Products</h2>
              
              {/* Sort Options */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-900">{filteredProducts.length}</span> results
                </div>
                <div className="flex items-center">
                  <label htmlFor="sort" className="mr-2 text-sm text-gray-500">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={selectedSort.value}
                    onChange={(e) => setSelectedSort(sortOptions.find(o => o.value === e.target.value) || sortOptions[0])}
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:border-maroon-500 focus:outline-none focus:ring-1 focus:ring-maroon-500"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Products */}
              <div className="grid grid-cols-2 gap-3 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                {filteredProducts.length === 0 ? (
                  <div className="col-span-full py-12 text-center">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.03 }}
                    className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow"
                  >
                    <div className="relative">
                      <div 
                        className="aspect-square bg-gray-200 cursor-pointer"
                        onClick={() => handleQuickView(product)}
                      >
                        <Image
                          alt={product.imageAlt}
                          src={product.imageSrc}
                          width={400}
                          height={400}
                          className="object-cover w-full h-full group-hover:opacity-90 transition-opacity"
                        />
                      </div>
                      {(product.badge || product.isUserListing) && (
                        <div className="absolute top-2 left-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                            product.isUserListing ? 'bg-purple-100 text-purple-800' :
                            product.badge === 'Hot Deal' ? 'bg-red-100 text-red-800' :
                            product.badge === 'Top Rated' ? 'bg-maroon-100 text-maroon-800' :
                            product.badge === 'New' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {product.isUserListing ? 'Your Listing' : product.badge}
                          </span>
                        </div>
                      )}
                      <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                        <BookmarkIcon className="h-5 w-5 text-gray-600" />
                      </button>
                      <div className="absolute bottom-2 left-2">
                        <span className="inline-flex items-center rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-gray-700">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-1 flex-col p-4">
                      <h3 
                        className="text-sm font-medium text-gray-900 cursor-pointer hover:text-maroon-600"
                        onClick={() => handleQuickView(product)}
                      >
                        {product.name}
                      </h3>
                      
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${product.conditionColor}`}>
                          {product.condition}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPinIcon className="h-3 w-3 mr-1" />
                          {product.dorm}
                        </div>
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-500">
                        by <Link href={`/profile/${product.sellerId}`} className="hover:text-maroon-600 hover:underline">{product.seller}</Link> • {product.postedDate}
                      </div>
                      
                      <div className="mt-auto pt-4">
                        <div className="flex items-baseline gap-2">
                          <p className="text-lg font-semibold text-gray-900">{product.price}</p>
                          <p className="text-sm text-gray-500 line-through">{product.originalPrice}</p>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleMessageSeller(product)}
                          className="mt-3 w-full inline-flex items-center justify-center rounded-lg bg-maroon-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-maroon-700 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:ring-offset-2 transition-colors"
                        >
                          <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                          Message Seller
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                  ))
                )}
              </div>

              {/* Load More */}
              <div className="mt-8 text-center">
                <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:ring-offset-2">
                  Load more listings
                </button>
              </div>
            </section>
          </div>
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