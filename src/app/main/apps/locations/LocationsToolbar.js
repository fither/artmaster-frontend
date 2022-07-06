import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openNewLocationDialog } from './store/locationsSlice';

function LocationsToolbar(props) {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between w-full p-24">
      <div className="flex items-center">
        <Button
          variant="contained"
          color="primary"
          className="w-full mt-2"
          onClick={() => dispatch(openNewLocationDialog())}
        >
          New Location
        </Button>
      </div>
      <div className="flex" />
    </div>
  );
}

export default LocationsToolbar;
