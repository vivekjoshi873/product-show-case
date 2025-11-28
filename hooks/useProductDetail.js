import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCachedData, setCachedData } from '../utils/cache';

export const useProductDetail = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const cacheKey = `product-${id}`;
        
        const cachedProduct = getCachedData(cacheKey);
        if (cachedProduct) {
          setProduct(cachedProduct);
          setLoading(false);
          return;
        }
        
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setCachedData(cacheKey, response.data);
        setProduct(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch product details');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

