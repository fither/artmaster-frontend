import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useContext, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { WebSocketContext } from 'app/ws/WebSocket';
import { useSelector } from 'react-redux';
import ClassroomsAssignDialog from './ClassroomsAssignDialog';
import ClassroomsHeader from './ClassroomsHeader';
import ClassroomsList from './ClassroomsList';
import reducer from './store';
import { setClassroomsLoading } from './store/classroomsSlice';
import ClassroomsToolbar from './ClassroomsToolbar';
import ClassroomsDialog from './ClassroomsDialog';

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

function ClassroomsApp(props) {
  const pageLayout = useRef(null);
  const ws = useContext(WebSocketContext);
  const loading = useSelector(({ classroomsApp }) => classroomsApp.classrooms.loading);

  useEffect(() => {
    if (!loading) {
      setClassroomsLoading(true);
      ws.sendMessage('classroom/findAll');
    }
  }, [loading, ws]);

  return (
    <>
      <Root
        header={<ClassroomsHeader pageLayout={pageLayout} />}
        content={<ClassroomsList />}
        contentToolbar={<ClassroomsToolbar />}
        sidebarInner
        ref={pageLayout}
        innerScrool
      />
      <ClassroomsAssignDialog />
      <ClassroomsDialog />
    </>
  );
}

export default withReducer('classroomsApp', reducer)(ClassroomsApp);
