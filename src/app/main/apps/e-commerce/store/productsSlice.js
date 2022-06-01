import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.eCommerceApp.products);

const productsSlice = createSlice({
  name: 'eCommerceApp/products',
  initialState: productsAdapter.getInitialState({
    searchText: '',
    loading: false,
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setProducts: (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.loading = false;
    },
    setProductsLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {},
});

export const { setProductsSearchText, setProducts, setProductsLoading } = productsSlice.actions;

export default productsSlice.reducer;
