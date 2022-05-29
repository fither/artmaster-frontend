import { setOrders, setOrdersLoading } from 'app/main/apps/e-commerce/store/ordersSlice';

const handleOrder = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setOrders(data));
      dispatch(setOrdersLoading(false));
      break;
    default:
      break;
  }
};

export default handleOrder;
