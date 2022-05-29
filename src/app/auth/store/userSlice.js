import { createSlice } from '@reduxjs/toolkit';
import 'firebase/compat/auth';
import history from '@history';
import _ from '@lodash';
import { setDefaultSettings, setInitialSettings } from 'app/store/fuse/settingsSlice';
import settingsConfig from 'app/fuse-configs/settingsConfig';

export const updateUserDataNew = (data) => (dispatch, getState) => {
  const oldUser = getState().auth.user;
  const newUser = _.merge({}, oldUser, { data: { ...data } });
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

  return dispatch(userLoggedOut());
};

export const updateUserData = (user, ws) => {
  ws.sendMessage('user/updateUserSettings', user);
};

const initialState = {
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
  },
  extraReducers: {},
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
