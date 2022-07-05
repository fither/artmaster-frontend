import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const ordersAdapter = createEntityAdapter({});

export const { selectAll: selectOrders, selectById: selectOrderById } = ordersAdapter.getSelectors(
  (state) => state.eCommerceApp.orders
);

const ordersSlice = createSlice({
  name: 'eCommerceApp/orders',
  initialState: ordersAdapter.getInitialState({
    searchText: '',
    loading: false,
    selectedCountry: '0',
    orderDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setOrdersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setOrders: (state, data) => {
      ordersAdapter.setAll(state, data.payload);
    },
    setOrdersLoading: (state, data) => {
      state.loading = data.payload;
    },
    openNewOrderDialog: (state, action) => {
      state.orderDialog = {
        type: 'new',
        props: { open: true },
        data: {
          locationId: '',
          orderIds: action.payload,
        },
      };
    },
    closeNewOrderDialog: (state, action) => {
      state.orderDialog = {
        type: 'new',
        props: { open: false },
        data: null,
      };
    },
    openEditOrderDialog: (state, action) => {
      state.orderDialog = {
        type: 'edit',
        props: { open: true },
        data: action.payload,
      };
    },
    closeEditOrderDialog: (state, action) => {
      state.orderDialog = {
        type: 'edit',
        props: { open: false },
        data: action.payload,
      };
    },
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setOrders,
  setOrdersLoading,
  setOrdersSearchText,
  openNewOrderDialog,
  closeNewOrderDialog,
  openEditOrderDialog,
  closeEditOrderDialog,
  setSelectedCountry,
} = ordersSlice.actions;

export default ordersSlice.reducer;
