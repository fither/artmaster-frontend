import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const mailsAdapter = createEntityAdapter({});

export const { selectAll: selectMails, selectById: selectMailById } = mailsAdapter.getSelectors(
  (state) => state.mailApp.mails
);

const initialState = {
  mail: null,
  searchText: '',
  loading: false,
  moreLoading: false,
  shouldRefresh: true,
  mailInitialized: false,
  mailInitializing: false,
  nextPageToken: '',
  prevFolderName: '',
  routeParams: {},
  selectedMailIds: [],
};

const mailsSlice = createSlice({
  name: 'mailApp/mails',
  initialState: mailsAdapter.getInitialState(initialState),
  reducers: {
    setMailsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setMail: (state, action) => {
      state.mail = action.payload;
    },
    setMails: (state, action) => {
      mailsAdapter.setAll(state, action.payload.messages);
      state.nextPageToken = action.payload.nextPageToken;
    },
    addMails: (state, action) => {
      mailsAdapter.addMany(state, action.payload.messages);
      state.nextPageToken = action.payload.nextPageToken;
    },
    markMailAsRead: (state, action) => {
      // console.log(selectMails);
    },
    setMailsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMailsMoreLoading: (state, action) => {
      state.moreLoading = action.payload;
    },
    setMailsShouldRefresh: (state, action) => {
      state.shouldRefresh = action.payload;
    },
    setMailInitialized: (state, action) => {
      state.mailInitialized = action.payload;
    },
    setMailInitializing: (state, action) => {
      state.mailInitializing = action.payload;
    },
    setPrevFolderName: (state, action) => {
      state.prevFolderName = action.payload;
    },
    selectAllMails: (state, action) => {
      state.selectedMailIds = state.ids;
    },
    deselectAllMails: (state, action) => {
      state.selectedMailIds = [];
    },
    selectMailsByParameter: (state, action) => {
      const [parameter, value] = action.payload;
      state.selectedMailIds = state.ids.filter((id) => state.entities[id][parameter] === value);
    },
    toggleInSelectedMails: (state, action) => {
      const mailId = action.payload;
      state.selectedMailIds = state.selectedMailIds.includes(mailId)
        ? state.selectedMailIds.filter((id) => id !== mailId)
        : [...state.selectedMailIds, mailId];
    },
    setInitialMails: (state, action) => mailsAdapter.getInitialState(initialState),
  },
  extraReducers: {},
});

export const {
  setMailsSearchText,
  selectAllMails,
  deselectAllMails,
  selectMailsByParameter,
  toggleInSelectedMails,
  setMails,
  addMails,
  markMailAsRead,
  setMail,
  setMailsLoading,
  setMailsMoreLoading,
  setMailsShouldRefresh,
  setMailInitialized,
  setMailInitializing,
  setPrevFolderName,
  setInitialMails,
} = mailsSlice.actions;

export default mailsSlice.reducer;
