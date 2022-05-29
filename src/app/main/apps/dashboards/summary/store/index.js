import { combineReducers } from '@reduxjs/toolkit';
import summaries from './summariesSlice';
import widgets from './widgetsSlice';

const reducer = combineReducers({
  widgets,
  summaries,
});

export default reducer;
