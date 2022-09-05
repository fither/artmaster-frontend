import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useState, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'app/ws/WebSocket';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
} from '@mui/material';
import ClassroomsTable from './ClassroomsTable';
import { openEditClassroomDialog, selectClassrooms } from './store/classroomsSlice';
import { openEditClassroomAssignmentDialog } from './store/assignmentsSlice';

function ClassroomsList(props) {
  const dispatch = useDispatch();
  const classrooms = useSelector(selectClassrooms);
  const searchText = useSelector(({ classroomsApp }) => classroomsApp.classrooms.searchText);
  const ws = useContext(WebSocketContext);

  const [filteredData, setFilteredData] = useState(null);

  const handleRemove = useCallback(
    (ev, id) => {
      ev.stopPropagation();
      dispatch(
        openDialog({
          children: (
            <>
              <DialogTitle id="alert-dialog-title">Confirm Delete Location</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-text">
                  Do you confirm deleting classroom?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    ws.sendMessage('classroom/remove', id);
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
    },
    [dispatch, ws]
  );

  const handleAssignClassroom = useCallback(
    (ev, id) => {
      ev.stopPropagation();
      dispatch(openEditClassroomAssignmentDialog(id));
    },
    [dispatch]
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
        className: 'justify-center',
        sortable: true,
      },
      {
        Header: 'Name',
        accessor: 'name',
        className: 'justify-center',
        sortable: true,
      },
      {
        Header: 'Quota',
        accessor: 'quota',
        className: 'justify-center',
        sortable: true,
        Cell: ({ row }) => (
          <>
            {row.original.assignmentsCount} / {row.original.quota}
          </>
        ),
      },
      {
        Header: 'Location',
        accessor: 'location.className',
        className: 'justify-center',
        sortable: true,
      },
      {
        Header: 'Action',
        accessor: '',
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {/* <IconButton onClick={(ev) => handleAssignClassroom(ev, row.original.id)}>
              <Icon>edit</Icon>
            </IconButton> */}
            <IconButton onClick={(ev) => handleRemove(ev, row.original.id)} size="large">
              <Icon>delete</Icon>
            </IconButton>
          </div>
        ),
      },
    ],
    [handleAssignClassroom, handleRemove]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return classrooms;
      }
      return FuseUtils.filterArrayByString(classrooms, _searchText);
    }

    if (classrooms) {
      setFilteredData(getFilteredArray(classrooms, searchText));
    }
  }, [classrooms, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no classrooms!
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-auto w-full max-h-full"
    >
      <ClassroomsTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            dispatch(openEditClassroomDialog(row.original));
          }
        }}
      />
    </motion.div>
  );
}

export default ClassroomsList;
