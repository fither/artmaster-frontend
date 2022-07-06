import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openNewTicketDialog } from './store/ticketsSlice';

function TicketsToolbar(props) {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between w-full p-24">
      <div className="flex items-center">
        <Button
          variant="contained"
          color="primary"
          className="w-full mt-2"
          onClick={() => dispatch(openNewTicketDialog())}
        >
          New Ticket
        </Button>
      </div>
      <div className="flex" />
    </div>
  );
}

export default TicketsToolbar;
