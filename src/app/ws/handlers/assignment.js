import { setAssignments } from 'app/main/apps/e-commerce/store/assignmentsSlice';
import { setClassroomAssignments } from 'app/main/apps/classrooms/store/assignmentsSlice';

const handleAssignment = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setAssignments(data));
      break;
    case 'findAllByClassroomId':
      dispatch(setClassroomAssignments(data));
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
