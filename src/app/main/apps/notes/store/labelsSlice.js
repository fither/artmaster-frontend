import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const labelsAdapter = createEntityAdapter({});

export const {
  selectAll: selectLabels,
  selectEntities: selectLabelsEntities,
  selectById: selectLabelById,
} = labelsAdapter.getSelectors((state) => state.notesApp.labels);

const labelsSlice = createSlice({
  name: 'notesApp/labels',
  initialState: labelsAdapter.getInitialState({ labelsDialogOpen: false }),
  reducers: {
    setLabels: (state, action) => {
      labelsAdapter.setAll(state, action.payload);
    },
    openLabelsDialog: (state, action) => {
      state.labelsDialogOpen = true;
    },
    closeLabelsDialog: (state, action) => {
      state.labelsDialogOpen = false;
    },
    setInitialLabels: (state, action) => labelsAdapter.getInitialState({ labelsDialogOpen: false }),
  },
  extraReducers: {},
});

export const { openLabelsDialog, closeLabelsDialog, setLabels, setInitialLabels } =
  labelsSlice.actions;

export default labelsSlice.reducer;
