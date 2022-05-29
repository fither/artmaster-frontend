import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import { styled } from '@mui/material/styles';
import TicketDialog from './TicketDialog';
import TicketsHeader from './TicketsHeader';
import TicketsList from './TicketsList';
import TicketsSidebarContent from './TicketsSidebarContent';
import reducer from './store';
import TicketReplyDialog from './TicketReplyDialog';

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

function TicketsApp(props) {
  const pageLayout = useRef(null);

  return (
    <>
      <Root
        header={<TicketsHeader pageLayout={pageLayout} />}
        content={<TicketsList />}
        leftSidebarContent={<TicketsSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <TicketDialog />
      <TicketReplyDialog />
    </>
  );
}

export default withReducer('ticketsApp', reducer)(TicketsApp);
