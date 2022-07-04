import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const logsAdapter = createEntityAdapter({});

export const { selectAll: selectLogs, selectById: selectLogById } = logsAdapter.getSelectors(
  (state) => state.logsApp.logs
);

const logsSlice = createSlice({
  name: 'logsApp/logs',
  initialState: logsAdapter.getInitialState({
    searchText: '',
    loading: false,
  }),
  reducers: {
    setLogsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setLogs: (state, action) => {
      logsAdapter.setAll(state, action.payload);
    },
    setLogsLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {},
});

export const { setLogsSearchText, setLogs, setLogsLoading } = logsSlice.actions;

export default logsSlice.reducer;
