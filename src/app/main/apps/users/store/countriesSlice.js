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
    availableCountries: {},
    states: [],
  }),
  reducers: {
    setCountries: (state, data) => {
      countriesAdapter.setAll(state, data.payload);
    },
    setStates: (state, data) => {
      state.states = data.payload;
    },
    setAvailableCountries: (state, data) => {
      state.availableCountries = data.payload;
    },
  },
  extraReducers: {},
});

export const { setCountries, setStates, setAvailableCountries } = countriesSlice.actions;

export default countriesSlice.reducer;
