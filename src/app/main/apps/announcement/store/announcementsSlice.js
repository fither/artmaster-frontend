import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const announcementsAdapter = createEntityAdapter({});

export const { selectAll: selectAnnouncements, selectById: selectAnnouncementById } =
  announcementsAdapter.getSelectors((state) => state.announcementApp.announcements);

const announcementsSlice = createSlice({
  name: 'announcementApp/announcements',
  initialState: announcementsAdapter.getInitialState({
    images: [],
    imagesDialogOpen: false,
    announcementDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setAnnouncements: (state, data) => {
      announcementsAdapter.setAll(state, data.payload);
    },
    addAnnouncement: (state, data) => {
      announcementsAdapter.addOne(state, data.payload);
    },
    updateAnnouncement: (state, data) => {
      announcementsAdapter.upsertOne(state, data.payload);
    },
    removeAnnouncement: (state, data) => {
      announcementsAdapter.removeOne(state, data.payload);
    },
    openNewAnnouncementDialog: (state, action) => {
      state.announcementDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewAnnouncementDialog: (state, action) => {
      state.announcementDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditAnnouncementDialog: (state, action) => {
      state.announcementDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditAnnouncementDialog: (state, action) => {
      state.announcementDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
    setAnnouncementImages: (state, action) => {
      state.images = action.payload;
    },
    addAnnouncementImage: (state, action) => {
      state.images = [...state.images, action.payload];
    },
    removeAnnouncementImage: (state, action) => {
      state.images = state.images.filter((i) => `${i.id}` !== `${action.payload}`);
    },
    setImagesDialogOpen: (state, action) => {
      state.imagesDialogOpen = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  removeAnnouncement,
  openNewAnnouncementDialog,
  closeNewAnnouncementDialog,
  openEditAnnouncementDialog,
  closeEditAnnouncementDialog,
  setAnnouncementImages,
  addAnnouncementImage,
  removeAnnouncementImage,
  setImagesDialogOpen,
} = announcementsSlice.actions;

export default announcementsSlice.reducer;
