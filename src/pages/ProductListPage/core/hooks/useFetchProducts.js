import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../../config.js';

function useFetchProducts(page, value) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${config.API_URL}?offset=${page}&search=${value}`);
        setProducts((prevProducts) => [...prevProducts, ...res.data]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, value]);

  return { products, loading, error };
}

export default useFetchProducts;
