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
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import _ from '@lodash';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import { Tooltip } from '@mui/material';
import { WebSocketContext } from 'app/ws/WebSocket';
import MailAttachment from './MailAttachment';
import MailAttachmentUpload from './MailAttachmentUpload';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  to: yup.string().required('You must enter an e-mail').email('You must enter a valid e-mail.'),
});

function MailCompose() {
  const [openDialog, setOpenDialog] = useState(false);
  const { watch, handleSubmit, formState, control, getValues, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
      to: '',
      cc: '',
      replyTo: '',
      subject: '',
      text: '',
      html: '',
      attachments: [],
    },
    resolver: yupResolver(schema),
  });
  const ws = useContext(WebSocketContext);

  const { isValid, dirtyFields, errors } = formState;

  const attachedFiles = watch('attachments');

  const { t } = useTranslation('mailApp');

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }

  function onSubmit(data) {
    ws.sendMessage('mail/send', data);
    setOpenDialog(false);
  }

  function handleAttachFileAdd(name, base64) {
    const newAttachedFiles = getValues('attachments');
    newAttachedFiles.push({ filename: name, content: base64 });
    setValue('attachments', newAttachedFiles, { shouldDirty: true, shouldValidate: true });
  }

  function handleAttachedFileRemove(name) {
    const oldAttachedFiles = getValues('attachments');
    const newAttachedFiles = oldAttachedFiles.filter((af) => af.filename !== name);
    setValue('attachments', newAttachedFiles, { shouldDirty: true, shouldValidate: true });
  }

  return (
    <div className="p-24 pb-8">
      <Button variant="contained" color="secondary" className="w-full" onClick={handleOpenDialog}>
        {t('COMPOSE')}
      </Button>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        scroll="body"
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              New Message
            </Typography>
          </Toolbar>
        </AppBar>

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
            <Controller
              name="to"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  label="To"
                  id="to"
                  error={!!errors.to}
                  helperText={errors?.to?.message}
                  autoFocus
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />

            <Controller
              name="cc"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  label="CC"
                  id="cc"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <Controller
              name="replyTo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  label="Reply To"
                  id="replyTo"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  label="Subject"
                  id="subject"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <Controller
              className="mt-8 mb-16"
              render={({ field }) => <WYSIWYGEditor {...field} />}
              name="html"
              control={control}
            />

            <div className="pt-8">
              {attachedFiles.map((af) => (
                <MailAttachment
                  key={af.filename}
                  fileName={af.filename}
                  size="12 kb"
                  onDelete={(name) => handleAttachedFileRemove(name)}
                />
              ))}
              {/* <MailAttachment fileName="attachment-2.doc" size="12 kb" /> */}
              {/* <MailAttachment fileName="attachment-1.jpg" size="350 kb" /> */}
            </div>
          </DialogContent>

          <DialogActions className="justify-between px-8 py-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Send
              </Button>
              <Tooltip title="Select File" placement="bottom">
                <div style={{ display: 'initial' }}>
                  <MailAttachmentUpload
                    onChange={({ base64, name }) => {
                      handleAttachFileAdd(name, base64);
                    }}
                  />
                </div>
              </Tooltip>
            </div>
            <IconButton onClick={handleDelete} size="large">
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default MailCompose;
