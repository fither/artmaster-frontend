import { combineReducers } from '@reduxjs/toolkit';
import chat from './chatSlice';
import contacts from './contactsSlice';
import sidebars from './sidebarsSlice';

const reducer = combineReducers({
  sidebars,
  contacts,
  chat,
});

export default reducer;
