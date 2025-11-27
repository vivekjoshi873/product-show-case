import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCachedData, setCachedData } from '../utils/cache';

export const useProducts = (limit = 12, skip = 0, category = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let url;
        let cacheKey;
        
        if (category && category !== 'all') {
          url = `https://dummyjson.com/products/category/${category}`;
          cacheKey = `products-${category}-${skip}-${limit}`;
        } else {
          url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
          cacheKey = `products-all-${skip}-${limit}`;
        }

        // Check cache first
        const cachedData = getCachedData(cacheKey);
        if (cachedData) {
          setProducts(cachedData.products);
          setTotal(cachedData.total);
          setLoading(false);
          return;
        }

        const response = await axios.get(url);
        
        // If category is selected, handle pagination manually
        let productsData, totalCount;
        if (category && category !== 'all') {
          const allProducts = response.data.products;
          totalCount = allProducts.length;
          productsData = allProducts.slice(skip, skip + limit);
        } else {
          productsData = response.data.products;
          totalCount = response.data.total;
        }
        
        // Cache the results
        setCachedData(cacheKey, { products: productsData, total: totalCount });
        
        setProducts(productsData);
        setTotal(totalCount);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, skip, category]);

  return { products, loading, error, total };
};

