import { Collapse, Icon, TableCell, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

function ProductsTableRow(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        className="h-72 cursor-pointer"
        hover
        role="checkbox"
        aria-checked={props.isSelected}
        tabIndex={-1}
        key={props.product.id}
        selected={props.isSelected}
        onClick={(event) => setOpen(!open)}
      >
        <TableCell className="w-52 px-4 md:px-0" component="th" scope="row" padding="none">
          {props.product.image ? (
            <img
              className="w-full block rounded px-4"
              src={props.product.image}
              alt={props.product.name}
            />
          ) : (
            <img
              className="w-full block rounded px-4"
              src="assets/images/ecommerce/product-image-placeholder.png"
              alt={props.product.name}
            />
          )}
        </TableCell>

        <TableCell className="p-4 md:p-16" component="th" scope="row">
          {props.product.name}
        </TableCell>

        <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
          {props.product.categories}
        </TableCell>

        <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
          <span>$</span>
          {props.product.price}
        </TableCell>

        <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
          {props.product.active ? (
            <Icon className="text-green text-20">check_circle</Icon>
          ) : (
            <Icon className="text-red text-20">remove_circle</Icon>
          )}
        </TableCell>
      </TableRow>
      <TableRow className="align-baseline">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div dangerouslySetInnerHTML={{ __html: props.product.description }} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default ProductsTableRow;
