import Avatar from '@mui/material/Avatar';
import { lighten } from '@mui/material/styles';
import Hidden from '@mui/material/Hidden';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import { Box } from '@mui/system';
import { getSummaries, selectSummaries } from './store/summariesSlice';
import { selectWidgets } from './store/widgetsSlice';

function SummaryDashboardAppHeader(props) {
  const { pageLayout } = props;

  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);
  const summaries = useSelector(selectSummaries);
  const user = useSelector(({ auth }) => auth.user);

  const [selectedSummary, setSelectedSummary] = useState({
    id: 1,
    menuEl: null,
  });

  useEffect(() => {
    dispatch(getSummaries());
  }, [dispatch]);

  function handleChangeSummary(id) {
    setSelectedSummary({
      id,
      menuEl: null,
    });
  }

  function handleOpenSummaryMenu(event) {
    setSelectedSummary({
      id: selectedSummary.id,
      menuEl: event.currentTarget,
    });
  }

  function handleCloseSummaryMenu() {
    setSelectedSummary({
      id: selectedSummary.id,
      menuEl: null,
    });
  }

  if (_.isEmpty(summaries)) {
    return null;
  }

  return (
    <div className="flex flex-col justify-between flex-1 min-w-0 px-24 pt-24">
      <div className="flex justify-between items-center">
        <div className="flex items-center min-w-0">
          {user.data.photoURL ? (
            <Avatar
              className="w-52 h-52 sm:w-64 sm:h-64"
              alt="user photo"
              src={user.data.photoURL}
            />
          ) : (
            <Avatar className="w-52 h-52 sm:w-64 sm:h-64">{user.data.displayName[0]}</Avatar>
          )}
          <div className="mx-12 min-w-0">
            <Typography className="text-18 sm:text-24 md:text-32 font-bold leading-none mb-8 tracking-tight">
              Welcome back, {user.data.displayName}!
            </Typography>

            <div className="flex items-center opacity-60 truncate">
              <Icon className="text-14 sm:text-24">notifications</Icon>
              <Typography className="text-12 sm:text-14 font-medium mx-4 truncate">
                You have 2 new messages and 15 new tasks
              </Typography>
            </div>
          </div>
        </div>
        <Hidden lgUp>
          <IconButton
            onClick={(ev) => pageLayout.current.toggleRightSidebar()}
            aria-label="open left sidebar"
            color="inherit"
            size="large"
          >
            <Icon>menu</Icon>
          </IconButton>
        </Hidden>
      </div>
      {/* <div className="flex items-end">
        <div className="flex items-center">
          <Box
            className={clsx('flex items-center h-40 px-16 text-13 sm:text-16')}
            sx={{
              background: (theme) => lighten(theme.palette.primary.dark, 0.1),
              color: (theme) => theme.palette.primary.contrastText,
              borderRadius: '16px 0 0 0',
            }}
          >
            {_.find(summaries, ['id', selectedSummary.id]).name}
          </Box>
          <IconButton
            className="h-40 w-40 p-0"
            sx={{
              background: (theme) => lighten(theme.palette.primary.dark, 0.1),
              color: (theme) => theme.palette.primary.contrastText,
              borderRadius: '0 16px 0 0',
              marginLeft: '1px',
            }}
            aria-owns={selectedSummary.menuEl ? 'project-menu' : undefined}
            aria-haspopup="true"
            onClick={handleOpenSummaryMenu}
            size="large"
          >
            <Icon>more_horiz</Icon>
          </IconButton>
          <Menu
            id="project-menu"
            anchorEl={selectedSummary.menuEl}
            open={Boolean(selectedSummary.menuEl)}
            onClose={handleCloseSummaryMenu}
          >
            {summaries &&
              summaries.map((project) => (
                <MenuItem
                  key={project.id}
                  onClick={(ev) => {
                    handleChangeSummary(project.id);
                  }}
                >
                  {project.name}
                </MenuItem>
              ))}
          </Menu>
        </div>
      </div> */}
    </div>
  );
}

export default SummaryDashboardAppHeader;
