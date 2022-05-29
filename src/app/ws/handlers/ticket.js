import {
  addTicket,
  removeTicket,
  setTickets,
  updateTicket,
} from 'app/main/apps/tickets/store/ticketsSlice';

const handleTicket = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setTickets(data));
      break;
    case 'add':
      dispatch(addTicket(data));
      break;
    case 'remove':
      dispatch(removeTicket(data));
      break;
    case 'reply':
      dispatch(updateTicket(data));
      break;
    default:
      break;
  }
};

export default handleTicket;
