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
    setAssignments: (state, action) => {
      assignmentsAdapter.setAll(state, action.payload);
      state.loading = false;
    },
    updateAssignment: (state, action) => {
      assignmentsAdapter.upsertOne(state, action.payload);
    },
    setAssignmentsLoading: (state, action) => {
      state.loading = action.payload;
    },
    openEditAssignmentDialog: (state, action) => {
      state.assignmentDialog = {
        type: 'edit',
        props: { open: true },
        data: action.payload,
      };
    },
    closeAssignmentDialog: (state, action) => {
      state.assignmentDialog = {
        type: 'new',
        props: { open: false },
        data: null,
      };
    },
  },
});

export const {
  setAssignments,
  setAssignmentsLoading,
  setAssignmentsSearchText,
  updateAssignment,
  openEditAssignmentDialog,
  closeAssignmentDialog,
} = assignmentSlice.actions;

export default assignmentSlice.reducer;
