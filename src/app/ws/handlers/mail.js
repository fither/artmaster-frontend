import { setMails } from '../../main/apps/mail/store/mailsSlice';

const handleMail = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setMails(data));
      break;
    default:
      break;
  }
};

export default handleMail;
