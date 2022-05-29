import { combineReducers } from '@reduxjs/toolkit';
import orders from './ordersSlice';
import products from './productsSlice';
import assignments from './assignmentsSlice';

const reducer = combineReducers({
  products,
  orders,
  assignments,
});

export default reducer;
