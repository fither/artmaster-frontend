import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openNewClassroomDialog } from './store/classroomsSlice';

function ClassroomsToolbar(props) {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between w-full p-24">
      <div className="flex items-center">
        <Button
          variant="contained"
          color="primary"
          className="w-full mt-2"
          onClick={() => dispatch(openNewClassroomDialog())}
        >
          New Classroom
        </Button>
      </div>
    </div>
  );
}

export default ClassroomsToolbar;
