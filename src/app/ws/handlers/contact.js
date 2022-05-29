import { addContact, removeContact, setContacts } from 'app/main/apps/contacts/store/contactsSlice';

const handleContact = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setContacts(data));
      break;
    case 'add':
      dispatch(addContact(data));
      break;
    case 'remove':
      dispatch(removeContact(data));
      break;
    default:
      break;
  }
};

export default handleContact;
