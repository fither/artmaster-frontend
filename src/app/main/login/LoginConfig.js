import Login from './Login';

const LoginConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      auth: [],
      path: '',
      element: <Login />,
    },
    {
      auth: [],
      path: 'login',
      element: <Login />,
    },
  ],
};

export default LoginConfig;
