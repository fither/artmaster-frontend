import { setLogs, setLogsLoading } from 'app/main/apps/logs/store/logsSlice';

const handleLog = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setLogs(data));
      dispatch(setLogsLoading(false));
      break;
    default:
      break;
  }
};

export default handleLog;
