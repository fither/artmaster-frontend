import { lazy } from 'react';

const AnnouncementApp = lazy(() => import('./AnnouncementApp'));

const AnnouncementAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/announcement',
      element: <AnnouncementApp />,
    },
  ],
};

export default AnnouncementAppConfig;
