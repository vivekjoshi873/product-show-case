'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { memo } from 'react';

const ProductCard = memo(function ProductCard({ product, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onClick={() => onClick(product.id)}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
    >
      <div className="relative h-64 bg-gray-50 overflow-hidden group">
        <Image
          src={product.thumbnail || product.images?.[0] || '/placeholder.png'}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading={index < 4 ? 'eager' : 'lazy'}
          quality={85}
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.title}
        </h3>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary-600">
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              {product.rating?.toFixed(1) || 'N/A'}
            </span>
          </div>
        </div>
        
        {product.stock !== undefined && (
          <div className="mt-3 text-sm">
            <span className={`${product.stock > 50 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'} font-medium`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default ProductCard;

