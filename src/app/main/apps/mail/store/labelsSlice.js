import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const labelsAdapter = createEntityAdapter({});

export const {
  selectAll: selectLabels,
  selectEntities: selectLabelsEntities,
  selectById: selectLabelById,
} = labelsAdapter.getSelectors((state) => state.mailApp.labels);

const labelsSlice = createSlice({
  name: 'mailApp/labels',
  initialState: labelsAdapter.getInitialState({
    initialized: false,
  }),
  reducers: {
    setLabels: (state, action) => {
      labelsAdapter.setAll(state, action.payload);
    },
    setLabelsInitialized: (state, action) => {
      state.initialized = action.payload;
    },
  },
});

export const { setLabels, setLabelsInitialized } = labelsSlice.actions;

export default labelsSlice.reducer;
