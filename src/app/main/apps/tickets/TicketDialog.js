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
import { useCallback, useEffect, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'app/ws/WebSocket';

import _ from '@lodash';
import * as yup from 'yup';

import { DialogContentText, DialogTitle, MenuItem } from '@mui/material';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import {
  closeNewTicketDialog,
  closeEditTicketDialog,
  setReplyDialogopen,
} from './store/ticketsSlice';

const defaultValues = {
  category: '',
  title: '',
  message: '',
};

const schema = yup.object().shape({
  category: yup.string().required(),
  title: yup.string().required(),
  message: yup.string().required(),
});

function TicketDialog(props) {
  const dispatch = useDispatch();
  const ticketDialog = useSelector(({ ticketsApp }) => ticketsApp.tickets.ticketDialog);
  const user = useSelector(({ auth }) => auth.user);
  const ws = useContext(WebSocketContext);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const ticketCategories = [
    {
      id: '1',
      name: 'Product Problem',
      value: 'product-problem',
    },
    {
      id: '2',
      name: 'Order Problem',
      value: 'order-problem',
    },
  ];

  const initDialog = useCallback(() => {
    if (ticketDialog.type === 'edit' && ticketDialog.data) {
      reset({ ...ticketDialog.data });
    }

    if (ticketDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...ticketDialog.data,
      });
    }
  }, [ticketDialog.data, ticketDialog.type, reset]);

  useEffect(() => {
    if (ticketDialog.props.open) {
      initDialog();
    }
  }, [ticketDialog.props.open, initDialog]);

  function closeComposeDialog() {
    return ticketDialog.type === 'edit'
      ? dispatch(closeEditTicketDialog())
      : dispatch(closeNewTicketDialog());
  }

  function onSubmit(data) {
    if (ticketDialog.type === 'new') {
      ws.sendMessage('ticket/add', data);
    }
    closeComposeDialog();
  }

  function handleRemove() {
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Confirm Delete Ticket</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-text">
                Do you confirm deleting ticket/s?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={(ev) => {
                  ws.sendMessage('ticket/remove', ticketDialog.data.id);
                  dispatch(closeDialog());
                  closeComposeDialog();
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
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...ticketDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="md"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {ticketDialog.type === 'new' ? 'New Ticket' : 'Edit Ticket'}
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
              <Icon color="action">category</Icon>
            </div>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Ticket Category"
                  id="category"
                  error={!!errors.category}
                  helperText={errors?.category?.message}
                  variant="outlined"
                  select
                  fullWidth
                >
                  {ticketCategories.map((tc) => {
                    return (
                      <MenuItem key={tc.id} value={tc.value}>
                        {tc.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">title</Icon>
            </div>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Ticket Title"
                  id="title"
                  error={!!errors.title}
                  helperText={errors?.title?.message}
                  variant="outlined"
                  type="text"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">message</Icon>
            </div>
            <Controller
              control={control}
              name="message"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Ticket Message"
                  id="message"
                  error={!!errors.message}
                  helperText={errors?.message?.message}
                  variant="outlined"
                  type="text"
                  fullWidth
                  multiline
                  minRows={4}
                />
              )}
            />
          </div>
        </DialogContent>

        {ticketDialog.type === 'new' ? (
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
              {ticketDialog && ticketDialog.data && user.id !== ticketDialog.data.userId && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(ev) => dispatch(setReplyDialogopen(true))}
                >
                  Reply
                </Button>
              )}
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

export default TicketDialog;
