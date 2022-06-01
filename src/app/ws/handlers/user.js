import { updateUserDataNew } from 'app/auth/store/userSlice';
import { addNonContactUser } from 'app/main/apps/contacts/store/contactsSlice';
import { setFindedUsers } from 'app/main/apps/contacts/store/searchUsersSlice';
import { setExternalUser, setUsers } from 'app/main/apps/users/store/usersSlice';
import { setDefaultSettings } from 'app/store/fuse/settingsSlice';

const handleUser = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setUsers(data));
      break;
    case 'add':
      ws.sendMessage('user/findAll');
      break;
    case 'remove':
      ws.sendMessage('user/findAll');
      break;
    case 'update':
      ws.sendMessage('user/findAll');
      break;
    case 'activate':
      ws.sendMessage('user/findAll');
      break;
    case 'deactivate':
      ws.sendMessage('user/findAll');
      break;
    case 'search':
      dispatch(setFindedUsers(data));
      break;
    case 'updateUserSettings':
      dispatch(setDefaultSettings(data));
      break;
    case 'updateUserData':
      dispatch(updateUserDataNew(data));
      break;
    case 'updateUserInfo':
      dispatch(updateUserDataNew(data));
      break;
    case 'whois':
      dispatch(addNonContactUser(data));
      break;
    case 'findOne':
      dispatch(setExternalUser(data));
      break;
    default:
      break;
  }
};

export default handleUser;
