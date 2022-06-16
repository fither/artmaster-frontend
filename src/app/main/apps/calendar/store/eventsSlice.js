import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

const eventsAdapter = createEntityAdapter({});

export const {
  selectAll: selectEvents,
  selectIds: selectEventIds,
  selectById: selectEventById,
} = eventsAdapter.getSelectors((state) => state.calendarApp.events);

const initialState = {
  eventDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

const eventsSlice = createSlice({
  name: 'calendarApp/events',
  initialState: eventsAdapter.getInitialState(initialState),
  reducers: {
    openNewEventDialog: {
      prepare: (event) => {
        const payload = {
          type: 'new',
          props: {
            open: true,
          },
          data: {
            start: event.start,
            end: event.end,
          },
        };
        return { payload };
      },
      reducer: (state, action) => {
        state.eventDialog = action.payload;
      },
    },
    openEditEventDialog: {
      prepare: (event) => {
        const payload = {
          type: 'edit',
          props: {
            open: true,
          },
          data: {
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          },
        };
        return { payload };
      },
      reducer: (state, action) => {
        state.eventDialog = action.payload;
      },
    },
    setEvents: (state, data) => eventsAdapter.setAll(state, data.payload),
    addEvent: (state, data) => eventsAdapter.addOne(state, data.payload),
    updateEvent: (state, data) => eventsAdapter.upsertOne(state, data.payload),
    removeEvent: (state, data) => eventsAdapter.removeOne(state, data.payload),
    closeNewEventDialog: (state, action) => {
      state.eventDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    closeEditEventDialog: (state, action) => {
      state.eventDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
    setInitialEvents: (state, action) => eventsAdapter.getInitialState(initialState),
  },
  extraReducers: {},
});

export const {
  setEvents,
  addEvent,
  updateEvent,
  removeEvent,
  openNewEventDialog,
  closeNewEventDialog,
  openEditEventDialog,
  closeEditEventDialog,
  setInitialEvents,
} = eventsSlice.actions;

export default eventsSlice.reducer;
