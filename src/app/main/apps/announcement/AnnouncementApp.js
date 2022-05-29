import _ from '@lodash';
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Icon from '@mui/material/Icon';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { forwardRef, useContext, useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'app/ws/WebSocket';
import { Button, IconButton, Paper, Slide } from '@mui/material';
import { convertToHTML } from 'draft-convert';
import { convertFromRaw } from 'draft-js';
import format from 'date-fns/format';
import Carousel from 'react-material-ui-carousel';
import DOMPurify from 'dompurify';
import reducer from './store';
import { getCategories, selectCategories } from './store/categoriesSlice';
import {
  openEditAnnouncementDialog,
  openNewAnnouncementDialog,
  selectAnnouncements,
  setImagesDialogOpen,
} from './store/announcementsSlice';
import AnnouncementDialog from './AnnouncementDialog';
import AnnouncementImageDialog from './AnnouncementImageDialog';

const Root = styled('div')(({ theme }) => ({
  '& .header': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    '& .header-icon': {
      position: 'absolute',
      top: -64,
      left: 0,
      opacity: 0.04,
      fontSize: 512,
      width: 512,
      height: 512,
      pointerEvents: 'none',
    },
  },
  '& .carousel-wrapper > div': {
    minHeight: '500px',
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AnnouncementApp(props) {
  const dispatch = useDispatch();
  const announcements = useSelector(selectAnnouncements);
  const announcementImages = useSelector(
    ({ announcementApp }) => announcementApp.announcements.images
  );
  const categories = useSelector(selectCategories);
  const user = useSelector(({ auth }) => auth.user);

  const ws = useContext(WebSocketContext);

  const theme = useTheme();
  const [hasPermission, setHasPermission] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    dispatch(getCategories());
    ws.sendMessage('announcement/findAll');
    ws.sendMessage('announcement/findAllImages');
  }, [dispatch, ws]);

  useEffect(() => {
    if (['super-admin'].includes(user.role.name)) {
      setHasPermission(true);
    }
  }, [user.role.name]);

  useEffect(() => {
    function getFilteredArray() {
      if (searchText.length === 0 && selectedCategory === 'all') {
        return announcements;
      }

      return _.filter(announcements, (item) => {
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }
        return item.title.toLowerCase().includes(searchText.toLowerCase());
      });
    }

    if (announcements) {
      setFilteredData(getFilteredArray());
    }
  }, [announcements, searchText, selectedCategory]);

  function handleSelectedCategory(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  return (
    <Root className="flex flex-col flex-auto shrink-0 w-full">
      <div className="header relative overflow-hidden flex shrink-0 items-center justify-center h-200 sm:h-200">
        <div className="flex flex-col max-w-2xl mx-auto w-full p-24 sm:p-32">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0 } }}>
            <Typography
              color="inherit"
              className="text-24 sm:text-44 font-bold tracking-tight text-center"
            >
              Announcements
            </Typography>
          </motion.div>
        </div>

        <Icon className="header-icon">announcement</Icon>
      </div>
      <div className="flex flex-col flex-1 w-full mx-auto px-8 sm:px-16 py-24">
        <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between py-24">
          {hasPermission && (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={(ev) => dispatch(openNewAnnouncementDialog())}
                title="Add Announcement"
              >
                New Announcement
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={(ev) => dispatch(setImagesDialogOpen(true))}
                title="Add Image"
              >
                Announcement Images
              </Button>
            </>
          )}
          <TextField
            label="Search for an announcement"
            placeholder="Enter a keyword..."
            className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
            value={searchText}
            inputProps={{
              'aria-label': 'Search',
            }}
            onChange={handleSearchText}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              label="Category"
              value={selectedCategory}
              onChange={handleSelectedCategory}
            >
              <MenuItem value="all">
                <em> All </em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem value={category.value} key={category.id}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex flex-row flex-wrap">
          {useMemo(() => {
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            };

            const item = {
              hidden: {
                opacity: 0,
                y: 20,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            };

            function getHTMLFromRaw(raw) {
              const returnValue = raw ? convertToHTML(convertFromRaw(JSON.parse(raw))) : null;
              return returnValue ? DOMPurify.sanitize(returnValue) : '';
            }

            return (
              filteredData &&
              (filteredData.length > 0 ? (
                <motion.div
                  className="flex flex-wrap py-8"
                  style={{ width: '55%' }}
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {_.orderBy(
                    filteredData,
                    [
                      (o) => {
                        return o.createdAt;
                      },
                    ],
                    ['desc']
                  ).map((announcement) => {
                    const category = categories.find(
                      (_cat) => _cat.value === announcement.category
                    );
                    return (
                      <motion.div
                        variants={item}
                        className="w-full pb-24 sm:p-16"
                        key={announcement.id}
                      >
                        <Card className="flex flex-col h-256 shadow">
                          <div
                            className="flex shrink-0 items-center justify-between px-24 h-64"
                            style={{
                              background: category.color,
                              color: theme.palette.getContrastText(category.color),
                            }}
                          >
                            <Typography className="font-medium truncate" color="inherit">
                              {category.label} - {announcement.title}
                            </Typography>
                            <div className="flex items-center justify-center opacity-75">
                              <div className="text-14 font-medium whitespace-nowrap">
                                {format(
                                  new Date(announcement.createdAt),
                                  'eee dd.MM.yyyy, HH:mm:ss'
                                )}
                                {hasPermission && (
                                  <IconButton
                                    onClick={(ev) =>
                                      dispatch(openEditAnnouncementDialog(announcement))
                                    }
                                  >
                                    <Icon>edit</Icon>
                                  </IconButton>
                                )}
                              </div>
                            </div>
                          </div>
                          <CardContent className="flex flex-col flex-auto items-center justify-center">
                            <Typography
                              variant="body1"
                              className="w-full"
                              dangerouslySetInnerHTML={{
                                __html: getHTMLFromRaw(announcement.content),
                              }}
                            />
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <Typography color="textSecondary" className="text-24 my-24">
                    No announcement found!
                  </Typography>
                </div>
              ))
            );
          }, [filteredData, categories, theme.palette, hasPermission, dispatch])}

          <div className="py-24 carousel-wrapper" style={{ width: '40%' }}>
            {useMemo(() => {
              return (
                (announcementImages.length > 0 && (
                  <Carousel>
                    {announcementImages.map((ai) => (
                      <Item key={ai.id} {...ai} />
                    ))}
                  </Carousel>
                )) ||
                (announcementImages.length <= 0 && <Typography />)
              );

              function Item(Itemprops) {
                return (
                  <Paper className="flex justify-center">
                    <img src={Itemprops.image} alt={Itemprops.fileName} />
                  </Paper>
                );
              }
            }, [announcementImages])}
          </div>

          <AnnouncementDialog />
        </div>
      </div>
      <AnnouncementImageDialog />
    </Root>
  );
}

export default withReducer('announcementApp', reducer)(AnnouncementApp);
