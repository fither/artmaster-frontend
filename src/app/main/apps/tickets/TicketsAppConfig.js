import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const TicketsApp = lazy(() => import('./TicketsApp'));

const TicketsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/tickets/:id',
      element: <TicketsApp />,
    },
    {
      path: 'apps/tickets',
      element: <Navigate to="/apps/tickets/all" />,
    },
  ],
};

export default TicketsAppConfig;
