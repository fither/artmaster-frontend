import { combineReducers } from '@reduxjs/toolkit';
import classrooms from './classroomsSlice';
import assignments from './assignmentsSlice';

const reducer = combineReducers({
  classrooms,
  assignments,
});

export default reducer;
