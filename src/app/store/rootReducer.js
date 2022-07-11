import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import chatApp from 'app/main/apps/chat/store';
import notesApp from 'app/main/apps/notes/store';
import contactsApp from 'app/main/apps/contacts/store';
import todoApp from 'app/main/apps/todo/store';
import calendarApp from 'app/main/apps/calendar/store';
import usersApp from 'app/main/apps/users/store';
import locationsApp from 'app/main/apps/locations/store';
import classroomsApp from 'app/main/apps/classrooms/store';
import fuse from './fuse';
import i18n from './i18nSlice';

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    auth,
    fuse,
    i18n,
    chatApp,
    notesApp,
    contactsApp,
    todoApp,
    calendarApp,
    usersApp,
    locationsApp,
    classroomsApp,
    ...asyncReducers,
  });

  /*
  Reset the redux store when user logged out
   */
  if (action.type === 'auth/user/userLoggedOut') {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
