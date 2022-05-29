import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const LocationsApp = lazy(() => import('./LocationsApp'));

const LocationsAppConfig = {
  settings: {
    layoud: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/locations/:id',
      element: <LocationsApp />,
    },
    {
      path: 'apps/locations',
      element: <Navigate to="/apps/locations/all" />,
    },
  ],
};

export default LocationsAppConfig;
