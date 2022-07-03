import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountries } from '../../users/store/countriesSlice';
import { setSelectedCountry } from '../store/ordersSlice';

function OrdersToolbar(props) {
  const dispatch = useDispatch();
  const selectedCountry = useSelector(({ eCommerceApp }) => eCommerceApp.orders.selectedCountry);
  const countries = useSelector(selectCountries);

  function handleCountryChange(ev) {
    dispatch(setSelectedCountry(ev.target.value));
  }

  return (
    <div className="flex justify-between w-full px-24">
      <div className="flex" />
      <div className="flex items-center">
        <FormControl className="" variant="filled">
          <TextField
            value={selectedCountry}
            onChange={handleCountryChange}
            name="filter"
            select
            classes={{ select: 'py-8' }}
          >
            <MenuItem value="">
              <em>Select Country</em>
            </MenuItem>
            {countries.map((country) => {
              return (
                <MenuItem key={country.id} value={country.code}>
                  {country.name}
                </MenuItem>
              );
            })}
          </TextField>
        </FormControl>
      </div>
    </div>
  );
}

export default OrdersToolbar;
