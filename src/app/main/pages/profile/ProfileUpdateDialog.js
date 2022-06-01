import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import {
  Toolbar,
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Icon,
  TextField,
  MenuItem,
  Avatar,
  Tooltip,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { useCallback, useContext, useEffect } from 'react';
import _ from '@lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { WebSocketContext } from 'app/ws/WebSocket';
import ProfileUploadImage from './ProfileUploadImage';

const defaultValues = {
  photoURL: '',
  gender: '',
  dateOfBirth: '',
  aboutMe: '',
  occupation: '',
  skills: '',
  jobs: '',
  address: '',
  phoneNumber: '',
  website: '',
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  // phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

const Root = styled('div')(({ theme }) => ({
  '& .MuiAvatar-root': {
    width: '15rem',
    height: '15rem',
  },
  '& .avatar-row': {
    position: 'relative',
  },
  '& .avatar-row > .action-buttons': {
    position: 'absolute',
    display: 'flex',
    bottom: '0',
    right: '15rem',
  },
  '& .select-image-button > label > span': {
    height: '4rem',
  },
  '& .select-image-button > label > span > .material-icons': {
    fontSize: '2.2rem',
    with: '2.2rem',
    height: '2.2rem',
  },
}));

function ProfileUpdateDialog(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const ws = useContext(WebSocketContext);

  const { control, watch, reset, handleSubmit, formState, getValues, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const photoUrl = watch('photoURL');

  const { isValid, dirtyFields, errors } = formState;

  const genderOptions = ['Male', 'Female'];

  function onSubmit(data) {
    ws.sendMessage('user/updateUserInfo', data);
    props.onClose();
  }

  const initDialog = useCallback(() => {
    const resetData = {
      photoURL: user.data.photoURL ? user.data.photoURL : '',
      gender: user.data.gender ? user.data.gender : '',
      dateOfBirth: user.data.dateOfBirth ? user.data.dateOfBirth : '',
      aboutMe: user.data.aboutMe ? user.data.aboutMe : '',
      occupation: user.data.occupation ? user.data.occupation : '',
      skills: user.data.skills ? user.data.skills : '',
      jobs: user.data.jobs ? user.data.jobs : '',
      address: user.data.address ? user.data.address : '',
      phoneNumber: user.data.phoneNumber ? user.data.phoneNumber : '',
      website: user.data.website ? user.data.website : '',
    };

    reset(resetData);
  }, [
    reset,
    user.data.aboutMe,
    user.data.address,
    user.data.dateOfBirth,
    user.data.gender,
    user.data.jobs,
    user.data.occupation,
    user.data.phoneNumber,
    user.data.photoURL,
    user.data.skills,
    user.data.website,
  ]);

  useEffect(() => {
    if (props.open) {
      initDialog();
    }
  }, [initDialog, props.open]);

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      open={props.open}
      onClose={props.onClose}
      fullWidth
      maxWidth="sm"
    >
      <Root>
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              Update Profile
            </Typography>
          </Toolbar>
        </AppBar>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:overflow-hidden"
        >
          <DialogContent classes={{ root: 'p-24' }}>
            <div className="flex items-center justify-center avatar-row">
              <Avatar
                className="avatar w-72 h-72 p-8 box-content"
                alt="user photo"
                src={photoUrl}
              />
              <div className="action-buttons">
                <Tooltip title="Select image" className="select-image-button" placement="bottom">
                  <div>
                    <ProfileUploadImage
                      onChange={({ base64, name }) => {
                        setValue('photoURL', base64, { shouldDirty: true, shouldValidate: true });
                      }}
                    />
                  </div>
                </Tooltip>

                <Tooltip title="Remove Photo" placement="bottom">
                  <IconButton onClick={() => setValue('photoURL')}>
                    <Icon color="action">cancel</Icon>
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action" />
              </div>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Gender"
                    id="gender"
                    variant="outlined"
                    select
                    fullWidth
                  >
                    {genderOptions.map((gender) => {
                      return (
                        <MenuItem key={gender} value={gender}>
                          {gender}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              />
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">cake</Icon>
              </div>
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    id="dateOfBirth"
                    label="Birthday"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">title</Icon>
              </div>
              <Controller
                control={control}
                name="aboutMe"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="About Me"
                    id="aboutMe"
                    variant="outlined"
                    type="text"
                    fullWidth
                    multiline
                    minRows={2}
                  />
                )}
              />
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">title</Icon>
              </div>
              <Controller
                control={control}
                name="occupation"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Occupation"
                    id="occupation"
                    variant="outlined"
                    type="text"
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">title</Icon>
              </div>
              <Controller
                control={control}
                name="skills"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Skills"
                    id="skills"
                    variant="outlined"
                    type="text"
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">work</Icon>
              </div>
              <Controller
                control={control}
                name="jobs"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Jobs"
                    id="jobs"
                    variant="outlined"
                    type="text"
                    multiline
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">home</Icon>
              </div>
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Address"
                    id="address"
                    variant="outlined"
                    type="text"
                    fullWidth
                    multiline
                    minRows={2}
                  />
                )}
              />
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">phone</Icon>
              </div>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Phone Number"
                    id="phoneNumber"
                    error={!!errors.phoneNumber}
                    helperText={errors?.phoneNumber?.message}
                    variant="outlined"
                    type="tel"
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">web</Icon>
              </div>
              <Controller
                control={control}
                name="website"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Website"
                    id="website"
                    variant="outlined"
                    type="text"
                    fullWidth
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
                Update
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={(ev) => {
                  ev.preventDefault();
                  initDialog();
                }}
              >
                Reset
              </Button>
            </div>
          </DialogActions>
        </form>
      </Root>
    </Dialog>
  );
}

export default ProfileUpdateDialog;
