import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { WebSocketContext } from 'app/ws/WebSocket';
import AssignmentsTableHead from './AssignedListTableHead';
import AssignmentDialog from './AssignedListDialog';
import {
  openEditAssignmentDialog,
  selectAssignments,
  setAssignmentsLoading,
} from '../store/assignmentsSlice';

function AssignmentsTable(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.assignments.searchText);
  const ws = useContext(WebSocketContext);
  const loading = useSelector(({ eCommerceApp }) => eCommerceApp.assignments.loading);
  const assignments = useSelector(selectAssignments);
  const selectedCountry = useSelector(
    ({ eCommerceApp }) => eCommerceApp.assignments.selectedCountry
  );

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(assignments);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [assignment, setAssignment] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    dispatch(setAssignmentsLoading(true));
    ws.sendMessage('assignment/findAll', selectedCountry);
  }, [dispatch, selectedCountry, ws]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(FuseUtils.filterArrayByString(assignments, searchText));
      setPage(0);
    } else {
      setData(assignments);
    }
  }, [assignments, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (assignment.id === property && assignment.direction === 'desc') {
      direction = 'asc';
    }

    setAssignment({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    dispatch(openEditAssignmentDialog(item));
    // const urlRegex = /https:\/\/[\w]+.[\w]+[.]+[\w]+\//;
    // const url = item._links.self[0].href;
    // const matches = url.match(urlRegex)[0];
    // const splittedMatches = matches.split('.');
    // const realMatch = splittedMatches[splittedMatches.length - 1];
    // let countryCode = realMatch.substring(0, realMatch.length - 1).toUpperCase();
    // countryCode = countryCode === 'COM' ? 'US' : countryCode;
    // props.navigate(`/apps/e-commerce/assignments/${item.id}/${countryCode}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  function handleDone(event, id) {
    dispatch(setAssignmentsLoading(true));
    ws.sendMessage('assignment/toggleDone', id);
  }

  function handleFlagged(event, id) {
    dispatch(setAssignmentsLoading(true));
    ws.sendMessage('assignment/toggleFlag', id);
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
          There are no assignments!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <AssignmentsTableHead
            selectedOrderIds={selected}
            order={assignment}
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
                  switch (assignment.id) {
                    case 'id': {
                      return parseInt(o.id, 10);
                    }
                    case 'customer-name': {
                      return o.customerName;
                    }
                    case 'product-name': {
                      return o.productName;
                    }
                    case 'class-name': {
                      return o.location.className;
                    }
                    default: {
                      return o[assignment.id];
                    }
                  }
                },
              ],
              [assignment.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={(event) => handleClick(n)}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.id}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      <Checkbox
                        checked={n.done}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleDone(event, n.id)}
                      />
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      <span
                        style={{
                          textDecoration: n.done ? 'line-through' : 'initial',
                        }}
                      >
                        {n.productName}
                      </span>
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      <span
                        style={{
                          textDecoration: n.done ? 'line-through' : 'initial',
                        }}
                      >
                        {n.bookingDate && n.bookingDate !== '-'
                          ? new Date(n.bookingDate).toLocaleString()
                          : '-'}
                      </span>
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      <span
                        style={{
                          textDecoration: n.done ? 'line-through' : 'initial',
                        }}
                      >
                        {n.customerName}
                      </span>
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      <span
                        style={{
                          textDecoration: n.done ? 'line-through' : 'initial',
                        }}
                      >
                        {n.location.className}
                      </span>
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      <Checkbox
                        checked={n.flagged}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleFlagged(event, n.id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 bassignment-t-1"
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
      <AssignmentDialog />
    </div>
  );
}

export default withRouter(AssignmentsTable);
