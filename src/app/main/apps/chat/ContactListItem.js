import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import { Box } from '@mui/system';
import StatusIcon from './StatusIcon';

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  ...(active && {
    backgroundColor: theme.palette.background.paper,
  }),
}));

function ContactListItem(props) {
  return (
    <StyledListItem
      button
      className="px-16 py-12 min-h-92"
      active={props.selectedContactId === props.contact.id ? 1 : 0}
      onClick={() => props.onContactClick(props.contact.id)}
    >
      <div className="relative">
        <div className="absolute right-0 bottom-0 -m-4 z-10">
          <StatusIcon status={props.contact.status} />
        </div>

        <Avatar src={props.contact.photoURL} alt={props.contact.firstName}>
          {(!props.contact.photoURL || props.contact.photoURL === '') && props.contact.firstName
            ? props.contact.firstName[0]
            : ''}
        </Avatar>
      </div>

      <ListItemText
        classes={{
          root: 'min-w-px px-16',
          primary: 'font-medium text-14',
          secondary: 'truncate',
        }}
        primary={props.contact.firstName}
        secondary={
          // eslint-disable-next-line no-nested-ternary
          props.fromList === 'contact'
            ? props.contact.mood
            : props.contact.lastMessage
            ? props.contact.lastMessage.message
            : ''
        }
      />

      {props.contact.lastMessage && (
        <div className="flex flex-col justify-center items-end">
          {props.contact.lastMessage.createdAt && (
            <Typography
              className="whitespace-nowrap mb-8 font-medium text-12"
              color="textSecondary"
            >
              {format(new Date(props.contact.lastMessage.createdAt), 'PP')}
            </Typography>
          )}
          {props.contact.unread && (
            <Box
              sx={{
                backgroundColor: 'secondary.main',
                color: 'secondary.contrastText',
              }}
              className="flex items-center justify-center min-w-24 h-24 rounded-full font-medium text-12 text-center"
            >
              {props.contact.unread}
            </Box>
          )}
        </div>
      )}
    </StyledListItem>
  );
}

export default ContactListItem;
