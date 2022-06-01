import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUsersById } = usersAdapter.getSelectors(
  (state) => state.usersApp.users
);

const usersSlice = createSlice({
  name: 'usersApp/users',
  initialState: usersAdapter.getInitialState({
    searchText: '',
    loading: false,
    routeParams: {},
    externalUser: null,
    externalUserLoading: false,
    userDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setUsersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setUsers: (state, users) => {
      usersAdapter.setAll(state, users);
      state.loading = false;
    },
    openNewUserDialog: (state, action) => {
      state.userDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewUserDialog: (state, action) => {
      state.userDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditUserDialog: (state, action) => {
      state.userDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditUserDialog: (state, action) => {
      state.userDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
    setExternalUser: (state, action) => {
      state.externalUser = action.payload;
    },
    setUsersLoading: (state, action) => {
      state.loading = action.payload;
    },
    setExternalUserLoading: (state, action) => {
      state.externalUserLoading = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setUsers,
  setUsersSearchText,
  openNewUserDialog,
  closeNewUserDialog,
  openEditUserDialog,
  closeEditUserDialog,
  setUsersLoading,
  setExternalUser,
  setExternalUserLoading,
} = usersSlice.actions;

export default usersSlice.reducer;
