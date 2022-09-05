import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UsersDialog from './UserDialog';
import UsersHeader from './UsersHeader';
import UsersList from './UsersList';
import reducer from './store';
import UsersToolbar from './UsersToolbar';

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
  const pageLayout = useRef(null);
  const user = useSelector(({ auth }) => auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role && !['super-admin', 'country-admin', 'director'].includes(user.role.name)) {
      navigate({
        pathname: '/',
      });
    }
  }, [navigate, props, user.role]);

  return (
    <>
      <Root
        header={<UsersHeader pageLayout={pageLayout} />}
        content={<UsersList />}
        contentToolbar={<UsersToolbar />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <UsersDialog />
    </>
  );
}

export default withReducer('usersApp', reducer)(UsersApp);
