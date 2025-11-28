'use client';

import { useState } from 'react';

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange, loading }) {
  const [showAll, setShowAll] = useState(false);
  
  const displayCategories = showAll ? categories : categories.slice(0, 8);

  if (loading) {
    return (
      <div className="mb-8">
        <div className="h-7 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
        <div className="flex gap-2 overflow-x-auto md:flex-wrap pb-2 scrollbar-hide">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-10 w-24 flex-shrink-0 bg-gray-200 rounded-full animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Categories</h2>
      
      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden relative">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
          <button
            onClick={() => onCategoryChange('all')}
            className={`flex-shrink-0 px-4 sm:px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-sm snap-start ${
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white shadow-lg hover:bg-primary-700 hover:shadow-xl'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md hover:border-gray-400'
            } active:scale-95`}
          >
            All Products
          </button>
          
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => onCategoryChange(category.slug)}
              className={`flex-shrink-0 px-4 sm:px-5 py-2 rounded-full font-medium transition-all duration-300 capitalize shadow-sm whitespace-nowrap snap-start ${
                selectedCategory === category.slug
                  ? 'bg-primary-600 text-white shadow-lg hover:bg-primary-700 hover:shadow-xl'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md hover:border-gray-400'
              } active:scale-95`}
            >
              {category.name}
            </button>
          ))}
        </div>
        {/* Scroll indicator */}
        <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
      </div>
      
      {/* Desktop: Flex wrap with show more */}
      <div className="hidden md:flex gap-2 flex-wrap">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-sm ${
            selectedCategory === 'all'
              ? 'bg-primary-600 text-white shadow-lg hover:bg-primary-700 hover:shadow-xl'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md hover:border-gray-400'
          } transform hover:-translate-y-0.5 active:translate-y-0`}
        >
          All Products
        </button>
        
        {displayCategories.map((category) => (
          <button
            key={category.slug}
            onClick={() => onCategoryChange(category.slug)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 capitalize shadow-sm ${
              selectedCategory === category.slug
                ? 'bg-primary-600 text-white shadow-lg hover:bg-primary-700 hover:shadow-xl'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md hover:border-gray-400'
            } transform hover:-translate-y-0.5 active:translate-y-0`}
          >
            {category.name}
          </button>
        ))}
        
        {categories.length > 8 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-5 py-2 rounded-full font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md transition-all duration-300 shadow-sm transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {showAll ? 'Show Less' : `+${categories.length - 8} More`}
          </button>
        )}
      </div>
    </div>
  );
}

