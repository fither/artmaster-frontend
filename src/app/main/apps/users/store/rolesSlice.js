import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const rolesAdapter = createEntityAdapter({});

export const {
  selectAll: selectRoles,
  selectById,
  selectRoleById,
} = rolesAdapter.getSelectors((state) => state.usersApp.roles);

const rolesSlice = createSlice({
  name: 'usersApp/roles',
  initialState: rolesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setRoles: (state, roles) => rolesAdapter.setAll(state, roles),
    setRolesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
});

export const { setRolesSearchText, setRoles } = rolesSlice.actions;

export default rolesSlice.reducer;
