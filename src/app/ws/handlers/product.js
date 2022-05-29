import { setProducts } from 'app/main/apps/e-commerce/store/productsSlice';

const handleProduct = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setProducts(data));
      break;
    default:
      break;
  }
};

export default handleProduct;
