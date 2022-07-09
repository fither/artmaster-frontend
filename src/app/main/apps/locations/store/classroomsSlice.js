import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const classroomsAdapter = createEntityAdapter({});

export const { selectAll: selectClassrooms, selectById: selectClassroomById } =
  classroomsAdapter.getSelectors((state) => state.locationsApp.classrooms);

const classroomsSlice = createSlice({
  name: 'locationsApp/classrooms',
  initialState: classroomsAdapter.getInitialState({
    loading: false,
    classroomDialog: {
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setClassrooms: (state, action) => {
      classroomsAdapter.setAll(state, action);
    },
    openClassroomDialog: (state, action) => {
      state.classroomDialog = {
        data: action.payload,
        props: {
          open: true,
        },
      };
    },
    closeClassroomDialog: (state, action) => {
      state.classroomDialog = {
        data: null,
        props: {
          open: false,
        },
      };
    },
    setClassroomsLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {},
});

export const { setClassrooms, setClassroomsLoading, openClassroomDialog, closeClassroomDialog } =
  classroomsSlice.actions;

export default classroomsSlice.reducer;
