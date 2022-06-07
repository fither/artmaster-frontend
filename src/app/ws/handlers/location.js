import {
  addLocation,
  removeLocation,
  setLocations,
  setLocationsLoading,
  updateLocation,
} from 'app/main/apps/locations/store/locationsSlice';

const handleLocation = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setLocations(data));
      dispatch(setLocationsLoading(false));
      break;
    case 'add':
      dispatch(addLocation(data));
      break;
    case 'update':
      dispatch(updateLocation(data));
      break;
    case 'remove':
      dispatch(removeLocation(data));
      break;
    default:
      break;
  }
};

export default handleLocation;
