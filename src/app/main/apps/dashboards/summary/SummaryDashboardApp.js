import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { FormControl, MenuItem, Select } from '@mui/material';
import { WebSocketContext } from 'app/ws/WebSocket';
import SummaryDashboardAppHeader from './SummaryDashboardAppHeader';
import SummaryDashboardAppSidebar from './SummaryDashboardAppSidebar';
import reducer from './store';
import { getWeather, getWidgets, selectWidgets, setWidgetsLoading } from './store/widgetsSlice';
import BudgetSummaryTab from './tabs/BudgetSummaryTab';
import HomeTab from './tabs/HomeTab';
import { selectCountries } from '../../users/store/countriesSlice';
import { setSelectedCountryCode } from './store/summariesSlice';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    minHeight: 160,
    height: 160,
    [theme.breakpoints.up('lg')]: {
      marginRight: 12,
      borderBottomRightRadius: 20,
    },
  },
  '& .FusePageSimple-toolbar': {
    minHeight: 56,
    height: 56,
    alignItems: 'flex-end',
  },
  '& .FusePageSimple-rightSidebar': {
    width: 288,
    border: 0,
    padding: '12px 0',
  },
  '& .FusePageSimple-content': {
    maxHeight: '100%',
    '& canvas': {
      maxHeight: '100%',
    },
  },
}));

function SummaryDashboardApp(props) {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const availableCountries = useSelector(({ usersApp }) => usersApp.countries.availableCountries);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const selectedCountryCode = useSelector(
    ({ summaryDashboardApp }) => summaryDashboardApp.summaries.selectedCountryCode
  );
  const widgets = useSelector(selectWidgets);
  const widgetsLoading = useSelector(
    ({ summaryDashboardApp }) => summaryDashboardApp.widgets.loading
  );
  const ws = useContext(WebSocketContext);

  const pageLayout = useRef(null);
  const [tabValue, setTabValue] = useState(0);

  function handleCountryChange(ev) {
    if (!widgetsLoading) {
      dispatch(setSelectedCountryCode(ev.target.value));
      dispatch(setWidgetsLoading(true));
      ws.sendMessage('analytics/findAll', ev.target.value);
    }
  }

  useEffect(() => {
    dispatch(getWidgets());
    dispatch(getWeather());
    if (!widgetsLoading) {
      dispatch(setWidgetsLoading(true));
      ws.sendMessage('analytics/findAll', selectedCountryCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, ws]);

  useEffect(() => {
    if (Object.keys(availableCountries).length) {
      setFilteredCountries(countries.filter((c) => availableCountries[c.code] === ''));
    } else {
      setFilteredCountries(countries);
    }
  }, [countries, availableCountries]);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  if (_.isEmpty(widgets)) {
    return null;
  }

  return (
    <Root
      header={<SummaryDashboardAppHeader pageLayout={pageLayout} />}
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons={false}
          className="w-full px-24 -mx-4 min-h-40"
          classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
          TabIndicatorProps={{
            children: (
              <Box
                sx={{ bgcolor: 'text.disabled' }}
                className="w-full h-full rounded-full opacity-20"
              />
            ),
          }}
        >
          <Tab
            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
            disableRipple
            label="Home"
          />
          {/* <Tab
            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
            disableRipple
            label="Budget Summary"
          /> */}
        </Tabs>
      }
      content={
        <div className="flex justify-center w-full" style={{ flexDirection: 'column' }}>
          <div className="flex justify-between w-full">
            <div className="flex" />
            <div className="flex items-center">
              <FormControl className="" variant="filled">
                <Select
                  value={selectedCountryCode}
                  onChange={handleCountryChange}
                  displayEmpty
                  name="filter"
                  classes={{ select: 'py-8' }}
                >
                  <MenuItem value="">
                    <em>Select Country</em>
                  </MenuItem>
                  {filteredCountries.map((country) => {
                    return (
                      <MenuItem key={country.id} value={country.code}>
                        {country.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="p-12 lg:ltr:pr-0 lg:rtl:pl-0">
            {tabValue === 0 && <HomeTab />}
            {tabValue === 1 && <BudgetSummaryTab />}
          </div>
        </div>
      }
      rightSidebarContent={<SummaryDashboardAppSidebar />}
      ref={pageLayout}
    />
  );
}

export default withReducer('summaryDashboardApp', reducer)(SummaryDashboardApp);
