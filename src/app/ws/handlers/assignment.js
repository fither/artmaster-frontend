import { setAssignments } from 'app/main/apps/e-commerce/store/assignmentsSlice';
import { setClassrooms } from 'app/main/apps/locations/store/classroomsSlice';

const handleAssignment = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setAssignments(data));
      break;
    case 'findAllByLocationId':
      dispatch(setClassrooms(data));
      break;
    case 'add':
      ws.sendMessage('assignment/findAll');
      break;
    case 'remove':
      ws.sendMessage('assignment/findAll');
      break;
    default:
      break;
  }
};

export default handleAssignment;
