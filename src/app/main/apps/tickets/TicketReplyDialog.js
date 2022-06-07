import { yupResolver } from '@hookform/resolvers/yup';
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { WebSocketContext } from 'app/ws/WebSocket';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import { setReplyDialogopen } from './store/ticketsSlice';

const defaultValues = {
  replyText: '',
};

const schema = yup.object().shape({
  replyText: '',
});

function TicketReplyDialog(props) {
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);
  const ticketDialog = useSelector(({ ticketsApp }) => ticketsApp.tickets.ticketDialog);
  const replyDialogOpen = useSelector(({ ticketsApp }) => ticketsApp.tickets.replyDialogOpen);
  const [ticketId, setTicketId] = useState('');

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const initDialog = useCallback(() => {
    if (ticketDialog && ticketDialog.data) {
      setTicketId(ticketDialog.data.id);
    }
  }, [ticketDialog]);

  useEffect(() => {
    if (replyDialogOpen) {
      initDialog();
    } else {
      setTicketId('');
    }
  }, [initDialog, replyDialogOpen]);

  function closeComposeDialog() {
    dispatch(setReplyDialogopen(false));
  }

  function onSubmit(data) {
    ws.sendMessage('ticket/reply', {
      ...data,
      id: ticketId,
    });
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      open={replyDialogOpen}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="md"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Reply to {ticketDialog && ticketDialog.data ? ticketDialog.data.title : ''}
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
              <Icon color="action">content</Icon>
            </div>
            <Controller
              control={control}
              name="replyText"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Reply Text"
                  id="replyText"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={2}
                />
              )}
            />
          </div>
        </DialogContent>
        <DialogActions className="justify-between p-4 pb-16">
          <div className="px-16">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              Send
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default TicketReplyDialog;
