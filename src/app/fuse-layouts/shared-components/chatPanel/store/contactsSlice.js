import { createSlice } from '@reduxjs/toolkit';

import { closeChatPanel } from './stateSlice';

const contactsSlice = createSlice({
  name: 'chatPanel/contacts',
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
  extraReducers: {
    [closeChatPanel]: (state, action) => {
      state.selectedContactId = null;
    },
  },
});

export const { setSelectedContactId, removeSelectedContactId } = contactsSlice.actions;

export default contactsSlice.reducer;
