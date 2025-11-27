import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCachedData, setCachedData } from '../utils/cache';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const cacheKey = 'categories';
        
        // Check cache first
        const cachedCategories = getCachedData(cacheKey);
        if (cachedCategories) {
          setCategories(cachedCategories);
          setLoading(false);
          return;
        }
        
        const response = await axios.get('https://dummyjson.com/products/categories');
        
        // Cache the categories
        setCachedData(cacheKey, response.data);
        setCategories(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch categories');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

