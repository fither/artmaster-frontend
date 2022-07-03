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
import { useCallback, useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'app/ws/WebSocket';

import _ from '@lodash';
import * as yup from 'yup';

import { Autocomplete, DialogContentText, DialogTitle, MenuItem } from '@mui/material';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { Box } from '@mui/system';
import { closeNewUserDialog, closeEditUserDialog } from './store/usersSlice';
import { selectRoles } from './store/rolesSlice';
import { selectCountries } from './store/countriesSlice';
import { selectLocations } from '../locations/store/locationsSlice';

const defaultValues = {
  firstName: '',
  lastName: '',
  photo_url: 'assets/images/avatars/user.png',
  username: '',
  email: '',
  password: '',
  roleId: '',
  countryIds: [],
  locationId: '',
};

const schema = yup.object().shape({
  firstName: yup.string().required('You must enter a name'),
  lastName: yup.string().required('You must enter a lastname'),
  email: yup.string().email('Please enter a valid email').required('You must enter an email'),
  username: yup.string().required('You must enter a username'),
  roleId: yup.string().required('You must select a role'),
  countryIds: yup.array().min(1).required('You must select a country'),
});

function UserDialog(props) {
  const dispatch = useDispatch();
  const userDialog = useSelector(({ usersApp }) => usersApp.users.userDialog);
  const user = useSelector(({ auth }) => auth.user);
  const roles = useSelector(selectRoles);
  const countries = useSelector(selectCountries);
  const locations = useSelector(selectLocations);
  const ws = useContext(WebSocketContext);

  const [filteredLocations, setFilteredLocations] = useState([]);

  const { control, watch, reset, handleSubmit, formState, getValues, setValue } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const name = watch('firstName');
  const avatar = watch('photo_url');
  const selectedCountryIds = watch('countryIds');
  const selectedRoleId = watch('roleId');

  useEffect(() => {
    const selectedCountryIdsLength = selectedCountryIds.length;
    if (!selectedRoleId || !selectedCountryIdsLength) {
      return;
    }

    const selectedRole = roles.find((r) => r.id === selectedRoleId);
    if (!selectedRole) {
      return;
    }

    if (
      !['director', 'country-admin', 'operation-manager'].includes(selectedRole.name) &&
      selectedCountryIdsLength > 1
    ) {
      setValue('countryIds', [selectedCountryIds[selectedCountryIdsLength - 1]], {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [selectedRoleId, selectedCountryIds, roles, setValue]);

  const initDialog = useCallback(() => {
    if (userDialog.type === 'edit' && userDialog.data) {
      reset({ ...userDialog.data });
    }

    if (userDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...userDialog.data,
      });

      if (user.role.name !== 'super-admin') {
        const userRole = roles.find((role) => role.name === 'user');
        if (userRole) {
          setValue('roleId', userRole.id, { shouldDirty: true, shouldValidate: true });
        }

        if (user && user.country) {
          setValue('countryIds', [user.country.id], { shouldDirty: true, shouldValidate: true });
        }
      }
    }
  }, [userDialog.type, userDialog.data, reset, user, roles, setValue]);

  useEffect(() => {
    if (userDialog.props.open) {
      initDialog();
    }
  }, [userDialog.props.open, initDialog]);

  useEffect(() => {
    const fLocations = locations.filter((l) => selectedCountryIds.includes(l.country.id));
    setFilteredLocations(fLocations);
  }, [locations, selectedCountryIds]);

  function closeComposeDialog() {
    return userDialog.type === 'edit'
      ? dispatch(closeEditUserDialog())
      : dispatch(closeNewUserDialog());
  }

  function onSubmit(data) {
    if (userDialog.type === 'new') {
      ws.sendMessage('user/add', data);
    } else {
      ws.sendMessage('user/update', {
        ...userDialog.data,
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
            <DialogTitle id="alert-dialog-title">Confirm Delete User</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-text">
                Do you confirm deleting user?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={(() => ws.sendMessage('user/remove', id), dispatch(closeComposeDialog()))}
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
      {...userDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {userDialog.type === 'new' ? 'New User' : 'Edit User'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Avatar className="w-96 h-96" alt="user avatar" src={avatar} />
          {userDialog.type === 'edit' && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {name}
            </Typography>
          )}
        </div>
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
              name="firstName"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="First Name"
                  id="firstName"
                  error={!!errors.firstName}
                  helperText={errors?.firstName?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20" />
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Last name"
                  id="lastName"
                  error={!!errors.lastName}
                  helperText={errors?.lastName?.message}
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">user</Icon>
            </div>
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Username"
                  id="username"
                  error={!!errors.username}
                  helperText={errors?.username?.message}
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">email</Icon>
            </div>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  id="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">password</Icon>
            </div>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  id="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  type="password"
                  disabled={userDialog.type !== 'new'}
                  fullWidth
                  required
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">people</Icon>
            </div>
            <Controller
              control={control}
              name="roleId"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Role"
                  id="roleId"
                  error={!!errors.roleId}
                  helperText={errors?.roleId?.message}
                  variant="outlined"
                  disabled={user?.role?.name !== 'super-admin' || false}
                  select
                  fullWidth
                  required
                >
                  {roles.map((role) => {
                    return (
                      <MenuItem key={role.id} value={role.id}>
                        {role.displayName}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">flag</Icon>
            </div>
            <Controller
              control={control}
              name="countryIds"
              render={({ field }) => (
                <Autocomplete
                  id="countryIds"
                  className="mb-24"
                  options={user.role.name === 'super-admin' ? countries : user.countries}
                  autoHighlight
                  fullWidth
                  multiple
                  freeSolo
                  value={selectedCountryIds.map((scid) => countries.find((c) => c.id === scid))}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) =>
                    setValue(
                      'countryIds',
                      newValue.map((c) => c.id),
                      {
                        shouldDirty: true,
                        shouldValidate: true,
                      }
                    )
                  }
                  renderOption={(propss, option) => <Box {...propss}>{option.name}</Box>}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select country/ies"
                      error={!!errors.countryIds}
                      helperText={errors?.countryIds?.message}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                      }}
                    />
                  )}
                />
              )}
            />
          </div>

          {filteredLocations.length > 0 && (
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
                    required
                  >
                    {filteredLocations.map((l) => {
                      return (
                        <MenuItem key={l.id} value={l.id}>
                          {l.className}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              />
            </div>
          )}
        </DialogContent>

        {userDialog.type === 'new' ? (
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

export default UserDialog;
