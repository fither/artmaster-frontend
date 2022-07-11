import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const ClassroomsApp = lazy(() => import('./ClassroomsApp'));

const ClassroomsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/classrooms/:id',
      element: <ClassroomsApp />,
    },
    {
      path: 'apps/classrooms',
      element: <Navigate to="/apps/classrooms/all" />,
    },
  ],
};

export default ClassroomsAppConfig;
