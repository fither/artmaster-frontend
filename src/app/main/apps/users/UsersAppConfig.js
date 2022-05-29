import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const UsersApp = lazy(() => import('./UsersApp'));

const UsersAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/users/:id',
      element: <UsersApp />,
    },
    {
      path: 'apps/users',
      element: <Navigate to="/apps/users/all" />,
    },
  ],
};

export default UsersAppConfig;
