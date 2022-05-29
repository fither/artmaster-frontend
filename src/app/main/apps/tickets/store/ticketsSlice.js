import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const ticketsAdapter = createEntityAdapter({});

export const { selectAll: selectTickets, selectById: selectTicketsById } =
  ticketsAdapter.getSelectors((state) => state.ticketsApp.tickets);

const ticketsSlice = createSlice({
  name: 'ticketsApp/tickets',
  initialState: ticketsAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    replyDialogOpen: false,
    ticketDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setTickets: (state, data) => {
      ticketsAdapter.setAll(state, data.payload);
    },
    addTicket: (state, data) => {
      ticketsAdapter.addOne(state, data.payload);
    },
    removeTicket: (state, data) => {
      ticketsAdapter.removeOne(state, data.payload);
    },
    updateTicket: (state, data) => {
      ticketsAdapter.upsertOne(state, data.payload);
    },
    openNewTicketDialog: (state, action) => {
      state.ticketDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewTicketDialog: (state, action) => {
      state.ticketDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditTicketDialog: (state, action) => {
      state.ticketDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditTicketDialog: (state, action) => {
      state.ticketDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
    setReplyDialogopen: (state, action) => {
      state.replyDialogOpen = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setTickets,
  addTicket,
  removeTicket,
  updateTicket,
  setTicketsSearchText,
  openNewTicketDialog,
  closeNewTicketDialog,
  openEditTicketDialog,
  closeEditTicketDialog,
  setReplyDialogopen,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
