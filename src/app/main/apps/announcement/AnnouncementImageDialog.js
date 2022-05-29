import _ from '@lodash';
import {
  Dialog,
  AppBar,
  Typography,
  TableBody,
  TableCell,
  DialogContent,
  Tooltip,
  Table,
  TableRow,
  Toolbar,
  IconButton,
  Icon,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { WebSocketContext } from 'app/ws/WebSocket';
import { format } from 'date-fns';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnnouncementUploadImage from './AnnouncementUploadImage';
import { setImagesDialogOpen } from './store/announcementsSlice';

function AnnouncementImageDialog(props) {
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);
  const announcementImages = useSelector(
    ({ announcementApp }) => announcementApp.announcements.images
  );
  const dialogOpen = useSelector(
    ({ announcementApp }) => announcementApp.announcements.imagesDialogOpen
  );
  const [imageBase64, setImageBase64] = useState('');
  const [imageName, setImageName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  function closeComposeDialog() {
    dispatch(setImagesDialogOpen(false));
  }

  function handleSave(ev) {
    ev.preventDefault();

    ws.sendMessage('announcement/createImage', {
      fileName: imageName,
      image: imageBase64,
    });

    clearValues();
  }

  function clearValues() {
    setSelectedImage(null);
    setImageName('');
    setImageBase64('');
  }

  function handleRemove(id) {
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Confirm Delete Image</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-text">
                Do you confirm deleting image?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  ws.sendMessage('announcement/removeImage', id);
                  dispatch(closeDialog());
                  clearValues();
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
      open={dialogOpen}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="md"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Edit Announcement Images
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent classes={{ root: 'p-24' }} style={{ display: 'flex' }}>
        <div style={{ width: '75%' }}>
          <Table style={{ height: 'fit-content ' }} stickyHeader className="grow overflow-x-auto">
            <TableBody>
              <TableRow className="h-72">
                <TableCell className="p-4" component="th" scope="row">
                  <Tooltip title="Select image" placement="bottom">
                    <div>
                      <AnnouncementUploadImage
                        onChange={({ base64, name }) => {
                          setImageBase64(base64);
                          setImageName(name);
                          setSelectedImage({
                            id: 0,
                            image: base64,
                            fileName: name,
                            createdAt: new Date(),
                          });
                        }}
                      />
                    </div>
                  </Tooltip>
                </TableCell>
                <TableCell
                  className="p-4"
                  component="th"
                  scope="row"
                  style={{ cursor: 'pointer' }}
                  onClick={(ev) => {
                    if (imageBase64) {
                      setSelectedImage({
                        id: 0,
                        image: imageBase64,
                        fileName: imageName,
                        createdAt: new Date(),
                      });
                    } else {
                      setSelectedImage(null);
                    }
                  }}
                >
                  {imageName || 'File Name'}
                </TableCell>
                <TableCell className="p-4" component="th" scope="row">
                  {imageName !== '' ? format(new Date(), 'dd.MM.yyyy') : 'Created At'}
                </TableCell>
                <TableCell className="p-4" component="th" scope="row">
                  <IconButton onClick={(ev) => clearValues()} disabled={imageBase64 === ''}>
                    <Icon>cancel</Icon>
                  </IconButton>
                  <IconButton onClick={handleSave} disabled={imageBase64 === ''}>
                    <Icon>save</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
              {announcementImages &&
                announcementImages.length > 0 &&
                _.orderBy(announcementImages, [(i) => i.createdAt]).map((image) => {
                  return (
                    <TableRow key={image.id} className="h-72">
                      <TableCell className="p-4" component="th" scope="row">
                        {image.id}
                      </TableCell>
                      <TableCell
                        className="p-4 truncate"
                        component="th"
                        scope="row"
                        style={{ cursor: 'pointer' }}
                        onClick={(ev) => setSelectedImage(image)}
                      >
                        {image.fileName}
                      </TableCell>
                      <TableCell className="p-4" component="th" scope="row">
                        {format(new Date(image.createdAt), 'dd.MM.yyyy')}
                      </TableCell>
                      <TableCell className="p-4" component="th" scope="row">
                        <IconButton onClick={(ev) => handleRemove(image.id)}>
                          <Icon>delete</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <div style={{ width: '25%' }}>
          {selectedImage && (
            <img src={selectedImage.image} className="w-full block" alt={selectedImage.fileName} />
          )}

          {!selectedImage && <Typography align="center">Select an image to view</Typography>}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AnnouncementImageDialog;
