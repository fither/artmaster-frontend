import { createContext } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'app/auth/store/userSlice';
import handleMessage from './messageHandler';

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  let socket;
  let ws;

  const dispatch = useDispatch();

  const sendMessage = (event, data) => {
    if (!data) {
      data = '';
    }
    if (socket.readyState === 1) {
      const payload = {
        token: getToken(),
        event,
        data,
      };

      socket.send(JSON.stringify(payload));
    }
  };

  const tryReconnect = () => {
    if (process.env.NODE_ENV === 'development') {
      socket = new WebSocket('ws://localhost:8080', 'echo-protocol');
    } else {
      socket = new WebSocket('wss://artmasterclass.azurewebsites.net', 'echo-protocol');
    }
    console.log('Trying Reconnect');
    socket.onopen = () => {
      const token = getToken();

      if (token) {
        const payload = {
          event: 'auth/signInWithToken',
          data: '',
          token,
        };
        socket.send(JSON.stringify(payload));
      } else {
        dispatch(logoutUser());
      }
    };

    socket.onerror = (err) => {
      console.log(err);
    };

    socket.onclose = () => {
      console.log('Web socket client disconnected');

      setTimeout(() => {
        tryReconnect();
      }, 1000);
    };

    socket.onmessage = (e) => {
      const { event, data, onEvent } = JSON.parse(e.data);
      const eventSplitted = event.split('/');
      const eventRoot = eventSplitted[0];
      const eventAction = eventSplitted[1];

      const handleMessagePayload = {
        eventRoot,
        eventAction,
        onEvent,
        data,
        dispatch,
        ws,
      };

      handleMessage(handleMessagePayload);
    };

    ws = {
      socket,
      sendMessage,
    };
  };

  if (!socket) {
    tryReconnect();
  }

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};

const getToken = () => {
  return window.localStorage.getItem('jwt_access_token');
};
