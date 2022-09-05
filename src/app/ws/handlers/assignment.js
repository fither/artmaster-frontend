import {
  setAssignments,
  setAssignmentsLoading,
  updateAssignment,
} from 'app/main/apps/e-commerce/store/assignmentsSlice';
import { setClassroomAssignments } from 'app/main/apps/classrooms/store/assignmentsSlice';

const handleAssignment = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setAssignments(data));
      break;
    case 'findAllByClassroomId':
      dispatch(setClassroomAssignments(data));
      break;
    case 'toggleDone':
      dispatch(updateAssignment(data));
      dispatch(setAssignmentsLoading(false));
      break;
    case 'toggleFlag':
      dispatch(updateAssignment(data));
      dispatch(setAssignmentsLoading(false));
      break;
    case 'add':
      ws.sendMessage('assignment/findAll');
      break;
    case 'update':
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
