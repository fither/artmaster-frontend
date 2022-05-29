import { addTodo, removeTodo, setTodos, updateTodo } from 'app/main/apps/todo/store/todosSlice';

const handleTodo = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setTodos(data));
      break;
    case 'add':
      dispatch(addTodo(data));
      break;
    case 'update':
      dispatch(updateTodo(data));
      break;
    case 'remove':
      dispatch(removeTodo(data));
      break;
    default:
      break;
  }
};

export default handleTodo;
