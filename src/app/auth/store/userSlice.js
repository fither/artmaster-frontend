import { createSlice } from '@reduxjs/toolkit';
import 'firebase/compat/auth';
import history from '@history';
import _ from '@lodash';
import { setDefaultSettings, setInitialSettings } from 'app/store/fuse/settingsSlice';
import settingsConfig from 'app/fuse-configs/settingsConfig';
import { setInitialMails } from 'app/main/apps/mail/store/mailsSlice';
import { setInitialEvents } from 'app/main/apps/calendar/store/eventsSlice';
import { setInitialContacts } from 'app/main/apps/contacts/store/contactsSlice';
import { setInitialNotes } from 'app/main/apps/notes/store/notesSlice';
import { setInitialTodos } from 'app/main/apps/todo/store/todosSlice';
import { setInitialChats } from 'app/main/apps/chat/store/chatSlice';
import { setInitialLabels } from 'app/main/apps/notes/store/labelsSlice';

export const updateUserDataNew = (data) => (dispatch, getState) => {
  const oldUser = getState().auth.user;
  const newUser = _.merge({}, oldUser, { data: { ...data }, authCompleted: true });
  dispatch(setUser(newUser));
};

export const setUserData = (user) => async (dispatch, getState) => {
  if (user.data.settings.loginRedirectUrl) {
    settingsConfig.loginRedirectUrl = user.data.settings.loginRedirectUrl;
  }

  settingsConfig.loginRedirectUrl = '/apps/dashboards/analytics';

  const newUser = {
    from: 'custom-db',
    ...user,
    authCompleted: true,
  };

  dispatch(setDefaultSettings(newUser.data.settings));
  dispatch(setUser(newUser));
};

export const updateUserShortcuts = (shortcuts) => async (dispatch, getState) => {
  const { user } = getState().auth;
  const newUser = {
    ...user,
    data: {
      ...user.data,
      shortcuts,
    },
  };

  dispatch(updateUserData(newUser));

  return dispatch(setUserData(newUser));
};

export const logoutUser = () => async (dispatch, getState) => {
  settingsConfig.loginRedirectUrl = '/login';

  history.push({
    pathname: '/login',
  });

  dispatch(setInitialSettings());

  window.localStorage.removeItem('jwt_access_token');

  dispatch(setInitialLabels());
  dispatch(setInitialChats());
  dispatch(setInitialTodos());
  dispatch(setInitialNotes());
  dispatch(setInitialContacts());
  dispatch(setInitialEvents());
  dispatch(setInitialMails());
  dispatch(userLoggedOut());
  return dispatch(setAuthCompleted(true));
};

export const updateUserData = (user, ws) => {
  ws.sendMessage('user/updateUserSettings', user);
};

const initialState = {
  authCompleted: false,
  role: [], // guest
  data: {
    displayName: 'John Doe',
    photoURL: 'assets/images/avatars/Velazquez.jpg',
    email: 'johndoe@withinpixels.com',
    shortcuts: ['calendar', 'mail', 'contacts', 'todo'],
  },
};

const userSlice = createSlice({
  name: 'auth/user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    userLoggedOut: (state, action) => initialState,
    setAuthCompleted: (state, action) => {
      state.authCompleted = action.payload;
    },
  },
  extraReducers: {},
});

export const { setUser, userLoggedOut, setAuthCompleted } = userSlice.actions;

export default userSlice.reducer;
