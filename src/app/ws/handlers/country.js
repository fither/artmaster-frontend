import {
  setAvailableCountries,
  setCountries,
  setStates,
} from 'app/main/apps/users/store/countriesSlice';

const handleCountry = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setCountries(data));
      break;
    case 'findStates':
      dispatch(setStates(data));
      break;
    case 'findAvailable':
      dispatch(setAvailableCountries(data));
      break;
    default:
      break;
  }
};

export default handleCountry;
