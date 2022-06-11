import { setMailInitialized, setMails, setMailsLoading } from 'app/main/apps/mail/store/mailsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';

const handleError = ({ onEvent, data, dispatch, ws }) => {
  dispatch(showMessage({ message: data }));
  console.log(onEvent);
  switch (onEvent) {
    case 'mail/findAll':
      dispatch(
        setMails({
          messages: [],
          nextPageToken: '',
        })
      );
      dispatch(setMailsLoading(false));
      // sorry for hardcoding :/
      if (data === 'Not signed in with Gmail') {
        dispatch(setMailInitialized(false));
      }
      break;
    default:
      break;
  }
};

export default handleError;
