import { combineReducers } from '@reduxjs/toolkit';
import users from './usersSlice';
import roles from './rolesSlice';
import countries from './countriesSlice';

const reducer = combineReducers({
  users,
  roles,
  countries,
});

export default reducer;
