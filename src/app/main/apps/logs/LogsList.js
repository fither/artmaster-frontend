import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'app/ws/WebSocket';
import FuseLoading from '@fuse/core/FuseLoading';
import format from 'date-fns/format';
import LogsTable from './LogsTable';
import { selectLogs, setLogsLoading } from './store/logsSlice';

function LogsList(props) {
  const dispatch = useDispatch();
  const logs = useSelector(selectLogs);
  const searchText = useSelector(({ logsApp }) => logsApp.logs.searchText);
  const loading = useSelector(({ logsApp }) => logsApp.logs.loading);
  const selectedLogFilterType = useSelector(({ logsApp }) => logsApp.logs.logFilterType);
  const rowsPerPage = useSelector(({ logsApp }) => logsApp.logs.rowsPerPage);
  const currPage = useSelector(({ logsApp }) => logsApp.logs.pageIndex);
  const ws = useContext(WebSocketContext);

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Action',
        accessor: 'action',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Message',
        accessor: 'message',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Type',
        accessor: 'type',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
        className: 'font-medium',
        sortable: true,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {format(new Date(row.original.createdAt), 'dd-MM-yyyy hh:mm:ss')}
          </div>
        ),
      },
      {
        Header: 'User',
        accessor: 'user.username',
        className: 'font-medium',
        sortable: true,
      },
    ],
    []
  );

  useEffect(() => {
    if (!loading) {
      dispatch(setLogsLoading(true));
      ws.sendMessage('log/findAll', {
        pageIndex: currPage,
        limit: rowsPerPage,
        logType: selectedLogFilterType,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLogFilterType, rowsPerPage, currPage]);

  if (!logs) {
    return null;
  }

  if (logs.length === 0 && !loading) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no logs!
        </Typography>
      </div>
    );
  }

  if (loading) {
    return <FuseLoading />;
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-auto w-full max-h-full"
    >
      <LogsTable columns={columns} data={logs} />
    </motion.div>
  );
}

export default LogsList;
