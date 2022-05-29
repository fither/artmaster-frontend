import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import { styled } from '@mui/material/styles';
import LabelsDialog from './dialogs/labels/LabelsDialog';
import NoteDialog from './dialogs/note/NoteDialog';
import NewNote from './NewNote';
import NoteList from './NoteList';
import NotesHeader from './NotesHeader';
import NotesSidebarContent from './NotesSidebarContent';
import reducer from './store';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    minHeight: 72,
    height: 72,
  },
  '& .FusePageSimple-contentWrapper': {
    padding: 16,
    paddingBottom: 80,
    [theme.breakpoints.up('sm')]: {
      padding: 24,
    },
  },
  '& .FusePageSimple-content': {
    display: 'flex',
    minHeight: '100%',
  },
  '& .FusePageSimple-sidebar': {
    width: 256,
    border: 0,
  },
}));

function NotesApp(props) {
  const pageLayout = useRef(null);

  return (
    <>
      <Root
        header={<NotesHeader pageLayout={pageLayout} />}
        content={
          <div className="flex flex-col w-full items-center">
            <NewNote />
            <NoteList />
            <NoteDialog />
            <LabelsDialog />
          </div>
        }
        leftSidebarContent={<NotesSidebarContent />}
        sidebarInner
        ref={pageLayout}
      />
    </>
  );
}

export default withReducer('notesApp', reducer)(NotesApp);
