import { lazy } from 'react';

const SummaryDashboardApp = lazy(() => import('./SummaryDashboardApp'));

const SummaryDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/dashboards/summary',
      element: <SummaryDashboardApp />,
    },
  ],
};

export default SummaryDashboardAppConfig;
