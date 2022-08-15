/* eslint-disable unused-imports/no-unused-imports */
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'app/ws/WebSocket';

import _ from '@lodash';
import * as yup from 'yup';

import { Autocomplete, DialogContentText, DialogTitle, MenuItem } from '@mui/material';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import {
  closeClassroomAssignmentDialog,
  selectClassroomAssignments,
} from './store/assignmentsSlice';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  '& .classroom-wrapper': {
    background: 'url("assets/images/classroom/classroom-plan.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: '835px',
    height: '575px',
    position: 'relative',
    '& .classroom-user-wrapper': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: '5rem',
      height: '5rem',
      '& > button': {
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 0, 0, .3)',
        '& span.material-icons': {
          fontSize: '3rem',
        },
      },
      '&.assigned-male': {
        '& > button span.material-icons': {
          color: 'blue',
        },
      },
      '&.assigned-female': {
        '& > button span.material-icons': {
          color: 'red',
        },
      },
    },
  },
  '& .users-wrapper': {
    flexGrow: '1',
  },
}));

function ClassroomsAssignDialog(props) {
  const dispatch = useDispatch();
  const assignments = useSelector(selectClassroomAssignments);
  const ws = useContext(WebSocketContext);
  const assignmentDialog = useSelector(
    ({ classroomsApp }) => classroomsApp.assignments.assignmentDialog
  );
  const [users, setUsers] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30,
  ]);

  const [selectedDesk, setSelectedDesk] = useState(null);

  const initDialog = useCallback(() => {
    if (assignmentDialog.data) {
      ws.sendMessage('assignment/findAllByClassroomId', assignmentDialog.data);
    }
  }, [assignmentDialog.data, ws]);

  useEffect(() => {
    if (assignmentDialog.props.open) {
      initDialog();
    }
  }, [assignmentDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(closeClassroomAssignmentDialog());
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...assignmentDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="lg"
    >
      <DialogContent classes={{ root: 'p-24' }}>
        <Root>
          <div className="classroom-wrapper">
            {users.map((user, index) => {
              const left = `${31 + (index % 5) * 10}rem`;
              const top = `${(index + 1 > 15 ? 20 : 12) + Math.floor(index / 5) * 5.25}rem`;
              const className = `classroom-user-wrapper ${
                // eslint-disable-next-line no-nested-ternary
                user % 3 === 0 ? 'assigned-male' : user % 3 === 1 ? 'assigned-female' : ''
              }`;
              return (
                <div
                  key={index}
                  className={className}
                  id={`classroom-user-wrapper-${user}`}
                  style={{ left, top }}
                >
                  <IconButton>
                    <Icon>person</Icon>
                  </IconButton>
                </div>
              );
            })}
          </div>
          <div className="users-wrapper">
            {assignments.map((assignment) => (
              <MenuItem key={assignment.id}>{assignment.customerName}</MenuItem>
            ))}
          </div>
        </Root>
      </DialogContent>
    </Dialog>
  );
}

export default ClassroomsAssignDialog;
