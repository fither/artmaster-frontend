import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const assignmentsAdapter = createEntityAdapter({});

export const { selectAll: selectClassroomAssignments, selectById: selectClassroomAssignmentById } =
  assignmentsAdapter.getSelectors((state) => state.classroomsApp.assignments);

const initialState = {
  loading: false,
  assignmentDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

const assignmentsSlice = createSlice({
  name: 'classroomsApp/assignments',
  initialState: assignmentsAdapter.getInitialState(initialState),
  reducers: {
    setClassroomAssignments: (state, action) => {
      assignmentsAdapter.setAll(state, action.payload);
    },
    addClassroomAssignment: (state, action) => {
      assignmentsAdapter.addOne(state, action.payload);
    },
    updateClassroomAssignment: (state, action) => {
      assignmentsAdapter.upsertOne(state, action.payload);
    },
    removeClassroomAssignment: (state, action) => {
      assignmentsAdapter.removeOne(state, action.payload);
    },
    openNewClassroomAssignmentDialog: (state, action) => {
      state.assignmentDialog = {
        type: 'new',
        props: { open: true },
        data: null,
      };
    },
    openEditClassroomAssignmentDialog: (state, action) => {
      state.assignmentDialog = {
        type: 'edit',
        props: { open: true },
        data: action.payload,
      };
    },
    closeClassroomAssignmentDialog: (state, action) => {
      state.assignmentDialog = initialState.assignmentDialog;
    },
  },
  extraReducers: {},
});

export const {
  setClassroomAssignments,
  addClassroomAssignment,
  updateClassroomAssignment,
  removeClassroomAssignment,
  openNewClassroomAssignmentDialog,
  openEditClassroomAssignmentDialog,
  closeClassroomAssignmentDialog,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
