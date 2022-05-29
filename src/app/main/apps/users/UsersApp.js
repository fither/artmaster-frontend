import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import { WebSocketContext } from 'app/ws/WebSocket';
import UsersDialog from './UserDialog';
import UsersHeader from './UsersHeader';
import UsersList from './UsersList';
import UsersSidebarContent from './UsersSidebarContent';
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

function UsersApp(props) {
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useDeepCompareEffect(() => {
    ws.sendMessage('user/findAll');
  }, [dispatch, routeParams]);

  // TODO: superuser != -> disable sidebar

  return (
    <>
      <Root
        header={<UsersHeader pageLayout={pageLayout} />}
        content={<UsersList />}
        leftSidebarContent={<UsersSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <UsersDialog />
    </>
  );
}

export default withReducer('usersApp', reducer)(UsersApp);