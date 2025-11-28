"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useProductDetail } from '../hooks/useProductDetail';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductDetailModal({ productId, onClose }) {
  const { product, loading, error } = useProductDetail(productId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!productId) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-0 sm:p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg sm:rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto my-2 sm:my-8 relative"
        >
          {loading && (
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="animate-pulse">
                <div className="h-48 sm:h-64 lg:h-96 bg-gray-200 rounded-lg mb-4 sm:mb-6" />
                <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4 mb-3 sm:mb-4" />
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-5/6" />
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 sm:p-6 lg:p-8 text-center">
              <p className="text-red-600 mb-4 text-sm sm:text-base">{error}</p>
              <button
                onClick={onClose}
                className="px-4 sm:px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          )}

          {product && (
            <>
              <button
                onClick={onClose}
                className="sticky top-2 sm:absolute sm:top-4 right-2 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors ml-auto mb-2 sm:mb-0"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
                <div>
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative h-64 sm:h-80 lg:h-96 bg-gray-100 rounded-lg overflow-hidden mb-3 sm:mb-4"
                  >
                    <Image
                      src={product.images?.[currentImageIndex] || product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>

                  {product.images && product.images.length > 1 && (
                    <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all hover:scale-105 active:scale-95 ${
                            currentImageIndex === index ? 'border-primary-600 ring-2 ring-primary-200' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${product.title} ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-start justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 sm:mb-2 leading-tight">{product.title}</h2>
                      {product.brand && (
                        <p className="text-sm sm:text-base text-gray-600 font-medium">Brand: {product.brand}</p>
                      )}
                    </div>
                    {product.discountPercentage > 0 && (
                      <span className="flex-shrink-0 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        -{Math.round(product.discountPercentage)}%
                      </span>
                    )}
                  </div>

                  {product.category && (
                    <span className="inline-block px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 capitalize">
                      {product.category}
                    </span>
                  )}

                  <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            index < Math.round(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                          } fill-current`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{product.rating?.toFixed(1)}</span>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-baseline gap-2 sm:gap-3">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600">${product.price}</span>
                      {product.discountPercentage > 0 && (
                        <span className="text-base sm:text-lg lg:text-xl text-gray-400 line-through">
                          ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1.5 sm:mb-2">Description</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{product.description}</p>
                  </div>

                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2.5 sm:p-3 bg-gray-50 rounded-lg gap-1 sm:gap-2">
                      <span className="text-sm sm:text-base text-gray-700 font-medium">Availability</span>
                      <span className={`text-sm sm:text-base font-semibold ${
                        product.stock > 50 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>

                    {product.warrantyInformation && (
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2.5 sm:p-3 bg-gray-50 rounded-lg gap-1 sm:gap-2">
                        <span className="text-sm sm:text-base text-gray-700 font-medium">Warranty</span>
                        <span className="text-sm sm:text-base text-gray-900 sm:text-right">{product.warrantyInformation}</span>
                      </div>
                    )}

                    {product.shippingInformation && (
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2.5 sm:p-3 bg-gray-50 rounded-lg gap-1 sm:gap-2">
                        <span className="text-sm sm:text-base text-gray-700 font-medium">Shipping</span>
                        <span className="text-sm sm:text-base text-gray-900 sm:text-right">{product.shippingInformation}</span>
                      </div>
                    )}

                    {product.returnPolicy && (
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2.5 sm:p-3 bg-gray-50 rounded-lg gap-1 sm:gap-2">
                        <span className="text-sm sm:text-base text-gray-700 font-medium">Return Policy</span>
                        <span className="text-sm sm:text-base text-gray-900 sm:text-right">{product.returnPolicy}</span>
                      </div>
                    )}
                  </div>

                  <button
                    className="w-full py-3 sm:py-4 bg-primary-600 text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-primary-700 active:bg-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

