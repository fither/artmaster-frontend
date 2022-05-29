import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'app/ws/WebSocket';
import ContactsTable from './ContactsTable';
import { selectContacts } from './store/contactsSlice';

function ContactsList(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
  const user = useSelector(({ auth }) => auth.user);
  const ws = useContext(WebSocketContext);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'photo_url',
        Cell: ({ row }) => {
          return <Avatar className="mx-8" alt={row.original.name} src={row.original.photoURL} />;
        },
        className: 'justify-center',
        width: 64,
        sortable: false,
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Username',
        accessor: 'username',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Email',
        accessor: 'email',
        sortable: true,
      },
      {
        Header: 'Country',
        accessor: 'country.name',
        sortable: true,
      },
      {
        id: 'action',
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <IconButton
              onClick={(ev) => {
                ev.stopPropagation();
                // dispatch(toggleStarredContact(row.original.id));
              }}
              size="large"
            >
              {user.starred && user.starred.includes(row.original.id) ? (
                <Icon className="text-yellow-700">star</Icon>
              ) : (
                <Icon>star_border</Icon>
              )}
            </IconButton>
            <IconButton
              onClick={(ev) => {
                ev.stopPropagation();
                ws.sendMessage('contact/remove', row.original.id);
              }}
              disabled={!row.original.isFromContact}
              size="large"
            >
              <Icon>delete</Icon>
            </IconButton>
          </div>
        ),
      },
    ],
    [user.starred, ws]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return contacts;
      }
      return FuseUtils.filterArrayByString(contacts, _searchText);
    }

    if (contacts) {
      setFilteredData(getFilteredArray(contacts, searchText));
    }
  }, [contacts, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no contacts!
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-auto w-full max-h-full"
    >
      <ContactsTable columns={columns} data={filteredData} />
    </motion.div>
  );
}

export default ContactsList;
