/* eslint-disable unused-imports/no-unused-imports */
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'app/ws/WebSocket';

import _ from '@lodash';
import * as yup from 'yup';

import { Autocomplete, DialogContentText, DialogTitle, MenuItem } from '@mui/material';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { selectLocations } from '../locations/store/locationsSlice';
import { closeClassroomDialog } from './store/classroomsSlice';

const defaultValues = {
  name: '',
  quota: '',
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
  const ws = useContext(WebSocketContext);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const initDialog = useCallback(() => {
    if (classroomDialog.type === 'edit' && classroomDialog.data) {
      reset({ ...classroomDialog.data });
    }

    if (classroomDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...classroomDialog.data,
      });
    }
  }, [classroomDialog.data, classroomDialog.type, reset]);

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

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...classroomDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="sm"
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
