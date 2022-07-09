import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { WebSocketContext } from 'app/ws/WebSocket';
import { selectOrders, setOrdersLoading } from '../store/ordersSlice';
import OrdersTableHead from './OrdersTableHead';
import OrderDialog from './OrderDialog';
import { selectAssignments } from '../store/assignmentsSlice';
import OrdersTableRow from './OrdersTableRow';

function OrdersTable(props) {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.orders.searchText);
  const ws = useContext(WebSocketContext);
  const loading = useSelector(({ eCommerceApp }) => eCommerceApp.orders.loading);
  const appointments = useSelector(selectAssignments);
  const selectedCountry = useSelector(({ eCommerceApp }) => eCommerceApp.orders.selectedCountry);

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(orders);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    if (!loading) {
      dispatch(setOrdersLoading(true));
      ws.sendMessage('order/findAll', selectedCountry !== '0' ? selectedCountry : '');
    }
    ws.sendMessage('assignment/findAll');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedCountry, ws]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(FuseUtils.filterArrayByString(orders, searchText));
      setPage(0);
    } else {
      setData(orders);
    }
  }, [orders, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => generateOrderObj(n)));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function generateOrderObj(orderValue) {
    const { id, productName, customerName } = orderValue;
    return { id, productName, customerName };
  }

  function handleCheck(event, n) {
    let selectedIndex = -1;
    const selectedLength = selected.length;
    for (let i = 0; i < selectedLength; i += 1) {
      if (selected[i].id === n.id) {
        selectedIndex = i;
        break;
      }
    }
    const orderObj = generateOrderObj(n);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, orderObj);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return <FuseLoading />;
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There are no orders!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <OrdersTableHead
            selectedOrderIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case 'id': {
                      return parseInt(o.id, 10);
                    }
                    case 'customer': {
                      return o.customerName;
                    }
                    case 'product-name': {
                      return o.productName;
                    }
                    case 'payment': {
                      return o.payment;
                    }
                    case 'location': {
                      return o.location;
                    }
                    case 'date': {
                      return o.bookingDate;
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = !!selected.find((s) => s.id === n.id);
                return (
                  <OrdersTableRow
                    key={n.id}
                    order={n}
                    appointments={appointments}
                    isSelected={isSelected}
                    handleCheck={handleCheck}
                  />
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <OrderDialog />
    </div>
  );
}

export default withRouter(OrdersTable);
