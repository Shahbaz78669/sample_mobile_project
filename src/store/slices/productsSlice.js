import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../../services/api';

const initialState = {
  items: [],
  isLoading: false,
  isFetchingMore: false,
  error: null,
  skip: 0,
  hasMore: true,
  query: '',
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async ({ query, refresh = false }, { getState }) => {
    const state = getState();
    const currentQuery = query !== undefined ? query : state.products.query;
    const skip = refresh ? 0 : state.products.skip;
    const limit = 20;

    const data = await fetchProducts(skip, limit, currentQuery);
    return { data, refresh, query: currentQuery };
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        const { refresh } = action.meta.arg;
        if (refresh || state.items.length === 0) {
          state.isLoading = true;
        } else {
          state.isFetchingMore = true;
        }
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        const { data, refresh, query } = action.payload;
        
        state.isLoading = false;
        state.isFetchingMore = false;
        state.query = query;
        
        if (refresh) {
          state.items = data.products;
        } else {
          // append but filter out duplicates just in case
          const newItems = data.products.filter(
            (p) => !state.items.find((item) => item.id === p.id)
          );
          state.items = [...state.items, ...newItems];
        }
        
        state.skip += data.products.length;
        state.hasMore = state.skip < data.total && data.products.length > 0;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isFetchingMore = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setQuery } = productsSlice.actions;
export default productsSlice.reducer;
