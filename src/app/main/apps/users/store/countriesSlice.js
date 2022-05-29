import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const countriesAdapter = createEntityAdapter({
  selectId: (country) => country.id,
});

export const { selectAll: selectCountries } = countriesAdapter.getSelectors(
  (state) => state.usersApp.countries
);

const countriesSlice = createSlice({
  name: 'usersApp/countries',
  initialState: countriesAdapter.getInitialState({
    states: [],
  }),
  reducers: {
    setCountries: (state, data) => {
      countriesAdapter.setAll(state, data.payload);
    },
    setStates: (state, data) => {
      state.states = data.payload;
    },
  },
  extraReducers: {},
});

export const { setCountries, setStates } = countriesSlice.actions;

export default countriesSlice.reducer;
