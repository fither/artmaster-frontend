import { combineReducers } from '@reduxjs/toolkit';
import locations from './locationsSlice';

const reducer = combineReducers({
  locations,
});

export default reducer;
