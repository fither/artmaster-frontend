import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts, selectById: selectContactsById } =
  contactsAdapter.getSelectors((state) => state.contactsApp.contacts);

const initialState = {
  nonContactUsers: {},
  searchText: '',
  routeParams: {},
  contactDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

const contactsSlice = createSlice({
  name: 'contactsApp/contacts',
  initialState: contactsAdapter.getInitialState(initialState),
  reducers: {
    addNonContactUser: (state, data) => {
      state.nonContactUsers[data.payload.id] = data.payload;
    },
    setContacts: (state, contacts) => {
      contactsAdapter.setAll(state, contacts);
    },
    addContact: (state, data) => {
      contactsAdapter.addOne(state, data.payload);
    },
    removeContact: (state, data) => {
      contactsAdapter.removeOne(state, data.payload);
    },
    openNewContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
    setInitialContacts: (state, action) => contactsAdapter.getInitialState(initialState),
  },
  extraReducers: {},
});

export const {
  setContacts,
  addContact,
  removeContact,
  setContactsSearchText,
  openNewContactDialog,
  closeNewContactDialog,
  openEditContactDialog,
  closeEditContactDialog,
  addNonContactUser,
  setInitialContacts,
} = contactsSlice.actions;

export default contactsSlice.reducer;
