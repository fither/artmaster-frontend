import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useContext, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { WebSocketContext } from 'app/ws/WebSocket';
import { useSelector } from 'react-redux';
import LocationsDialog from './LocationDialog';
import LocationsHeader from './LocationsHeader';
import LocationsList from './LocationsList';
import reducer from './store';
import { setLocationsLoading } from './store/locationsSlice';
import LocationsToolbar from './LocationsToolbar';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    minHeight: 72,
    height: 72,
    [theme.breakpoints.up('lg')]: {
      minHeight: 136,
      height: 136,
    },
  },
  '& .FusePageSimple-wrapper': {
    minHeight: 0,
  },
  '& .FusePageSimple-contentWrapper': {
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: 24,
      height: '100%',
    },
  },
  '& .FusePageSimple-content': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  '& .FusePageSimple-sidebar': {
    width: 256,
    border: 0,
  },
}));

function LocationsApp(props) {
  const pageLayout = useRef(null);
  const ws = useContext(WebSocketContext);
  const loading = useSelector(({ locationsApp }) => locationsApp.locations.loading);

  useEffect(() => {
    if (!loading) {
      setLocationsLoading(true);
      ws.sendMessage('location/findAll');
    }
  }, [loading, ws]);

  return (
    <>
      <Root
        header={<LocationsHeader pageLayout={pageLayout} />}
        content={<LocationsList />}
        contentToolbar={<LocationsToolbar />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <LocationsDialog />
    </>
  );
}

export default withReducer('locationsApp', reducer)(LocationsApp);
