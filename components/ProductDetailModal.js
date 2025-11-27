'use client';

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
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto my-8"
        >
          {loading && (
            <div className="p-8">
              <div className="animate-pulse">
                <div className="h-96 bg-gray-200 rounded-lg mb-6" />
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            </div>
          )}

          {error && (
            <div className="p-8 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          )}

          {product && (
            <>
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Images Section */}
                <div>
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative h-96 bg-gray-100 rounded-lg overflow-hidden mb-4"
                  >
                    <Image
                      src={product.images?.[currentImageIndex] || product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>

                  {/* Thumbnail Gallery */}
                  {product.images && product.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {product.images.map((image, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                            currentImageIndex === index ? 'border-primary-600' : 'border-gray-200'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${product.title} ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h2>
                      {product.brand && (
                        <p className="text-gray-600 font-medium">Brand: {product.brand}</p>
                      )}
                    </div>
                    {product.discountPercentage > 0 && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        -{Math.round(product.discountPercentage)}%
                      </span>
                    )}
                  </div>

                  {product.category && (
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-4 capitalize">
                      {product.category}
                    </span>
                  )}

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg
                          key={index}
                          className={`w-5 h-5 ${
                            index < Math.round(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                          } fill-current`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-700 font-medium">{product.rating?.toFixed(1)}</span>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-primary-600">${product.price}</span>
                      {product.discountPercentage > 0 && (
                        <span className="text-xl text-gray-400 line-through">
                          ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Availability</span>
                      <span className={`font-semibold ${
                        product.stock > 50 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>

                    {product.warrantyInformation && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">Warranty</span>
                        <span className="text-gray-900">{product.warrantyInformation}</span>
                      </div>
                    )}

                    {product.shippingInformation && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">Shipping</span>
                        <span className="text-gray-900">{product.shippingInformation}</span>
                      </div>
                    )}

                    {product.returnPolicy && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">Return Policy</span>
                        <span className="text-gray-900">{product.returnPolicy}</span>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

