import { setRoles } from 'app/main/apps/users/store/rolesSlice';

const handleRole = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setRoles(data));
      break;
    default:
      break;
  }
};

export default handleRole;
