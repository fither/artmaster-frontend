import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'app/ws/WebSocket';
import TicketsTable from './TicketsTable';
import { selectTickets, openEditTicketDialog } from './store/ticketsSlice';

function TicketsList(props) {
  const dispatch = useDispatch();
  const tickets = useSelector(selectTickets);
  const searchText = useSelector(({ ticketsApp }) => ticketsApp.tickets.searchText);
  const ws = useContext(WebSocketContext);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
        className: 'justify-center',
        sortable: false,
      },
      {
        Header: 'Ticket Category',
        accessor: 'category',
        sortable: true,
      },
      {
        Header: 'Ticket Title',
        accessor: 'title',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Status',
        accessor: 'status',
        sortable: true,
      },
    ],
    []
  );

  useEffect(() => {
    ws.sendMessage('ticket/findAll');
  }, [ws]);

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return tickets;
      }
      return FuseUtils.filterArrayByString(tickets, _searchText);
    }

    if (tickets) {
      setFilteredData(getFilteredArray(tickets, searchText));
    }
  }, [tickets, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no tickets!
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-auto w-full max-h-full"
    >
      <TicketsTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            dispatch(openEditTicketDialog(row.original));
          }
        }}
      />
    </motion.div>
  );
}

export default TicketsList;
