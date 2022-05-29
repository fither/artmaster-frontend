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
import { useCallback, useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'app/ws/WebSocket';
import draftjs from 'draft-js';

import _ from '@lodash';
import * as yup from 'yup';

import { DialogContentText, DialogTitle, MenuItem } from '@mui/material';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import MUIRichTextEditor from 'mui-rte';
import {
  closeEditAnnouncementDialog,
  closeNewAnnouncementDialog,
} from './store/announcementsSlice';
import { selectCategories } from './store/categoriesSlice';

const defaultValues = {
  title: '',
  content: '',
  category: '',
};

const schema = yup.object().shape({
  title: yup.string().required('You must enter a title'),
  content: yup.string().required('You must enter a content'),
  category: yup.string().required('You must select a category'),
});

function AnnouncementDialog(props) {
  const dispatch = useDispatch();
  const announcementDialog = useSelector(
    ({ announcementApp }) => announcementApp.announcements.announcementDialog
  );
  const categories = useSelector(selectCategories);
  const user = useSelector(({ auth }) => auth.user);
  const ws = useContext(WebSocketContext);
  const { control, watch, reset, handleSubmit, formState, getValues, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const content = watch('content');

  const [defaultValue, setDefaultValue] = useState('');

  const initDialog = useCallback(() => {
    if (announcementDialog.type === 'edit' && announcementDialog.data) {
      reset({ ...announcementDialog.data });
      setDefaultValue(announcementDialog.data.content);
    }

    if (announcementDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...announcementDialog.data,
      });
    }
  }, [announcementDialog.data, announcementDialog.type, reset]);

  useEffect(() => {
    if (announcementDialog.props.open) {
      initDialog();
    }
  }, [announcementDialog.props.open, initDialog]);

  function closeComposeDialog() {
    return announcementDialog.type === 'edit'
      ? dispatch(closeEditAnnouncementDialog())
      : dispatch(closeNewAnnouncementDialog());
  }

  function onSubmit(data) {
    if (announcementDialog.type === 'new') {
      ws.sendMessage('announcement/add', data);
    } else {
      ws.sendMessage('announcement/update', {
        ...announcementDialog.data,
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
            <DialogTitle id="alert-dialog-title">Confirm Delete Announcement</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-text">
                Do you confirm deleting announcement?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  ws.sendMessage('announcement/remove', id);
                  closeComposeDialog();
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
  }

  function onChange(data) {
    const stringData = JSON.stringify((0, draftjs.convertToRaw)(data.getCurrentContent()));
    setValue('content', stringData, { shouldDirty: true, shouldValidate: true });
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...announcementDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="md"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {announcementDialog.type === 'new' ? 'New Announcement' : 'Edit Announcement'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mb:overflow-hidden"
      >
        <DialogContent style={{ minWidth: '300px' }} classes={{ root: 'pb-24' }}>
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
                  label="Category"
                  id="category"
                  variant="outlined"
                  select
                  fullWidth
                  required
                >
                  {categories.map((c) => {
                    return (
                      <MenuItem value={c.value} key={c.id}>
                        {c.label}
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
                  label="Title"
                  id="title"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">text_snippet</Icon>
            </div>
            <div style={{ minHeight: '400px' }}>
              <MUIRichTextEditor
                defaultValue={defaultValue}
                onChange={onChange}
                label="Start Typing..."
              />
            </div>
          </div>
        </DialogContent>

        {announcementDialog.type === 'new' ? (
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
              <IconButton onClick={() => handleRemove()} size="large">
                <Icon>delete</Icon>
              </IconButton>
            </div>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default AnnouncementDialog;
