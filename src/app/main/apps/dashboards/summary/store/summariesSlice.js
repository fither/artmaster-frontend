import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSummaries = createAsyncThunk(
  'summaryDashboardApp/summaries/getSummaries',
  async () => {
    const response = await axios.get('/api/summary-dashboard-app/summaries');
    return response.data;
  }
);

const summariesAdapter = createEntityAdapter({});

export const {
  selectAll: selectSummaries,
  selectEntities: selectSummariesEntities,
  selectById: selectSummaryById,
} = summariesAdapter.getSelectors((state) => state.summaryDashboardApp.summaries);

const summariesSlice = createSlice({
  name: 'summaryDashboardApp/summaries',
  initialState: summariesAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getSummaries.fulfilled]: summariesAdapter.setAll,
  },
});

export default summariesSlice.reducer;
