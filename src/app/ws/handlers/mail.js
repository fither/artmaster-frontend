import { showMessage } from 'app/store/fuse/messageSlice';
import { setLabels } from '../../main/apps/mail/store/labelsSlice';
import {
  setMailInitialized,
  setMailInitializing,
  setMails,
  setMailsLoading,
} from '../../main/apps/mail/store/mailsSlice';

const handleMail = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setMails(data));
      dispatch(setMailsLoading(false));
      break;
    case 'initialize':
      // dispatch(setMailsLoading(true));
      dispatch(setMailInitialized(true));
      dispatch(setMailInitializing(false));
      dispatch(showMessage({ message: 'Mail client initialized' }));
      // ws.sendMessage('mail/findAll', 'INBOX');
      break;
    case 'findLabels':
      dispatch(setLabels(data));
      break;
    default:
      break;
  }
};

export default handleMail;
