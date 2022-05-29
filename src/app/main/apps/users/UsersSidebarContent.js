import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { exportCSV, exportPDF } from 'utilities/documentExport';
import { openNewUserDialog, selectUsers } from './store/usersSlice';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: 'inherit!important',
  textDecoration: 'none!important',
  height: 40,
  width: '100%',
  borderRadius: 6,
  paddingLeft: 12,
  paddingRight: 12,
  marginBottom: 4,
  '&.active': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, .05)!important'
        : 'rgba(255, 255, 255, .1)!important',
    pointerEvents: 'none',
    '& .list-item-icon': {
      color: 'inherit',
    },
  },
  '& .list-item-icon': {
    fontSize: 16,
    width: 16,
    height: 16,
    marginRight: 16,
  },
}));

function UsersSidebarContent(props) {
  const user = useSelector(({ auth }) => auth.user);
  const [isSuperAdmin, setIsSuperAdmin] = useState('inherit');
  const users = useSelector(selectUsers);

  const dispatch = useDispatch();

  return (
    <div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
      <Paper
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
        className="rounded-0 shadow-none lg:rounded-16 lg:shadow"
      >
        <div className="p-24 flex items-center">
          <Avatar alt={user.data.displayName} src={user.data.photoURL} />
          <Typography className="mx-12">{user.data.displayName}</Typography>
        </div>

        <Divider />

        <div className="p-24">
          <Button
            variant="contained"
            color="secondary"
            className="w-full mt-2"
            onClick={(ev) => dispatch(openNewUserDialog())}
          >
            New User
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="w-full mt-2"
            onClick={(ev) => {
              ev.preventDefault();
              exportCSV(users, 'users', true);
            }}
          >
            Export XLSX
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="w-full mt-2"
            onClick={(ev) => {
              ev.preventDefault();
              exportPDF(users, 'test');
            }}
          >
            Export PDF
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default UsersSidebarContent;
