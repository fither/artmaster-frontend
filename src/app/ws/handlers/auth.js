import { logoutUser, setUserData } from 'app/auth/store/userSlice';

const handleAuth = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'signin':
      dispatch(setUserData(data));
      localStorage.setItem('jwt_access_token', data.accessToken);
      prepareUser(ws);
      break;
    case 'signInWithToken':
      dispatch(setUserData(data));
      prepareUser(ws);
      break;
    case 'logout':
      dispatch(logoutUser());
      break;
    default:
      break;
  }
};

const prepareUser = (ws) => {
  ws.sendMessage('contact/findAll');
  ws.sendMessage('note/findAll');
  ws.sendMessage('todo/findAll');
  ws.sendMessage('event/findAll');
  ws.sendMessage('message/findAll');
  ws.sendMessage('country/findAll');
  ws.sendMessage('country/findAvailable');
  ws.sendMessage('role/findAll');
  ws.sendMessage('label/findAll');
};

export default handleAuth;
