import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import TableHead from '@mui/material/TableHead';
import { Box } from '@mui/system';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { WebSocketContext } from 'app/ws/WebSocket';

const rows = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'ID',
    sort: true,
  },
  {
    id: 'done',
    align: 'left',
    disablePadding: false,
    label: 'Done',
    sort: true,
  },
  {
    id: 'product-name',
    align: 'left',
    disablePadding: false,
    label: 'Product Name',
    sort: true,
  },
  {
    id: 'booking-date',
    align: 'left',
    disablePadding: false,
    label: 'Booking Date',
    sort: true,
  },
  {
    id: 'customer-name',
    align: 'left',
    disablePadding: false,
    label: 'Customer Name',
    sort: true,
  },
  {
    id: 'class-name',
    align: 'left',
    disablePadding: false,
    label: 'Class Name',
    sort: true,
  },
  {
    id: 'flagged',
    align: 'left',
    disablePAdding: false,
    label: 'Flagged',
    sort: true,
  },
];

function OrdersTableHead(props) {
  const { selectedOrderIds } = props;
  const numSelected = selectedOrderIds.length;
  const ws = useContext(WebSocketContext);

  const [selectedOrdersMenu, setSelectedOrdersMenu] = useState(null);

  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedOrdersMenu(event) {
    setSelectedOrdersMenu(event.currentTarget);
  }

  function closeSelectedOrdersMenu() {
    setSelectedOrdersMenu(null);
  }

  function handleRemove() {
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Confirm Delete Assignment/s</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-text">
                Do you confirm deleting assignment/s?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={(ev) => {
                  ws.sendMessage('assignment/remove', selectedOrderIds);
                  dispatch(closeDialog());
                }}
                color="warning"
              >
                Yes
              </Button>
              <Button onClick={() => dispatch(closeDialog())} color="primary">
                No
              </Button>
            </DialogActions>
          </>
        ),
      })
    );
  }

  // const {onSelectAllClick, order, orderBy, numSelected, rowCount} = props;

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        <TableCell padding="none" className="w-40 md:w-64 text-center z-99">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < props.rowCount}
            checked={props.rowCount !== 0 && numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
          />
          {numSelected > 0 && (
            <Box
              className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
              sx={{
                background: (theme) => theme.palette.background.paper,
              }}
            >
              <IconButton
                aria-owns={selectedOrdersMenu ? 'selectedOrdersMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedOrdersMenu}
                size="large"
              >
                <Icon>more_horiz</Icon>
              </IconButton>
              <Menu
                id="selectedOrdersMenu"
                anchorEl={selectedOrdersMenu}
                open={Boolean(selectedOrdersMenu)}
                onClose={closeSelectedOrdersMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      handleRemove();
                      closeSelectedOrdersMenu();
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <Icon>trash</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </TableCell>
        {rows.map((row) => {
          return (
            <TableCell
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default OrdersTableHead;
