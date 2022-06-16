import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: null,
  contactsToSetMessagesAsRead: [],
};

const chatSlice = createSlice({
  name: 'chatApp/chat',
  initialState,
  reducers: {
    setMessages: (state, data) => {
      state.messages = data.payload;
    },
    addContactToSetMessagesAsRead: (state, data) => {
      state.contactsToSetMessagesAsRead.push(data.payload);
    },
    removeContactFromSetMessagesAsRead: (state, data) => {
      state.contactsToSetMessagesAsRead = state.contactsToSetMessagesAsRead.filter(
        (c) => c !== data.payload
      );
    },
    addMessage: (state, data) => {
      const message = data.payload;
      const otherUserId = message.isFromYou
        ? parseInt(message.receiverId, 10)
        : parseInt(message.senderId, 10);
      if (!state.messages) {
        state.messages = {};
      }
      if (!state.messages[otherUserId]) {
        state.messages[otherUserId] = [];
      }
      state.messages[otherUserId] = [...state.messages[otherUserId], message];
    },
    removeChat: (state, action) => action.payload,
    setInitialChats: (state, action) => initialState,
  },
  extraReducers: {},
});

export const {
  setMessages,
  addMessage,
  addContactToSetMessagesAsRead,
  removeContactFromSetMessagesAsRead,
  setInitialChats,
} = chatSlice.actions;

export default chatSlice.reducer;
