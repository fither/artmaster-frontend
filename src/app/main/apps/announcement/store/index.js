import { combineReducers } from '@reduxjs/toolkit';
import announcements from './announcementsSlice';
import categories from './categoriesSlice';

const reducer = combineReducers({
  announcements,
  categories,
});

export default reducer;
