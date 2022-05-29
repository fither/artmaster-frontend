import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Products = lazy(() => import('./products/Products'));
const Orders = lazy(() => import('./orders/Orders'));
const AssignedList = lazy(() => import('./assigned-list/AssignedList'));

const AppointmentAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/appointment/products',
      element: <Products />,
    },
    {
      path: 'apps/appointment/appointment-list',
      element: <Orders />,
    },
    {
      path: 'apps/appointment/assigned-list',
      element: <AssignedList />,
    },
    {
      path: 'apps/appointment',
      element: <Navigate to="products" />,
    },
  ],
};

export default AppointmentAppConfig;
