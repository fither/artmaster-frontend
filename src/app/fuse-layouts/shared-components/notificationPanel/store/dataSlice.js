import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const notificationsAdapter = createEntityAdapter({});

const initialState = notificationsAdapter.upsertMany(notificationsAdapter.getInitialState(), []);

export const { selectAll: selectNotifications, selectById: selectNotificationsById } =
  notificationsAdapter.getSelectors((state) => state.notificationPanel.data);

const dataSlice = createSlice({
  name: 'notificationPanel/data',
  initialState,
  reducers: {
    dismissItem: (state, action) => notificationsAdapter.removeOne(state, action.payload),
    dismissAll: (state, action) => notificationsAdapter.removeAll(state),
    addNotification: (state, action) => notificationsAdapter.addOne(state, action.payload),
  },
  extraReducers: {},
});

export const { dismissItem, dismissAll, addNotification } = dataSlice.actions;

export default dataSlice.reducer;
