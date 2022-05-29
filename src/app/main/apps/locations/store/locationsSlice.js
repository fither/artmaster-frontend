import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const locationsAdapter = createEntityAdapter({});

export const { selectAll: selectLocations } = locationsAdapter.getSelectors(
  (state) => state.locationsApp.locations
);

const locationsSlice = createSlice({
  name: 'locationsApp/locations',
  initialState: locationsAdapter.getInitialState({
    searchText: '',
    locationDialog: {
      type: 'new',
      props: { open: false },
      data: null,
    },
  }),
  reducers: {
    setLocationsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setLocations: (state, data) => locationsAdapter.setAll(state, data.payload),
    addLocation: (state, data) => locationsAdapter.addOne(state, data.payload),
    updateLocation: (state, data) => locationsAdapter.upsertOne(state, data.payload),
    removeLocation: (state, data) => locationsAdapter.removeOne(state, data.payload),
    openNewLocationDialog: (state, action) => {
      state.locationDialog = {
        type: 'new',
        props: { open: true },
        data: null,
      };
    },
    closeNewLocationDialog: (state, action) => {
      state.locationDialog = {
        type: 'new',
        props: { open: false },
        data: null,
      };
    },
    openEditLocationDialog: (state, action) => {
      state.locationDialog = {
        type: 'edit',
        props: { open: true },
        data: action.payload,
      };
    },
    closeEditLocationDialog: (state, action) => {
      state.locationDialog = {
        type: 'edit',
        props: { open: false },
        data: null,
      };
    },
  },
});

export const {
  setLocations,
  addLocation,
  updateLocation,
  removeLocation,
  setLocationsSearchText,
  openNewLocationDialog,
  closeNewLocationDialog,
  openEditLocationDialog,
  closeEditLocationDialog,
} = locationsSlice.actions;

export default locationsSlice.reducer;
