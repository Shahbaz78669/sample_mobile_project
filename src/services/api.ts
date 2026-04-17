import { ProductsResponse } from '../types';

const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async (
  skip: number = 0,
  limit: number = 20,
  query: string = ''
): Promise<ProductsResponse> => {
  try {
    const url = query.trim()
      ? `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`
      : `${BASE_URL}/products?skip=${skip}&limit=${limit}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data: ProductsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
