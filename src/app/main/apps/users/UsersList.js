/* eslint-disable no-nested-ternary */
import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { WebSocketContext } from 'app/ws/WebSocket';
import FuseLoading from '@fuse/core/FuseLoading';
import { format } from 'date-fns';
import UsersTable from './UsersTable';
import { openEditUserDialog, selectUsers, setUsersLoading } from './store/usersSlice';

function UsersList(props) {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const searchText = useSelector(({ usersApp }) => usersApp.users.searchText);
  const loading = useSelector(({ usersApp }) => usersApp.users.loading);
  const ws = useContext(WebSocketContext);
  const user = useSelector(({ auth }) => auth.user);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'avatar',
        Cell: ({ row }) => {
          return <Avatar className="mx-8" alt={row.original.name} src={row.original.photoURL} />;
        },
        className: 'justify-center',
        width: 64,
        sortable: false,
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Email',
        accessor: 'email',
        sortable: true,
      },
      {
        Header: 'Role',
        accessor: 'roleName',
        sortable: true,
      },
      {
        Header: ['country-admin', 'super-admin'].includes(user.role.name) ? 'Active' : '',
        accessor: 'active',
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {['country-admin', 'super-admin'].includes(user.role.name) &&
              renderActiveButton(row.original)}
          </div>
        ),
      },
      {
        Header: 'Last Login',
        accessor: '',
        sortable: true,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {row.original.lastSignInWithToken
              ? format(new Date(row.original.lastSignInWithToken), 'dd-MM-yyyy HH:mm:ss')
              : row.original.lastSignIn
              ? format(new Date(row.original.lastSignIn), 'dd-MM-yyyy HH:mm:ss')
              : ''}
          </div>
        ),
      },
      {
        Header: 'Last Logout',
        accessor: '',
        sortable: true,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {row.original.lastLogout
              ? format(new Date(row.original.lastLogout), 'dd-MM-yyyy HH:mm:ss')
              : ''}
          </div>
        ),
      },
      {
        id: 'action',
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {user.role.name === 'super-admin' && (
              <IconButton
                onClick={(ev) => {
                  ev.stopPropagation();
                  handleUserRemove(row.original.id);
                }}
                size="large"
              >
                <Icon>delete</Icon>
              </IconButton>
            )}
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, ws, users]
  );

  const handleUserRemove = (userId) => {
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Confirm Delete User</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-text">
                Do you confirm deleting user?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  ws.sendMessage('user/remove', userId);
                  dispatch(closeDialog());
                }}
                color="warning"
              >
                Yes
              </Button>
              <Button onClick={() => dispatch(closeDialog())} color="primary">
                No
              </Button>
            </DialogActions>
          </>
        ),
      })
    );
  };

  const renderActiveButton = (userRow) => {
    return userRow.active ? (
      <IconButton
        onClick={(ev) => {
          ev.stopPropagation();
          ws.sendMessage('user/deactivate', userRow.id);
        }}
      >
        <Icon>radio_button_checked</Icon>
      </IconButton>
    ) : (
      <IconButton
        onClick={(ev) => {
          ev.stopPropagation();
          ws.sendMessage('user/activate', userRow.id);
        }}
      >
        <Icon>radio_button_unchecked</Icon>
      </IconButton>
    );
  };

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return users;
      }
      return FuseUtils.filterArrayByString(users, _searchText);
    }

    if (users) {
      setFilteredData(getFilteredArray(users, searchText));
    }
  }, [users, searchText]);

  useEffect(() => {
    if (!loading) {
      dispatch(setUsersLoading(true));
      ws.sendMessage('user/findAll');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, ws]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0 && !loading) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no users!
        </Typography>
      </div>
    );
  }

  if (loading) {
    return <FuseLoading />;
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-auto w-full max-h-full"
    >
      <UsersTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            dispatch(openEditUserDialog(row.original));
          }
        }}
      />
    </motion.div>
  );
}

export default UsersList;
