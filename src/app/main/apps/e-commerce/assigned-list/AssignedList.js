import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { styled } from '@mui/material/styles';
import reducer from '../store';
import AssignmentsHeader from './AssignedListHeader';
import AssignmentsTable from './AssignedListTable';
import AssignmentsToolbar from './AssignedListToolbar';

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 136,
      height: 136,
    },
  },
  '& .FusePageCarded-content': {
    display: 'flex',
  },
  '& .FusePageCarded-contentCard': {
    overflow: 'hidden',
  },
}));

function Assignments() {
  return (
    <Root
      header={<AssignmentsHeader />}
      contentToolbar={<AssignmentsToolbar />}
      content={<AssignmentsTable />}
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Assignments);
