import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import TableHead from '@mui/material/TableHead';
import { Typography } from '@mui/material';
import { openNewOrderDialog } from '../store/ordersSlice';

const rows = [
  {
    id: 'customer',
    align: 'left',
    disablePadding: false,
    label: 'Customer Name',
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
    id: 'location',
    align: 'left',
    disablePadding: false,
    label: 'Location',
    sort: true,
  },
  {
    id: 'assigned',
    align: 'left',
    disablePadding: false,
    label: 'Assigned Status',
    sort: false,
  },
  {
    id: 'date',
    align: 'left',
    disablePadding: false,
    label: 'Booking Date',
    sort: true,
  },
  {
    id: 'total',
    align: 'right',
    disablePadding: false,
    label: 'Total Price',
    sort: true,
  },
];

function OrdersTableHead(props) {
  const { selectedOrderIds } = props;
  const numSelected = selectedOrderIds.length;

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
                      dispatch(openNewOrderDialog(selectedOrderIds));
                      props.onMenuItemClick();
                      closeSelectedOrdersMenu();
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <Icon>flag</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Assign" />
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
              {!row.sort && (
                <Typography variant="span" className="font-semibold">
                  {row.label}
                </Typography>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default OrdersTableHead;
