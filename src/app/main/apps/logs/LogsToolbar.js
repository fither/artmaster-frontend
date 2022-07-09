import { MenuItem, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLogFilterType } from './store/logsSlice';

const logFilterTypes = [
  {
    name: 'All',
    value: '-',
  },
  {
    name: 'Info',
    value: 'info',
  },
  {
    name: 'Warning',
    value: 'warning',
  },
  {
    name: 'Error',
    value: 'error',
  },
  {
    name: 'Fatal',
    value: 'fatal',
  },
];

function LogsToolbar(props) {
  const dispatch = useDispatch();
  const selectedLogFilterType = useSelector(({ logsApp }) => logsApp.logs.logFilterType);

  return (
    <div className="flex justify-between w-full p-24">
      <div className="flex items-center">
        <TextField
          label="Log Type"
          variant="outlined"
          select
          value={selectedLogFilterType}
          onChange={(e) => dispatch(setLogFilterType(e.target.value || ''))}
        >
          {logFilterTypes.map((logFilterType) => (
            <MenuItem key={logFilterType.value} value={logFilterType.value}>
              {logFilterType.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="flex" />
    </div>
  );
}

export default LogsToolbar;
