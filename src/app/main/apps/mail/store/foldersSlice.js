import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const folders = [
  {
    id: 0,
    handle: 'INBOX',
    title: 'Inbox',
    translate: 'INBOX',
    icon: 'inbox',
  },
  {
    id: 1,
    handle: 'SENT',
    title: 'Sent',
    translate: 'SENT',
    icon: 'send',
  },
  {
    id: 2,
    handle: 'DRAFT',
    title: 'Draft',
    translate: 'DRAFT',
    icon: 'email_open',
  },
  {
    id: 3,
    handle: 'SPAM',
    title: 'Spam',
    translate: 'SPAM',
    icon: 'error',
  },
  {
    id: 4,
    handle: 'TRASH',
    title: 'Trash',
    translate: 'TRASH',
    icon: 'delete',
  },
];

const foldersAdapter = createEntityAdapter({});

export const { selectAll: selectFolders, selectById: selectFolderById } =
  foldersAdapter.getSelectors((state) => state.mailApp.folders);

const foldersSlice = createSlice({
  name: 'mailApp/folders',
  initialState: foldersAdapter.getInitialState({}),
  reducers: {
    setFolders: (state, action) => {
      foldersAdapter.setAll(state, folders);
    },
  },
  extraReducers: {},
});

export const { setFolders } = foldersSlice.actions;

export default foldersSlice.reducer;
