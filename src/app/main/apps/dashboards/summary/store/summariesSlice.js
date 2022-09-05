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
  initialState: summariesAdapter.getInitialState({
    selectedCountryCode: '',
  }),
  reducers: {
    setSelectedCountryCode: (state, action) => {
      state.selectedCountryCode = action.payload;
    },
  },
  extraReducers: {
    [getSummaries.fulfilled]: summariesAdapter.setAll,
  },
});

export const { setSelectedCountryCode } = summariesSlice.actions;

export default summariesSlice.reducer;
