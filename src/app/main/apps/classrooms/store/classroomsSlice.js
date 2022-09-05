import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const classroomsAdapter = createEntityAdapter({});

export const { selectAll: selectClassrooms, selectById: selectClassroomById } =
  classroomsAdapter.getSelectors((state) => state.classroomsApp.classrooms);

const classroomsSlice = createSlice({
  name: 'classroomsApp/classrooms',
  initialState: classroomsAdapter.getInitialState({
    searchText: '',
    loading: false,
    classroomDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
    customerInfoDialog: {
      props: { open: false },
      data: null,
    },
    customerInfoLoading: false,
  }),
  reducers: {
    setClassroomsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setClassrooms: (state, action) => {
      classroomsAdapter.setAll(state, action);
    },
    addClassroom: (state, action) => classroomsAdapter.addOne,
    updateClassroom: (state, action) => classroomsAdapter.upsertOne,
    removeClassroom: (state, action) => classroomsAdapter.removeOne,
    openEditClassroomDialog: (state, action) => {
      state.classroomDialog = {
        type: 'edit',
        data: action.payload,
        props: {
          open: true,
        },
      };
    },
    openNewClassroomDialog: (state, action) => {
      state.classroomDialog = {
        type: 'new',
        data: null,
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
    openCustomerInfoDialog: (state, action) => {
      state.customerInfoDialog = {
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeCustomerInfoDialog: (state, action) => {
      state.customerInfoDialog = {
        props: {
          open: false,
        },
        data: null,
      };
    },
    setCustomerInfoLoading: (state, action) => {
      state.customerInfoLoading = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setClassroomsSearchText,
  setClassrooms,
  addClassroom,
  updateClassroom,
  removeClassroom,
  setClassroomsLoading,
  openNewClassroomDialog,
  openEditClassroomDialog,
  closeClassroomDialog,
  openCustomerInfoDialog,
  closeCustomerInfoDialog,
  setCustomerInfoLoading,
} = classroomsSlice.actions;

export default classroomsSlice.reducer;
