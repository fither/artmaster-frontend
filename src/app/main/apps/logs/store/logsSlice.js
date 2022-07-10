import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const logsAdapter = createEntityAdapter({});

export const { selectAll: selectLogs, selectById: selectLogById } = logsAdapter.getSelectors(
  (state) => state.logsApp.logs
);

const logsSlice = createSlice({
  name: 'logsApp/logs',
  initialState: logsAdapter.getInitialState({
    searchText: '',
    logFilterType: '-',
    rowsPerPage: 10,
    dataCount: 0,
    pageCount: 1,
    pageIndex: 0,
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
      logsAdapter.setAll(state, action.payload.rows);
      state.dataCount = action.payload.count;
      state.pageCount = Math.floor(action.payload.count / state.rowsPerPage);
    },
    setLogsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLogFilterType: (state, action) => {
      state.logFilterType = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setLogsSearchText,
  setLogs,
  setLogsLoading,
  setLogFilterType,
  setRowsPerPage,
  setPageIndex,
} = logsSlice.actions;

export default logsSlice.reducer;
