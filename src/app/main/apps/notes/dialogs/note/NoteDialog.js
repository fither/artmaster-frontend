import { useDebounce } from '@fuse/hooks';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import NoteForm from 'app/main/apps/notes/note-form/NoteForm';
import { WebSocketContext } from 'app/ws/WebSocket';
import { forwardRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeNoteDialog } from '../../store/notesSlice';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NoteDialog(props) {
  const dispatch = useDispatch();
  const notes = useSelector(({ notesApp }) => notesApp.notes);
  const ws = useContext(WebSocketContext);

  const handleOnChange = useDebounce((note) => {
    ws.sendMessage('note/update', note);
  }, 600);

  function handleOnRemove() {
    ws.sendMessage('note/remove', notes.noteDialogId);
  }

  if (!notes.entities) {
    return null;
  }

  return (
    <Dialog
      classes={{
        paper: 'w-full m-24',
      }}
      TransitionComponent={Transition}
      onClose={(ev) => dispatch(closeNoteDialog())}
      open={Boolean(notes.noteDialogId)}
    >
      <NoteForm
        note={notes.entities[notes.noteDialogId]}
        onChange={handleOnChange}
        onClose={(ev) => dispatch(closeNoteDialog())}
        onRemove={handleOnRemove}
      />
    </Dialog>
  );
}

export default NoteDialog;
