import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { amber, blue, blueGrey, green } from '@mui/material/colors';

const categories = [
  {
    id: 0,
    value: 'web',
    label: 'Web',
    color: blue[500],
  },
  {
    id: 1,
    value: 'firebase',
    label: 'Firebase',
    color: amber[500],
  },
  {
    id: 2,
    value: 'cloud',
    label: 'Cloud',
    color: blueGrey[500],
  },
  {
    id: 3,
    value: 'android',
    label: 'Android',
    color: green[500],
  },
];

export const getCategories = () => (dispatch, getState) => {
  dispatch(setCategories(categories));
};

const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoryById } =
  categoriesAdapter.getSelectors((state) => state.announcementApp.categories);

const categorySlice = createSlice({
  name: 'announcementApp/categories',
  initialState: categoriesAdapter.getInitialState({}),
  reducers: {
    setCategories: (state, data) => {
      categoriesAdapter.setAll(state, data.payload);
    },
  },
  extraReducers: {},
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
