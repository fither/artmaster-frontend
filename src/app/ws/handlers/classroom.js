import {
  addClassroom,
  removeClassroom,
  setClassrooms,
  updateClassroom,
} from 'app/main/apps/classrooms/store/classroomsSlice';

const handleClassroom = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setClassrooms(data));
      break;
    case 'add':
      dispatch(addClassroom(data));
      break;
    case 'update':
      dispatch(updateClassroom(data));
      break;
    case 'remove':
      dispatch(removeClassroom(data));
      break;
    default:
      break;
  }
};

export default handleClassroom;
