import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'app/ws/WebSocket';

import _ from '@lodash';
import * as yup from 'yup';
import { MenuItem, TextField } from '@mui/material';
import { selectLocations } from '../../locations/store/locationsSlice';

const defaultValues = {
  locationId: '',
  assignmentIds: [],
};

const schema = yup.object().shape({
  locationId: yup.string().required('You must select a location'),
});

function AssignmentDialog(props) {
  const assignmentsDialog = useSelector(
    ({ eCommerceApp }) => eCommerceApp.assignments.assignmentDialog
  );
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);
  const ws = useContext(WebSocketContext);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const locationId = watch('locationId');

  const initDialog = useCallback(() => {
    if (assignmentsDialog.data) {
      reset({ ...assignmentsDialog.data });
    }
  }, [assignmentsDialog.data, reset]);

  function closeComposeDialog() {}

  useEffect(() => {
    if (assignmentsDialog.props.open) {
      initDialog();
    }
  }, [initDialog, assignmentsDialog.props.open]);

  function onSubmit(data) {
    if (assignmentsDialog.type === 'new') {
      ws.sendMessage('appointment/add', data);
    } else {
      ws.sendMessage('updateAppointment', data);
    }
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...assignmentsDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Assign Assignment/s
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden"
      >
        <DialogContent classes={{ root: 'pb-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
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
                  variant="outlined"
                  select
                  fullWidth
                >
                  {locations.map((location) => {
                    return (
                      <MenuItem key={location.id} value={location.id}>
                        {location.className}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
          </div>
        </DialogContent>

        <DialogActions className="justify-between p-4 pb-16">
          <div className="px-16">
            {assignmentsDialog.type === 'new' ? (
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Assign
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Update
              </Button>
            )}
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AssignmentDialog;
