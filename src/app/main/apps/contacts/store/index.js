import { combineReducers } from '@reduxjs/toolkit';
import contacts from './contactsSlice';
import searchUsers from './searchUsersSlice';

const reducer = combineReducers({
  searchUsers,
  contacts,
});

export default reducer;
