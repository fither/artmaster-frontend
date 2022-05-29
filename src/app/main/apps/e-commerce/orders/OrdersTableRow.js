import {
  Checkbox,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

function OrdersTableRow(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        className="h-72 cursor-pointer"
        hover
        role="checkbox"
        aria-checked={props.isSelected}
        tabIndex={-1}
        key={props.order.id}
        selected={props.isSelected}
        onClick={(event) => setOpen(!open)}
      >
        <TableCell className="w-40 md:w-64 text-center" padding="none">
          <Checkbox
            checked={props.isSelected}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => props.handleCheck(event, props.order)}
          />
        </TableCell>

        <TableCell className="p-4 md:p-16" component="th" scope="row">
          {props.order.id}
        </TableCell>

        <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
          {props.order.customerName}
        </TableCell>

        <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
          {props.order.productName}
        </TableCell>

        <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
          {props.order.location}
        </TableCell>

        <TableCell className="p-4 md:p-16" component="th" scope="row">
          {props.appointments.find((appo) => appo.orderId === `${props.order.id}`) ? (
            <div className="inline text-12 font-semibold py-4 px-12 rounded-full truncate bg-green-800 text-white">
              Assigned
            </div>
          ) : (
            <div className="inline text-12 font-semibold py-4 px-12 rounded-full truncate bg-red text-white">
              Not Assigned
            </div>
          )}
        </TableCell>

        <TableCell className="p-4 md:p-16" component="th" scope="row">
          {props.order.bookingDate && props.order.bookingDate !== '-'
            ? new Date(props.order.bookingDate).toLocaleString()
            : '-'}
        </TableCell>

        <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
          {props.order.totalPrice}
        </TableCell>
      </TableRow>
      <TableRow className="align-baseline">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table stickyHeader className="grow overflow-x-auto">
                <TableBody>
                  <TableRow className="h-72">
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      Email
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {props.order.customerEmail}
                    </TableCell>
                  </TableRow>
                  <TableRow className="h-72">
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      Phone
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {props.order.customerPhone}
                    </TableCell>
                  </TableRow>
                  <TableRow className="h-72">
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      Assigned Location
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {(props.appointments.find((appo) => appo.orderId === `${props.order.id}`) &&
                        props.appointments.find((appo) => appo.orderId === `${props.order.id}`)
                          .location.className) ||
                        '-'}
                    </TableCell>
                  </TableRow>
                  <TableRow className="h-72">
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      Payment Method
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {props.order.payment}
                    </TableCell>
                  </TableRow>
                  <TableRow className="h-72">
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      Tip
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {props.order.tip}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table stickyHeader className="grow overflow-x-auto">
                <TableHead>
                  <TableRow className="h-48 sm:h-64">
                    <TableCell className="w-40 md:w-64 z-99">Product</TableCell>
                    <TableCell className="w-40 md:w-64 z-99">Quantity</TableCell>
                    <TableCell className="w-40 md:w-64 z-99">Unit Price</TableCell>
                    <TableCell className="w-40 md:w-64 z-99">Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.order.products.map((p) => (
                    <TableRow key={p.name} className="h-72">
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {p.name}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {p.quantity}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {p.price}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {(0 + p.quantity) * (0 + p.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="h-72">
                    <TableCell className="p-4 md:p-16" component="th" scope="row" />
                    <TableCell className="p-4 md:p-16" component="th" scope="row" />
                    <TableCell className="p-4 md:p-16" component="th" scope="row" />
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {props.order.totalPrice}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default OrdersTableRow;
