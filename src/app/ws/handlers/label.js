import { setLabels } from 'app/main/apps/notes/store/labelsSlice';

const handleLabel = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setLabels(data));
      break;
    case 'update':
      ws.sendMessage('label/findAll');
      break;
    default:
      break;
  }
};

export default handleLabel;
