import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useState, useContext, useCallback } from 'react';
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
import LocationsMultiSelectMenu from './LocationsMultiSelectMenu';
import LocationsTable from './LocationsTable';
import { openEditLocationDialog, selectLocations } from './store/locationsSlice';
import { openClassroomDialog } from './store/classroomsSlice';

function LocationsList(props) {
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);
  const searchText = useSelector(({ locationsApp }) => locationsApp.locations.searchText);
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
                  Do you confirm deleting location?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    ws.sendMessage('location/remove', id);
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

  const handleEditClassroom = useCallback(
    (ev, id) => {
      ev.stopPropagation();
      dispatch(openClassroomDialog(id));
    },
    [dispatch]
  );

  const columns = useMemo(
    () => [
      {
        Header: ({ selectedFlatRows }) => {
          const selectedRowIds = selectedFlatRows.map((row) => row.original.id);

          return (
            selectedFlatRows.length > 0 && (
              <LocationsMultiSelectMenu selectedUserIds={selectedRowIds} />
            )
          );
        },
        accessor: 'id',
        className: 'justify-center',
        width: 64,
        sortable: false,
      },
      {
        Header: 'Class Name',
        accessor: 'className',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Country',
        accessor: 'country.name',
        className: 'font-medium',
        sortable: false,
      },
      {
        Header: 'State',
        accessor: 'state.name',
        className: 'font-medium',
        sortable: false,
      },
      {
        id: 'action',
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <IconButton onClick={(ev) => handleEditClassroom(ev, row.original.id)}>
              <Icon>edit</Icon>
            </IconButton>
            <IconButton onClick={(ev) => handleRemove(ev, row.original.id)} size="large">
              <Icon>delete</Icon>
            </IconButton>
          </div>
        ),
      },
    ],
    [handleEditClassroom, handleRemove]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return locations;
      }
      return FuseUtils.filterArrayByString(locations, _searchText);
    }

    if (locations) {
      setFilteredData(getFilteredArray(locations, searchText));
    }
  }, [locations, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no locations!
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
      <LocationsTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            dispatch(openEditLocationDialog(row.original));
          }
        }}
      />
    </motion.div>
  );
}

export default LocationsList;
