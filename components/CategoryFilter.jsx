'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange, loading }) {
  const [showAll, setShowAll] = useState(false);
  
  const displayCategories = showAll ? categories : categories.slice(0, 8);

  if (loading) {
    return (
      <div className="flex gap-2 flex-wrap mb-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
      <div className="flex gap-2 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange('all')}
          className={`px-5 py-2 rounded-full font-medium transition-all shadow-sm ${
            selectedCategory === 'all'
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          All Products
        </motion.button>
        
        {displayCategories.map((category) => (
          <motion.button
            key={category.slug}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category.slug)}
            className={`px-5 py-2 rounded-full font-medium transition-all capitalize shadow-sm ${
              selectedCategory === category.slug
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category.name}
          </motion.button>
        ))}
        
        {categories.length > 8 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(!showAll)}
            className="px-5 py-2 rounded-full font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all shadow-sm"
          >
            {showAll ? 'Show Less' : `+${categories.length - 8} More`}
          </motion.button>
        )}
      </div>
    </div>
  );
}

