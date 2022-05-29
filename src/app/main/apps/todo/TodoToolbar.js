import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOrderDescending, changeOrder } from './store/todosSlice';

function TodoToolbar(props) {
  const dispatch = useDispatch();
  const orderBy = useSelector(({ todoApp }) => todoApp.todos.orderBy);
  const orderDescending = useSelector(({ todoApp }) => todoApp.todos.orderDescending);

  function handleOrderChange(ev) {
    dispatch(changeOrder(ev.target.value));
  }

  return (
    <div className="flex justify-between w-full">
      <div className="flex" />
      <div className="flex items-center">
        <FormControl className="" variant="filled">
          <TextField
            value={orderBy}
            onChange={handleOrderChange}
            select
            name="filter"
            classes={{ select: 'py-8' }}
          >
            <MenuItem value="">
              <em>Order by</em>
            </MenuItem>
            <MenuItem value="start_date">Start Date</MenuItem>
            <MenuItem value="due_date">Due Date</MenuItem>
            <MenuItem value="title">Title</MenuItem>
          </TextField>
        </FormControl>
        <IconButton onClick={(ev) => dispatch(toggleOrderDescending())} size="large">
          <Icon style={{ transform: orderDescending ? 'scaleY(-1)' : 'scaleY(1)' }}>sort</Icon>
        </IconButton>
      </div>
    </div>
  );
}

export default TodoToolbar;
