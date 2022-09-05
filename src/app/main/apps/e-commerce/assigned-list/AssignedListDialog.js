import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'app/ws/WebSocket';

import _ from '@lodash';
import * as yup from 'yup';
import { FormControl, TextField } from '@mui/material';
import { closeAssignmentDialog } from '../store/assignmentsSlice';

const defaultValues = {
  note: '',
};

const schema = yup.object().shape({
  note: yup.string(),
});

function AssignmentDialog(props) {
  const assignmentsDialog = useSelector(
    ({ eCommerceApp }) => eCommerceApp.assignments.assignmentDialog
  );
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const initDialog = useCallback(() => {
    if (assignmentsDialog.data) {
      reset({
        ...assignmentsDialog.data,
        note: assignmentsDialog.data.note || '',
      });
    }
  }, [assignmentsDialog.data, reset]);

  function closeComposeDialog() {
    dispatch(closeAssignmentDialog());
  }

  useEffect(() => {
    if (assignmentsDialog.props.open) {
      initDialog();
    }
  }, [initDialog, assignmentsDialog.props.open]);

  function onSubmit(data) {
    if (assignmentsDialog.type === 'new') {
      ws.sendMessage('assignment/add', data);
    } else {
      ws.sendMessage('assignment/update', data);
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
            Assignment Edit
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden"
      >
        <DialogContent classes={{ root: 'pb-24' }}>
          <div className="px-16 sm:px-24">
            <FormControl className="mt-8 mb-16" required fullWidth>
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Note" multiline rows="6" variant="outlined" />
                )}
              />
            </FormControl>
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
