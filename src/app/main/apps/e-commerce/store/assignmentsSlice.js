import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const assignmentsAdapter = createEntityAdapter({});

export const { selectAll: selectAssignments } = assignmentsAdapter.getSelectors(
  (state) => state.eCommerceApp.assignments
);

const assignmentSlice = createSlice({
  name: 'eCommerceApp/assignments',
  initialState: assignmentsAdapter.getInitialState({
    loading: true,
    searchText: '',
    assignmentDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setAssignmentsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setAssignments: (state, data) => {
      assignmentsAdapter.setAll(state, data.payload);
      state.loading = false;
    },
    setAssignmentsLoading: (state, data) => {
      state.loading = data.payload;
    },
  },
});

export const { setAssignments, setAssignmentsLoading, setAssignmentsSearchText } =
  assignmentSlice.actions;

export default assignmentSlice.reducer;
