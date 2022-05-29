import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const notesAdapter = createEntityAdapter({});

export const {
  selectAll: selectNotes,
  selectEntities: selectNotesEntities,
  selectById: selectNoteById,
} = notesAdapter.getSelectors((state) => state.notesApp.notes);

const notesSlice = createSlice({
  name: 'notesApp/notes',
  initialState: notesAdapter.getInitialState({
    searchText: '',
    noteDialogId: null,
    variateDescSize: true,
  }),
  reducers: {
    setNotesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setNotes: (state, data) => notesAdapter.setAll(state, data.payload),
    addNote: (state, data) => notesAdapter.addOne(state, data.payload),
    updateNote: (state, data) => notesAdapter.upsertOne(state, data.payload),
    removeNote: (state, data) => notesAdapter.removeOne(state, data.payload),
    resetNotesSearchText: (state, action) => {
      state.searchText = '';
    },
    toggleVariateDescSize: (state, action) => {
      state.variateDescSize = !state.variateDescSize;
    },
    openNoteDialog: (state, action) => {
      state.noteDialogId = action.payload;
    },
    closeNoteDialog: (state, action) => {
      state.noteDialogId = action.null;
    },
  },
  extraReducers: {},
});

export const {
  setNotes,
  addNote,
  updateNote,
  removeNote,
  setNotesSearchText,
  resetNotesSearchText,
  toggleVariateDescSize,
  openNoteDialog,
  closeNoteDialog,
} = notesSlice.actions;

export default notesSlice.reducer;
