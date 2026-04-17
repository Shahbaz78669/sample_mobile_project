const BASE_URL = 'https://dummyjson.com';

/**
 * Fetch products from the API
 * @param {number} skip - Number of items to skip
 * @param {number} limit - Maximum number of items
 * @param {string} query - Search query
 * @returns {Promise<Object>} API response with products
 */
export const fetchProducts = async (
  skip = 0,
  limit = 20,
  query = ''
) => {
  try {
    const url = query.trim()
      ? `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`
      : `${BASE_URL}/products?skip=${skip}&limit=${limit}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
