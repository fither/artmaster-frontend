import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const folders = [
  {
    id: 0,
    handle: 'all',
    title: 'All',
    icon: 'view_headline',
  },
];

export const getFolders = () => (dispatch, getState) => {
  dispatch(setFolders(folders));
};

const foldersAdapter = createEntityAdapter({});

export const { selectAll: selectFolders, selectById: selectFolderById } =
  foldersAdapter.getSelectors((state) => state.todoApp.folders);

const foldersSlice = createSlice({
  name: 'todoApp/folders',
  initialState: foldersAdapter.getInitialState({}),
  reducers: {
    setFolders: (state, data) => {
      foldersAdapter.setAll(state, data.payload);
    },
  },
  extraReducers: {},
});

export const { setFolders } = foldersSlice.actions;

export default foldersSlice.reducer;
