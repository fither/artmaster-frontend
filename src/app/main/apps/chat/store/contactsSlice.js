import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'chatApp/contacts',
  initialState: {
    selectedContactId: null,
  },
  reducers: {
    setSelectedContactId: (state, action) => {
      state.selectedContactId = action.payload;
    },
    removeSelectedContactId: (state, action) => {
      state.selectedContactId = null;
    },
  },
  extraReducers: {},
});

export const { setSelectedContactId, removeSelectedContactId } = contactsSlice.actions;

export default contactsSlice.reducer;
