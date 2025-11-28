"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import Pagination from "../components/Pagination";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";
import ErrorMessage from "../components/ErrorMessage";
import Image from "next/image";
const ProductDetailModal = dynamic(
  () => import("../components/ProductDetailModal"),
  { ssr: false }
);

const PRODUCTS_PER_PAGE = 12;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const { products, loading, error, total } = useProducts(
    PRODUCTS_PER_PAGE,
    skip,
    selectedCategory
  );
  const { categories, loading: categoriesLoading } = useCategories();

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const sortedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    const productsCopy = [...products];

    switch (sortBy) {
      case "price-asc":
        return productsCopy.sort((a, b) => a.price - b.price);
      case "price-desc":
        return productsCopy.sort((a, b) => b.price - a.price);
      case "title-asc":
        return productsCopy.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return productsCopy.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return productsCopy;
    }
  }, [products, sortBy]);

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleSortChange = useCallback((sort) => {
    setSortBy(sort);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleProductClick = useCallback((id) => {
    setSelectedProductId(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProductId(null);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white shadow-md sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 min-w-0 flex items-center gap-3"
            >
              <Image
                src="/favicon.ico"
                alt="Logo"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 cursor-pointer"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex-shrink-0"
            >
              <SortDropdown
                selectedSort={sortBy}
                onSortChange={handleSortChange}
              />
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            loading={categoriesLoading}
          />
        </motion.div>

        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-gray-600"
          >
            Showing {sortedProducts.length > 0 ? skip + 1 : 0}-
            {Math.min(skip + PRODUCTS_PER_PAGE, total)} of {total} products
          </motion.div>
        )}

        {error && (
          <ErrorMessage
            message={error}
            onRetry={() => window.location.reload()}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {loading ? (
            <ProductSkeleton count={PRODUCTS_PER_PAGE} />
          ) : (
            sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
                index={index}
              />
            ))
          )}
        </div>

        {!loading && !error && sortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Try selecting a different category
              </p>
            </div>
          </motion.div>
        )}

        {!loading && !error && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {selectedProductId && (
        <ProductDetailModal
          productId={selectedProductId}
          onClose={handleCloseModal}
        />
      )}

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              © 2025 Showcase Explorer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
