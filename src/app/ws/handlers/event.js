import {
  addEvent,
  removeEvent,
  setEvents,
  updateEvent,
} from 'app/main/apps/calendar/store/eventsSlice';

const handleEvent = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setEvents(data));
      break;
    case 'add':
      dispatch(addEvent(data));
      break;
    case 'update':
      dispatch(updateEvent(data));
      break;
    case 'remove':
      dispatch(removeEvent(data));
      break;
    default:
      break;
  }
};

export default handleEvent;
