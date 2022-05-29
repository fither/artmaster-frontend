import { combineReducers } from '@reduxjs/toolkit';
import contacts from './contactsSlice';
import state from './stateSlice';

const reducer = combineReducers({
  contacts,
  state,
});

export default reducer;
