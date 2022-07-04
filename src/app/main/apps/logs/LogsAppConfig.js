import { lazy } from 'react';

const LogsApp = lazy(() => import('./LogsApp'));

const LogsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/logs',
      element: <LogsApp />,
    },
  ],
};

export default LogsAppConfig;
