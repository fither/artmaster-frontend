import {
  addNote,
  closeNoteDialog,
  removeNote,
  setNotes,
  updateNote,
} from 'app/main/apps/notes/store/notesSlice';

const handleNote = ({ eventAction, data, dispatch, ws }) => {
  switch (eventAction) {
    case 'findAll':
      dispatch(setNotes(data));
      break;
    case 'add':
      dispatch(addNote(data));
      break;
    case 'update':
      dispatch(updateNote(data));
      break;
    case 'remove':
      dispatch(removeNote(data));
      dispatch(closeNoteDialog());
      break;
    default:
      break;
  }
};

export default handleNote;
