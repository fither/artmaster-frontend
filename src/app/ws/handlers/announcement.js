import {
  addAnnouncement,
  removeAnnouncement,
  setAnnouncements,
  updateAnnouncement,
  setAnnouncementImages,
  addAnnouncementImage,
  removeAnnouncementImage,
} from 'app/main/apps/announcement/store/announcementsSlice';

const handleAnnouncement = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setAnnouncements(data));
      break;
    case 'add':
      dispatch(addAnnouncement(data));
      break;
    case 'update':
      dispatch(updateAnnouncement(data));
      break;
    case 'remove':
      dispatch(removeAnnouncement(data));
      break;
    case 'findAllImages':
      dispatch(setAnnouncementImages(data));
      break;
    case 'createImage':
      dispatch(addAnnouncementImage(data));
      break;
    case 'removeImage':
      dispatch(removeAnnouncementImage(data));
      break;
    default:
      break;
  }
};

export default handleAnnouncement;
