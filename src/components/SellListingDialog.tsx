"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { 
  PlusCircleIcon,
  PhotoIcon,
  XMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useStore } from '@/store/useStore'
import { motion, AnimatePresence } from 'motion/react'

interface SellListingDialogProps {
  trigger?: React.ReactNode
}

// Categories for dropdown
const categories = [
  'Textbooks',
  'Dorm Essentials', 
  'Electronics',
  'Sports & Recreation',
  'School Uniforms',
  'Art & Music',
  'Other'
]

// Conditions for radio buttons
const conditions = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { value: 'like-new', label: 'Like New', color: 'bg-green-100 text-green-800' },
  { value: 'good', label: 'Good', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'fair', label: 'Fair', color: 'bg-orange-100 text-orange-800' }
]

// Dorm locations
const dormLocations = [
  'North Campus',
  'South Campus',
  'East Campus', 
  'West Campus',
  'Central Campus',
  'Library',
  'Student Center',
  'Dining Hall',
  'Meet Anywhere'
]

export function SellListingDialog({ trigger }: SellListingDialogProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { createListing, saveDraft, draftListing, clearDraft } = useStore()
  
  // Form state
  const [formData, setFormData] = React.useState({
    name: draftListing?.name || '',
    category: draftListing?.category || '',
    condition: draftListing?.condition || 'like-new',
    price: draftListing?.price || '',
    originalPrice: draftListing?.originalPrice || '',
    description: draftListing?.description || '',
    meetupLocation: draftListing?.meetupLocation || '',
    imageSrc: draftListing?.imageSrc || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    imageAlt: draftListing?.imageAlt || ''
  })
  
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = React.useState(false)
  
  // Auto-save draft
  React.useEffect(() => {
    if (formData.name || formData.description) {
      const timer = setTimeout(() => {
        saveDraft(formData)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [formData, saveDraft])
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Title is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.price.trim()) newErrors.price = 'Price is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.meetupLocation) newErrors.meetupLocation = 'Pickup location is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    // Get condition color
    const conditionObj = conditions.find(c => c.value === formData.condition)
    
    // Create the listing
    createListing({
      name: formData.name,
      category: formData.category,
      condition: conditionObj?.label || 'Good',
      conditionColor: conditionObj?.color || 'bg-yellow-100 text-yellow-800',
      price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`,
      originalPrice: formData.originalPrice ? 
        (formData.originalPrice.startsWith('$') ? formData.originalPrice : `$${formData.originalPrice}`) : 
        undefined,
      description: formData.description,
      meetupLocation: formData.meetupLocation,
      imageSrc: formData.imageSrc,
      imageAlt: formData.imageAlt || formData.name
    })
    
    // Show success message
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setOpen(false)
      // Reset form
      setFormData({
        name: '',
        category: '',
        condition: 'like-new',
        price: '',
        originalPrice: '',
        description: '',
        meetupLocation: '',
        imageSrc: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        imageAlt: ''
      })
      clearDraft()
    }, 2000)
  }

  const content = (
    <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", isDesktop ? "" : "px-4")}>
      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg"
          >
            <CheckCircleIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Listing created successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Image Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
        <div className="flex gap-2">
          <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
            <img 
              src={formData.imageSrc} 
              alt="Product" 
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            className="w-24 h-24 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center"
          >
            <PhotoIcon className="h-8 w-8 text-gray-400" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">First photo will be the main image</p>
      </div>
      
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="What are you selling?"
          className={cn(
            "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500",
            errors.name ? "border-red-500" : "border-gray-300"
          )}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>
      
      {/* Category & Condition */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={cn(
              "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500",
              errors.category ? "border-red-500" : "border-gray-300"
            )}
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Condition <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.condition}
            onChange={(e) => handleInputChange('condition', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500"
          >
            {conditions.map(cond => (
              <option key={cond.value} value={cond.value}>{cond.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Price */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              id="price"
              type="text"
              value={formData.price.replace('$', '')}
              onChange={(e) => handleInputChange('price', e.target.value)}
              placeholder="0.00"
              className={cn(
                "w-full pl-7 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500",
                errors.price ? "border-red-500" : "border-gray-300"
              )}
            />
          </div>
          {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
        </div>
        
        <div>
          <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Original Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              id="originalPrice"
              type="text"
              value={formData.originalPrice.replace('$', '')}
              onChange={(e) => handleInputChange('originalPrice', e.target.value)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500"
            />
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe your item (condition, features, reason for selling...)"
          rows={3}
          className={cn(
            "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500",
            errors.description ? "border-red-500" : "border-gray-300"
          )}
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.description.length}/500 characters
        </p>
        {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
      </div>
      
      {/* Pickup Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Pickup Location <span className="text-red-500">*</span>
        </label>
        <select
          id="location"
          value={formData.meetupLocation}
          onChange={(e) => handleInputChange('meetupLocation', e.target.value)}
          className={cn(
            "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500",
            errors.meetupLocation ? "border-red-500" : "border-gray-300"
          )}
        >
          <option value="">Select location</option>
          {dormLocations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        {errors.meetupLocation && <p className="text-xs text-red-500 mt-1">{errors.meetupLocation}</p>}
      </div>
      
      {/* Submit Button - Desktop only */}
      {isDesktop && (
        <Button 
          type="submit" 
          className="w-full bg-maroon-600 hover:bg-maroon-700 text-white"
        >
          Create Listing
        </Button>
      )}
    </form>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <button className="flex items-center text-sm font-medium text-maroon-600 hover:text-maroon-700">
              <PlusCircleIcon className="h-5 w-5 mr-1" />
              Sell
            </button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Listing</DialogTitle>
            <DialogDescription>
              List your item for sale. Your listing will be visible to all students immediately.
            </DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger || (
          <button className="flex items-center text-sm font-medium text-maroon-600 hover:text-maroon-700">
            <PlusCircleIcon className="h-5 w-5 mr-1" />
            Sell
          </button>
        )}
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Create New Listing</DrawerTitle>
          <DrawerDescription>
            List your item for sale. Your listing will be visible to all students immediately.
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto">
          {content}
        </div>
        <DrawerFooter className="pt-2">
          <Button 
            type="submit" 
            onClick={handleSubmit}
            className="w-full bg-maroon-600 hover:bg-maroon-700 text-white"
          >
            Create Listing
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}