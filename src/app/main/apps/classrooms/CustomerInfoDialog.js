import FuseLoading from '@fuse/core/FuseLoading';
import { AppBar, Dialog, DialogContent, Icon, TextField, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeCustomerInfoDialog } from './store/classroomsSlice';

function CustomerInfoDialog(props) {
  const dispatch = useDispatch();
  const customerInfoDialog = useSelector(
    ({ classroomsApp }) => classroomsApp.classrooms.customerInfoDialog
  );

  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    if (customerInfoDialog.props.open && customerInfoDialog.data) {
      setCustomerInfo(customerInfoDialog.data);
    } else {
      setCustomerInfo(null);
    }
  }, [customerInfoDialog.data, customerInfoDialog.props.open]);

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...customerInfoDialog.props}
      onClose={() => dispatch(closeCustomerInfoDialog())}
      fullWidth
      maxWidth="md"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Customer Info
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent classes={{ root: 'p-24' }}>
        {customerInfo ? (
          <>
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">account_circle</Icon>
              </div>
              <div className="p-2" style={{ width: '50%' }}>
                <TextField
                  className="mb-24"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={customerInfo.first_name || ''}
                />
              </div>
              <div className="p-2" style={{ width: '50%' }}>
                <TextField
                  className="mb-24"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={customerInfo.last_name || ''}
                />
              </div>
            </div>
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">account_circle</Icon>
              </div>
              <div className="p-2" style={{ width: '50%' }}>
                <TextField
                  className="mb-24"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={customerInfo.email || ''}
                />
              </div>
              <div className="p-2" style={{ width: '50%' }}>
                <TextField
                  className="mb-24"
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={customerInfo.phone || ''}
                />
              </div>
            </div>
          </>
        ) : (
          <FuseLoading />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CustomerInfoDialog;
