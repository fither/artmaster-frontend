import { lazy } from 'react';

const ProfilePage = lazy(() => import('./ProfilePage'));

const ProfilePageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'pages/profile/:userId',
      element: <ProfilePage />,
    },
    {
      path: 'pages/profile',
      element: <ProfilePage />,
    },
  ],
};

export default ProfilePageConfig;
