import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import LocationsDialog from './LocationDialog';
import LocationsHeader from './LocationsHeader';
import LocationsList from './LocationsList';
import LocationsSidebarContent from './LocationsSidebarContent';
import reducer from './store';

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
  const dispatch = useDispatch();

  const pageLayout = useRef(null);

  return (
    <>
      <Root
        header={<LocationsHeader pageLayout={pageLayout} />}
        content={<LocationsList />}
        leftSidebarContent={<LocationsSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <LocationsDialog />
    </>
  );
}

export default withReducer('locationsApp', reducer)(LocationsApp);
