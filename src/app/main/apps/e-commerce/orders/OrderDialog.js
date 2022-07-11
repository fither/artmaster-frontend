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
import { closeNewOrderDialog } from '../store/ordersSlice';
import { selectLocations } from '../../locations/store/locationsSlice';
import { selectClassrooms } from '../../classrooms/store/classroomsSlice';

const defaultValues = {
  locationId: '',
  classroomId: '',
  orderIds: [],
};

const schema = yup.object().shape({
  locationId: yup.string().required('You must select a location'),
  classroomId: yup.string().required('You must select a classroom'),
});

function OrderDialog(props) {
  const ordersDialog = useSelector(({ eCommerceApp }) => eCommerceApp.orders.orderDialog);
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);
  const classrooms = useSelector(selectClassrooms);
  const ws = useContext(WebSocketContext);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const locationId = watch('locationId');
  const classroomId = watch('classroomId');

  useEffect(() => {
    if (locationId) {
      ws.sendMessage('classroom/findAll', locationId);
    }
  }, [locationId, ws]);

  const initDialog = useCallback(() => {
    if (ordersDialog.data) {
      reset({ ...defaultValues, ...ordersDialog.data });
    }
  }, [ordersDialog.data, reset]);

  function closeComposeDialog() {
    dispatch(closeNewOrderDialog());
  }

  useEffect(() => {
    if (ordersDialog.props.open) {
      initDialog();
    }
  }, [initDialog, ordersDialog.props.open]);

  function onSubmit(data) {
    if (ordersDialog.type === 'new') {
      ws.sendMessage('assignment/add', data);
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
      {...ordersDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Assign Order/s
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

          {classrooms && classrooms.length > 0 && (
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">account_circle</Icon>
              </div>
              <Controller
                control={control}
                name="classroomId"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Classroom"
                    id="classroomId"
                    variant="outlined"
                    select
                    fullWidth
                  >
                    {classrooms.map((classroom) => {
                      return (
                        <MenuItem key={classroom.id} value={classroom.id}>
                          {classroom.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              />
            </div>
          )}
        </DialogContent>

        <DialogActions className="justify-between p-4 pb-16">
          <div className="px-16">
            {ordersDialog.type === 'new' ? (
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

export default OrderDialog;
