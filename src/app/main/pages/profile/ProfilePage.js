import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useCallback, useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { WebSocketContext } from 'app/ws/WebSocket';
import { setExternalUserLoading } from 'app/main/apps/users/store/usersSlice';
import FuseLoading from '@fuse/core/FuseLoading';
import { setSelectedContactId } from 'app/main/apps/chat/store/contactsSlice';
import AboutTab from './tabs/AboutTab';
import PhotosVideosTab from './tabs/PhotosVideosTab';
import ProfileUpdateDialog from './ProfileUpdateDialog';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-topBg': {
    background: 'url("assets/images/profile/morain-lake.jpg")!important',
    backgroundSize: 'cover!important',
    backgroundPosition: 'center center!important',
  },

  '& .FusePageSimple-header': {
    background: 'none',
    height: 320,
    minHeight: 320,
    [theme.breakpoints.down('lg')]: {
      height: 240,
      minHeight: 240,
    },
  },

  '& .FusePageSimple-wrapper': {
    background: 'transparent',
  },

  '& .FusePageSimple-content': {
    width: '100%',
    maxWidth: 1120,
    margin: 'auto',
  },

  '& .FusePageSimple-toolbar': {
    width: '100%',
    maxWidth: 1120,
    margin: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'auto',
    height: 'auto',
    aliginItesm: 'flex-start',
  },
}));

function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  const user = useSelector(({ auth }) => auth.user);
  const params = useParams();

  const [userData, setUserData] = useState(null);
  const [isExternalUser, setIsExternalUser] = useState(false);
  const externalUserLoading = useSelector(({ usersApp }) => usersApp.users.externalUserLoading);
  const externalUser = useSelector(({ usersApp }) => usersApp.users.externalUser);
  const ws = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  function handleOnClick(ev) {
    ev.preventDefault();
    const userId = externalUser ? externalUser.id : '';
    if (userId) {
      dispatch(setSelectedContactId(userId));
      navigate('/apps/chat');
    }
  }

  const getExternalUser = useCallback(() => {
    if (!externalUserLoading && !userData) {
      dispatch(setExternalUserLoading(true));
      ws.sendMessage('user/findOne', params.userId);
    } else if (externalUserLoading && !userData && !!externalUser) {
      setUserData(externalUser);
      dispatch(setExternalUserLoading(false));
    }
  }, [dispatch, externalUser, externalUserLoading, params.userId, userData, ws]);

  useEffect(() => {
    if (!params.userId) {
      setUserData(user);
    } else {
      setIsExternalUser(true);
      getExternalUser();
    }
  }, [getExternalUser, params, user]);

  if (isExternalUser && externalUserLoading) {
    return <FuseLoading />;
  }

  if (!userData || !userData.data) {
    return null;
  }

  return (
    <Root
      header={<></>}
      contentToolbar={
        <>
          <div className="w-full px-24 pb-48 flex flex-col md:flex-row flex-1 items-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
              <Avatar
                sx={{
                  borderWidth: 4,
                  borderStyle: 'solid',
                  borderColor: 'background.default',
                }}
                className="-mt-64  w-128 h-128"
                src={userData.data.photoURL}
              />
            </motion.div>
            <div className="flex flex-col md:flex-row flex-1 items-center justify-between p-8">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              >
                <Typography
                  className="md:px-16 text-24 md:text-32 font-semibold tracking-tight"
                  variant="h4"
                  color="inherit"
                >
                  {`${userData.firstName} ${userData.lastName}`}
                </Typography>
              </motion.div>

              <div className="flex items-center justify-end -mx-4 mt-24 md:mt-0">
                {!params.userId && (
                  <Button
                    className="mx-8"
                    variant="contained"
                    color="secondary"
                    aria-label="Edit Profile"
                    onClick={(ev) => setProfileDialogOpen(true)}
                  >
                    Edit Profile
                  </Button>
                )}
                {!!params.userId && (
                  <Button
                    variant="contained"
                    color="primary"
                    aria-label="Send Message"
                    onClick={handleOnClick}
                  >
                    Send Message
                  </Button>
                )}
              </div>
            </div>
          </div>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons={false}
            className="w-full px-24 -mx-4 min-h-40"
            classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
            TabIndicatorProps={{
              children: (
                <Box
                  sx={{ bgcolor: 'text.disabled' }}
                  className="w-full h-full rounded-full opacity-20"
                />
              ),
            }}
          >
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
              disableRipple
              label="About"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
              disableRipple
              label="Photos & Videos"
            />
          </Tabs>
          <ProfileUpdateDialog
            open={profileDialogOpen}
            onClose={(ev) => setProfileDialogOpen(false)}
          />
        </>
      }
      content={
        <div className="p-16 sm:p-24">
          {selectedTab === 0 && <AboutTab user={userData} />}
          {selectedTab === 1 && <PhotosVideosTab />}
        </div>
      }
    />
  );
}

export default ProfilePage;
