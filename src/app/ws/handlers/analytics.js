import { addWidget } from 'app/main/apps/dashboards/summary/store/widgetsSlice';

const handleAnalytics = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(addWidget(data));
      break;
    default:
      break;
  }
};

export default handleAnalytics;
