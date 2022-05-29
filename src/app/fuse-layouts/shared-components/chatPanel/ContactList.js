import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'app/main/apps/contacts/store/contactsSlice';
import { openChatPanel } from './store/stateSlice';
import ContactButton from './ContactButton';
import { setSelectedContactId } from './store/contactsSlice';

const Root = styled(FuseScrollbars)(({ theme }) => ({
  background: theme.palette.background.paper,
}));

function ContactList(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const selectedContactId = useSelector(({ chatPanel }) => chatPanel.contacts.selectedContactId);
  const user = useSelector(({ auth }) => auth.user);
  const messages = useSelector(({ chatApp }) => chatApp.chat.messages);

  const [chatList, setChatList] = useState([]);

  const contactListScroll = useRef(null);

  useEffect(() => {
    const fChatList = [];
    if (contacts.length > 0 && user && messages) {
      Object.keys(messages).forEach((_chat) => {
        const findedContact = contacts.find((contact) => `${contact.id}` === `${_chat}`);
        if (findedContact) {
          fChatList.push(findedContact);
        }
      });
    }
    setChatList(fChatList);
  }, [contacts, messages, user]);

  const handleContactClick = (contactId) => {
    dispatch(openChatPanel());
    dispatch(setSelectedContactId(contactId));
    scrollToTop();
  };

  const scrollToTop = () => {
    contactListScroll.current.scrollTop = 0;
  };

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <Root
      className="flex shrink-0 flex-col overflow-y-auto py-8 overscroll-contain"
      ref={contactListScroll}
      option={{ suppressScrollX: true, wheelPropagation: false }}
    >
      {contacts.length > 0 && (
        <>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col shrink-0"
          >
            {user &&
              chatList &&
              chatList.map((contact) => {
                return (
                  <motion.div variants={item} key={contact.id}>
                    <ContactButton
                      contact={contact}
                      selectedContactId={selectedContactId}
                      onClick={handleContactClick}
                    />
                  </motion.div>
                );
              })}
            <Divider className="mx-24 my-8" />
            {contacts.map((contact) => {
              const chatContact = chatList.find((_chat) => _chat.contactId === contact.id);
              return !chatContact ? (
                <motion.div variants={item} key={contact.id}>
                  <ContactButton
                    contact={contact}
                    selectedContactId={selectedContactId}
                    onClick={handleContactClick}
                  />
                </motion.div>
              ) : (
                ''
              );
            })}
          </motion.div>
        </>
      )}
    </Root>
  );
}

export default memo(ContactList);
