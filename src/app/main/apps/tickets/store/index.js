import { combineReducers } from '@reduxjs/toolkit';
import tickets from './ticketsSlice';

const reducer = combineReducers({
  tickets,
});

export default reducer;
