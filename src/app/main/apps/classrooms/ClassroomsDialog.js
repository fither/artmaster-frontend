/* eslint-disable unused-imports/no-unused-imports */
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'app/ws/WebSocket';

import _ from '@lodash';
import * as yup from 'yup';

import {
  DialogTitle,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import FuseLoading from '@fuse/core/FuseLoading';
import { selectLocations } from '../locations/store/locationsSlice';
import {
  closeClassroomDialog,
  openCustomerInfoDialog,
  setCustomerInfoLoading,
} from './store/classroomsSlice';
import { selectClassroomAssignments, setClassroomAssignments } from './store/assignmentsSlice';

const defaultValues = {
  name: '',
  quota: 0,
  locationId: '',
};

const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  quota: yup.number().min(1).max(30).required('You must enter a quota'),
  locationId: yup.string().required('You must select a location'),
});

function ClassroomsDialog(props) {
  const dispatch = useDispatch();
  const classroomDialog = useSelector(
    ({ classroomsApp }) => classroomsApp.classrooms.classroomDialog
  );
  const locations = useSelector(selectLocations);
  const assignments = useSelector(selectClassroomAssignments);
  const ws = useContext(WebSocketContext);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const initDialog = useCallback(() => {
    dispatch(setClassroomAssignments([]));
    if (classroomDialog.type === 'edit' && classroomDialog.data) {
      ws.sendMessage('assignment/findAllByClassroomId', classroomDialog.data.id);
      reset({ ...classroomDialog.data });
    }

    if (classroomDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...classroomDialog.data,
      });
    }
  }, [classroomDialog.data, classroomDialog.type, dispatch, reset, ws]);

  useEffect(() => {
    if (classroomDialog.props.open) {
      initDialog();
    }
  }, [classroomDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(closeClassroomDialog());
  }

  function onSubmit(data) {
    if (classroomDialog.type === 'new') {
      ws.sendMessage('classroom/add', data);
    } else {
      ws.sendMessage('classroom/update', {
        ...classroomDialog.data,
        ...data,
      });
    }
    closeComposeDialog();
  }

  function getCustomerInfo({ customerId, countryCode }) {
    if (!customerId || !countryCode) {
      return;
    }

    dispatch(setCustomerInfoLoading(true));
    dispatch(openCustomerInfoDialog(null));
    ws.sendMessage('classroom/getCustomerInfo', { customerId, countryCode });
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...classroomDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="md"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {classroomDialog.type === 'new' ? 'New Classroom' : 'Edit Classroom'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden"
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div
            className={
              assignments && assignments.length
                ? 'grid grid-rows-2 grid-flow-col gap-4'
                : 'grid grid-rows-1 grid-flow-col gap-4'
            }
          >
            <div className="row-span-6">
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">account_circle</Icon>
                </div>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Name"
                      id="name"
                      error={!!errors.name}
                      helperText={errors?.name?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </div>

              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">account_circle</Icon>
                </div>
                <Controller
                  control={control}
                  name="quota"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Quota"
                      id="quota"
                      type="number"
                      error={!!errors.quota}
                      helperText={errors?.quota?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </div>

              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">flag</Icon>
                </div>
                <Controller
                  control={control}
                  name="locationId"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Location"
                      id="locationId"
                      error={!!errors.locationId}
                      helperText={errors?.locationId?.message}
                      variant="outlined"
                      select
                      fullWidth
                    >
                      {locations.map((location) => (
                        <MenuItem key={location.id} value={location.id}>
                          {location.className}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>
            </div>
            <div className="row-span-6">
              <TableContainer style={{ maxHeight: '227px' }}>
                <Table stickyHeader className="grow overflow-x-auto">
                  <TableHead>
                    <TableRow className="h-56">
                      <TableCell style={{ width: '50px' }} />
                      <TableCell className="p-4" component="th" scope="row" align="left">
                        <Typography variant="h6">Users in classroom</Typography>
                        <Typography variant="subtitle1" style={{ fontSize: '8px' }}>
                          images are representative
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {classroomDialog.data && classroomDialog.data.assignmentsCount
                          ? classroomDialog.data.assignmentsCount
                          : ''}
                        /
                        {classroomDialog.data && classroomDialog.data.quota
                          ? classroomDialog.data.quota
                          : ''}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assignments.map((assignment) => (
                      <TableRow
                        className="h-56"
                        key={assignment.id}
                        style={{
                          cursor:
                            assignment.customerId && assignment.countryCode ? 'pointer' : 'initial',
                        }}
                        onClick={(ev) =>
                          getCustomerInfo({
                            customerId: assignment.customerId,
                            countryCode: assignment.countryCode,
                          })
                        }
                      >
                        <TableCell className="p-4" component="th" scope="row">
                          <Avatar className="avatar ltr:left-0 rtl:right-0 m-0 mx-32" src="" />
                        </TableCell>
                        <TableCell className="p-4" component="th" scope="row">
                          {assignment.customerName}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </DialogContent>

        {classroomDialog.type === 'new' ? (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Add
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Save
              </Button>
            </div>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default ClassroomsDialog;
