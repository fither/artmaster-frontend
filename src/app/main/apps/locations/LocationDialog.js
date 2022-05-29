import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'app/ws/WebSocket';

import _ from '@lodash';
import * as yup from 'yup';

import { DialogContentText, DialogTitle, MenuItem } from '@mui/material';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { closeNewLocationDialog, closeEditLocationDialog } from './store/locationsSlice';
import { selectCountries } from '../users/store/countriesSlice';

const defaultValues = {
  className: '',
  countryId: '',
  stateId: '',
};

const schema = yup.object().shape({
  className: yup.string().required('You must enter a class name'),
  countryId: yup.string().required('You must select a country'),
  stateId: yup.string().required('You must select a state'),
});

function LocationDialog(props) {
  const dispatch = useDispatch();
  const locationDialog = useSelector(({ locationsApp }) => locationsApp.locations.locationDialog);
  const countries = useSelector(selectCountries);
  const states = useSelector(({ usersApp }) => usersApp.countries.states);
  const ws = useContext(WebSocketContext);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const className = watch('className');
  const countryId = watch('countryId');
  const stateId = watch('stateId');

  const initDialog = useCallback(() => {
    if (locationDialog.type === 'edit' && locationDialog.data) {
      reset({ ...locationDialog.data });
      ws.sendMessage('country/findStates', locationDialog.data.country.id);
    }

    if (locationDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...locationDialog.data,
      });
    }
  }, [locationDialog.data, locationDialog.type, reset, ws]);

  useEffect(() => {
    if (locationDialog.props.open) {
      initDialog();
    }
  }, [locationDialog.props.open, initDialog, countries]);

  function closeComposeDialog() {
    return locationDialog.type === 'edit'
      ? dispatch(closeEditLocationDialog())
      : dispatch(closeNewLocationDialog());
  }

  function onSubmit(data) {
    if (locationDialog.type === 'new') {
      ws.sendMessage('location/add', data);
    } else {
      ws.sendMessage('location/update', {
        ...locationDialog.data,
        ...data,
      });
    }
    closeComposeDialog();
  }

  function handleRemove() {
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
                onClick={
                  (() => ws.sendMessage('location/remove', id), dispatch(closeComposeDialog()))
                }
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
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...locationDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {locationDialog.type === 'new' ? 'New Location' : 'Edit Location'}
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
              name="className"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Class Name"
                  id="className"
                  error={!!errors.className}
                  helperText={errors?.className?.message}
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
              name="countryId"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Country"
                  id="countryId"
                  error={!!errors.countryId}
                  helperText={errors?.countryId?.message}
                  variant="outlined"
                  select
                  fullWidth
                >
                  {countries.map((country) => {
                    return (
                      <MenuItem
                        onClick={() => ws.sendMessage('country/findStates', country.id)}
                        key={country.id}
                        value={country.id}
                      >
                        {country.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
          </div>

          {states && states.length > 0 && (
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">flag</Icon>
              </div>
              <Controller
                control={control}
                name="stateId"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="State"
                    id="stateId"
                    error={!!errors.stateId}
                    helperText={errors?.stateId?.message}
                    variant="outlined"
                    select
                    fullWidth
                  >
                    {states.map((state) => {
                      return (
                        <MenuItem key={state.id} value={state.id}>
                          {state.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              />
            </div>
          )}
        </DialogContent>

        {locationDialog.type === 'new' ? (
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
            <IconButton onClick={handleRemove} size="large">
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default LocationDialog;
