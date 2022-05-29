import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const filters = [
  {
    id: 0,
    handle: 'starred',
    title: 'Starred',
    icon: 'star',
  },
  {
    id: 1,
    handle: 'important',
    title: 'Priority',
    icon: 'error',
  },
  {
    id: 2,
    handle: 'dueDate',
    title: 'Sheduled',
    icon: 'schedule',
  },
  {
    id: 3,
    handle: 'today',
    title: 'Today',
    icon: 'today',
  },
  {
    id: 4,
    handle: 'completed',
    title: 'Done',
    icon: 'check',
  },
  {
    id: 5,
    handle: 'deleted',
    title: 'Deleted',
    icon: 'delete',
  },
];

export const getFilters = () => (dispatch, getState) => {
  dispatch(setFilters(filters));
};

const filtersAdapter = createEntityAdapter({});

export const { selectAll: selectFilters, selectById: selectFilterById } =
  filtersAdapter.getSelectors((state) => state.todoApp.filters);

const filtersSlice = createSlice({
  name: 'todoApp/filters',
  initialState: filtersAdapter.getInitialState({}),
  reducers: {
    setFilters: (state, data) => {
      filtersAdapter.setAll(state, data.payload);
    },
  },
  extraReducers: {},
});

export const { setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
