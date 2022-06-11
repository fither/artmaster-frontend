import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { WebSocketContext } from 'app/ws/WebSocket';
import { motion } from 'framer-motion';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectContacts } from '../contacts/store/contactsSlice';
import ContactListItem from './ContactListItem';
import StatusIcon from './StatusIcon';
import { setSelectedContactId } from './store/contactsSlice';
import { closeMobileChatsSidebar, openUserSidebar } from './store/sidebarsSlice';

const statusArr = [
  {
    title: 'Online',
    value: 'online',
  },
  {
    title: 'Away',
    value: 'away',
  },
  {
    title: 'Do not disturb',
    value: 'do-not-disturb',
  },
  {
    title: 'Offline',
    value: 'offline',
  },
];

function ChatsSidebar(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const nonContactUsers = useSelector(({ contactsApp }) => contactsApp.contacts.nonContactUsers);
  const user = useSelector(({ auth }) => auth.user);
  const messages = useSelector(({ chatApp }) => chatApp.chat.messages);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const ws = useContext(WebSocketContext);

  const [searchText, setSearchText] = useState('');
  const [statusMenuEl, setStatusMenuEl] = useState(null);
  const [moreMenuEl, setMoreMenuEl] = useState(null);

  const navigate = useNavigate();

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fChatList = [];
    if (contacts.length > 0 && user && messages) {
      Object.keys(messages).forEach((_chat) => {
        const findedContact = contacts.find((contact) => `${contact.id}` === `${_chat}`);
        if (findedContact) {
          const messagesLength = messages[_chat].length;
          const newFindedContact = { ...findedContact };
          newFindedContact.lastMessage = messages[_chat][messagesLength - 1];
          newFindedContact.unread =
            messages[_chat].filter((c) => c.unread && `${c.senderId}` !== `${user.id}`).length ||
            '';
          fChatList.push(newFindedContact);
        } else if (nonContactUsers[`${_chat}`]) {
          const messagesLength = messages[_chat].length;
          const newFindedContact = { ...nonContactUsers[`${_chat}`] };
          newFindedContact.lastMessage = messages[_chat][messagesLength - 1];
          newFindedContact.unread =
            messages[_chat].filter((c) => c.unread && `${c.senderId}` !== `${user.id}`).length ||
            '';
          fChatList.push(newFindedContact);
        } else {
          ws.sendMessage('user/whois', _chat);
        }
      });
    }
    setChatList(fChatList);
  }, [contacts, messages, nonContactUsers, user, ws]);

  function handleMoreMenuClick(event) {
    setMoreMenuEl(event.currentTarget);
  }

  function handleMoreMenuClose(event) {
    setMoreMenuEl(null);
  }

  function handleStatusMenuClick(event) {
    event.preventDefault();
    event.stopPropagation();
    setStatusMenuEl(event.currentTarget);
  }

  function handleStatusSelect(event, status) {
    event.preventDefault();
    event.stopPropagation();
    ws.sendMessage('user/updateUserData', { status });
    setStatusMenuEl(null);
  }

  function handleStatusClose(event) {
    event.preventDefault();
    event.stopPropagation();
    setStatusMenuEl(null);
  }

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  return (
    <div className="flex flex-col flex-auto h-full">
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar className="flex justify-between items-center px-4">
          {user && (
            <div
              className="relative w-40 h-40 p-0 mx-12 cursor-pointer"
              onClick={() => dispatch(openUserSidebar())}
              onKeyDown={() => dispatch(openUserSidebar())}
              role="button"
              tabIndex={0}
            >
              <Avatar src={user.data.photoURL} alt={user.firstName} className="w-40 h-40">
                {!user.data.photoURL || user.data.photoURL === '' ? user.data.displayName[0] : ''}
              </Avatar>
              <div
                className="absolute right-0 bottom-0 -m-4 z-10 cursor-pointer"
                aria-owns={statusMenuEl ? 'switch-menu' : null}
                aria-haspopup="true"
                onClick={handleStatusMenuClick}
                onKeyDown={handleStatusMenuClick}
                role="button"
                tabIndex={0}
              >
                <StatusIcon status={user.data.status} />
              </div>

              <Menu
                id="status-switch"
                anchorEl={statusMenuEl}
                open={Boolean(statusMenuEl)}
                onClose={handleStatusClose}
              >
                {statusArr.map((status) => (
                  <MenuItem
                    onClick={(ev) => handleStatusSelect(ev, status.value)}
                    key={status.value}
                  >
                    <ListItemIcon className="min-w-40">
                      <StatusIcon status={status.value} />
                    </ListItemIcon>
                    <ListItemText primary={status.title} />
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}

          <div>
            <IconButton
              aria-owns={moreMenuEl ? 'chats-more-menu' : null}
              aria-haspopup="true"
              onClick={handleMoreMenuClick}
              size="large"
            >
              <Icon>more_vert</Icon>
            </IconButton>
            <Menu
              id="chats-more-menu"
              anchorEl={moreMenuEl}
              open={Boolean(moreMenuEl)}
              onClose={handleMoreMenuClose}
            >
              <MenuItem onClick={() => navigate('/pages/profile')}>Profile</MenuItem>
              <MenuItem onClick={handleMoreMenuClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
        {useMemo(
          () => (
            <Toolbar className="px-16">
              <Paper className="flex p-4 items-center w-full px-8 py-4 shadow">
                <Icon color="action">search</Icon>

                <Input
                  placeholder="Search or start new chat"
                  className="flex flex-1 px-8"
                  disableUnderline
                  fullWidth
                  value={searchText}
                  inputProps={{
                    'aria-label': 'Search',
                  }}
                  onChange={handleSearchText}
                />
              </Paper>
            </Toolbar>
          ),
          [searchText]
        )}
      </AppBar>

      <FuseScrollbars className="overflow-y-auto flex-1">
        <List className="w-full">
          {useMemo(() => {
            function getFilteredArray(arr, _searchText) {
              if (_searchText.length === 0) {
                return arr;
              }
              return FuseUtils.filterArrayByString(arr, _searchText);
            }

            const filteredContacts = getFilteredArray([...contacts], searchText);
            const filteredChatList = getFilteredArray([...chatList], searchText);

            const container = {
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            };

            const item = {
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            };

            return (
              <motion.div
                className="flex flex-col shrink-0"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredChatList.length > 0 && (
                  <motion.div variants={item}>
                    <Typography className="font-medium text-20 px-16 py-24" color="secondary">
                      Chats
                    </Typography>
                  </motion.div>
                )}

                {filteredChatList.map((contact) => (
                  <motion.div variants={item} key={`${contact.id}-${contact.id}`}>
                    <ContactListItem
                      contact={contact}
                      fromList="chat"
                      onContactClick={(contactId) => {
                        dispatch(setSelectedContactId(contact.id));
                        if (contact.unread) {
                          ws.sendMessage('message/setMessagesAsRead', contact.id);
                        }
                        if (isMobile) {
                          dispatch(closeMobileChatsSidebar());
                        }
                      }}
                    />
                  </motion.div>
                ))}

                {filteredContacts.length > 0 && (
                  <motion.div variants={item}>
                    <Typography className="font-medium text-20 px-16 py-24" color="secondary">
                      Contacts
                    </Typography>
                  </motion.div>
                )}

                {filteredContacts.map((contact) => (
                  <motion.div variants={item} key={contact.id}>
                    <ContactListItem
                      contact={contact}
                      fromList="contact"
                      onContactClick={(contactId) => {
                        dispatch(setSelectedContactId(contactId));
                        if (isMobile) {
                          dispatch(closeMobileChatsSidebar());
                          if (contact.unread) {
                            ws.sendMessage('message/setMessagesAsRead', contact.id);
                          }
                        }
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            );
          }, [contacts, searchText, chatList, dispatch, isMobile, ws])}
        </List>
      </FuseScrollbars>
    </div>
  );
}

export default ChatsSidebar;
