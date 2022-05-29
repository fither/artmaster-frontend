import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const labels = [
  {
    id: 1,
    handle: 'frontend',
    title: 'Frontend',
    color: '#388E3C',
  },
  {
    id: 2,
    handle: 'backend',
    title: 'Backend',
    color: '#F44336',
  },
  {
    id: 3,
    handle: 'api',
    title: 'API',
    color: '#FF9800',
  },
  {
    id: 4,
    handle: 'issue',
    title: 'Issue',
    color: '#0091EA',
  },
  {
    id: 5,
    handle: 'mobile',
    title: 'Mobile',
    color: '#9C27B0',
  },
];

export const getLabels = () => (dispatch, getState) => {
  dispatch(setLabels(labels));
};

const labelsAdapter = createEntityAdapter({});

export const {
  selectAll: selectLabels,
  selectEntities: selectLabelsEntities,
  selectById: selectLabelById,
} = labelsAdapter.getSelectors((state) => state.todoApp.labels);

const labelsSlice = createSlice({
  name: 'todoApp/labels',
  initialState: labelsAdapter.getInitialState(null),
  reducers: {
    setLabels: (state, data) => {
      labelsAdapter.setAll(state, data.payload);
    },
  },
  extraReducers: {},
});

export const { setLabels } = labelsSlice.actions;

export default labelsSlice.reducer;
