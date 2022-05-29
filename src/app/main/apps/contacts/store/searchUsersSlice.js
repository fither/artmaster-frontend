import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const searchUsersAdapter = createEntityAdapter({});

export const { selectAll: selectSearchedUsers, selectById: selectSearchedUsersById } =
  searchUsersAdapter.getSelectors((state) => state.contactsApp.searchUsers);

const searchUsersSlice = createSlice({
  name: 'contactsApp/searchUsers',
  initialState: searchUsersAdapter.getInitialState({
    findedUsers: [],
    loading: true,
  }),
  reducers: {
    setFindedUsers: (state, users) => {
      searchUsersAdapter.setAll(state, users);
    },
  },
  extraReducers: {},
});

export const { setLoading, setFindedUsers } = searchUsersSlice.actions;

export default searchUsersSlice.reducer;
