import { showMessage } from 'app/store/fuse/messageSlice';
import handleAuth from './handlers/auth';
import handleUser from './handlers/user';
import handleEvent from './handlers/event';
import handleTodo from './handlers/todo';
import handleContact from './handlers/contact';
import handleNote from './handlers/note';
import handleLocation from './handlers/location';
import handleAssignment from './handlers/assignment';
import handleLabel from './handlers/label';
import handleTicket from './handlers/ticket';
import handleChat from './handlers/chat';
import handleCountry from './handlers/country';
import handleRole from './handlers/role';
import handleOrder from './handlers/order';
import handleProduct from './handlers/product';
import handleAnnouncement from './handlers/announcement';
import handleMail from './handlers/mail';

const handleMessage = (handlePayload) => {
  switch (handlePayload.eventRoot) {
    case 'auth':
      handleAuth(handlePayload);
      break;
    case 'user':
      handleUser(handlePayload);
      break;
    case 'event':
      handleEvent(handlePayload);
      break;
    case 'todo':
      handleTodo(handlePayload);
      break;
    case 'contact':
      handleContact(handlePayload);
      break;
    case 'note':
      handleNote(handlePayload);
      break;
    case 'location':
      handleLocation(handlePayload);
      break;
    case 'assignment':
      handleAssignment(handlePayload);
      break;
    case 'label':
      handleLabel(handlePayload);
      break;
    case 'ticket':
      handleTicket(handlePayload);
      break;
    case 'message':
      handleChat(handlePayload);
      break;
    case 'country':
      handleCountry(handlePayload);
      break;
    case 'role':
      handleRole(handlePayload);
      break;
    case 'order':
      handleOrder(handlePayload);
      break;
    case 'product':
      handleProduct(handlePayload);
      break;
    case 'announcement':
      handleAnnouncement(handlePayload);
      break;
    case 'mail':
      handleMail(handlePayload);
      break;
    case 'error':
      handlePayload.dispatch(showMessage({ message: handlePayload.data }));
      break;
    default:
      break;
  }
};

export default handleMessage;
