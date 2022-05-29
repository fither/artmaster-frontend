import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter({});

export const { selectAll: selectMessages, selectById: selectMessageById } =
  messagesAdapter.getSelectors((state) => state.chatApp.chat);

const chatSlice = createSlice({
  name: 'chatApp/chat',
  initialState: {
    messages: null,
    contactsToSetMessagesAsRead: [],
  },
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
  },
  extraReducers: {},
});

export const {
  setMessages,
  addMessage,
  addContactToSetMessagesAsRead,
  removeContactFromSetMessagesAsRead,
} = chatSlice.actions;

export default chatSlice.reducer;
