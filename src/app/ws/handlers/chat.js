import NotificationModel from 'app/fuse-layouts/shared-components/notificationPanel/model/NotificationModel';
import { addNotification } from 'app/fuse-layouts/shared-components/notificationPanel/store/dataSlice';
import {
  addContactToSetMessagesAsRead,
  addMessage,
  setMessages,
} from 'app/main/apps/chat/store/chatSlice';

const handleChat = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'send':
      dispatch(addMessage(data));
      if (!data.isFromYou) {
        dispatch(
          addNotification(
            NotificationModel({
              message: data.message,
              options: {
                variant: 'success',
                type: 'message',
              },
              title: `${data.senderFirstName} ${data.senderLastName}`,
            })
          )
        );
      }
      break;
    case 'findAll':
      dispatch(setMessages(data));
      break;
    case 'setMessagesAsRead':
      dispatch(addContactToSetMessagesAsRead(data));
      break;
    default:
      break;
  }
};

export default handleChat;
