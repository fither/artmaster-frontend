import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.eCommerceApp.products);

const productsSlice = createSlice({
  name: 'eCommerceApp/products',
  initialState: productsAdapter.getInitialState({
    searchText: '',
    loading: true,
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
  },
  extraReducers: {},
});

export const { setProductsSearchText, setProducts } = productsSlice.actions;

export default productsSlice.reducer;
