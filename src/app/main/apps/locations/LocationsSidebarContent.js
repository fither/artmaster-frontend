import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { openNewLocationDialog } from './store/locationsSlice';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: 'inherit!important',
  textDecoration: 'none!important',
  height: 40,
  width: '100%',
  borderRadius: 6,
  paddingLeft: 12,
  paddingRight: 12,
  marginBottom: 4,
  '&.active': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, .05)!important'
        : 'rgba(255, 255, 255, .1)!important',
    pointerEvents: 'none',
    '& .list-item-icon': {
      color: 'inherit',
    },
  },
  '& .list-item-icon': {
    fontSize: 16,
    width: 16,
    height: 16,
    marginRight: 16,
  },
}));

function LocationsSidebarContent(props) {
  const locations = useSelector(({ locationsApp }) => locationsApp.locations);

  const dispatch = useDispatch();

  return (
    <div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
      <Paper
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
        className="rounded-0 shadow-none lg:rounded-16 lg:shadow"
      >
        <div className="p-24">
          <Button
            variant="contained"
            color="secondary"
            className="w-full"
            onClick={(ev) => dispatch(openNewLocationDialog())}
          >
            New Location
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default LocationsSidebarContent;
