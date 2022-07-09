import { combineReducers } from '@reduxjs/toolkit';
import locations from './locationsSlice';
import classrooms from './classroomsSlice';

const reducer = combineReducers({
  locations,
  classrooms,
});

export default reducer;
