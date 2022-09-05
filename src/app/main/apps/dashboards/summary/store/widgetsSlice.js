/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseWidgets from './baseWidgets';

export const getWidgets = createAsyncThunk('summaryDashboardApp/widgets/getWidgets', () => {
  return [
    ...baseWidgets,
    {
      id: 'weatherWidget',
      locations: {
        currLoc: {
          name: '',
          icon: '',
          text: '',
          temp: {
            C: '',
            F: '',
          },
          windSpeed: {
            KMH: '',
            MPH: '',
          },
          windDirection: '',
          humidity: '',
          next5Days: [],
        },
      },
      currentLocation: 'currLoc',
      tempUnit: 'C',
      speedUnit: 'KMH',
    },
  ];
});

export const getWeather = createAsyncThunk('summaryDashboardApp/widgets/getWeather', async () => {
  let weatherWidget = null;

  try {
    weatherWidget = await getWeatherMethodGeolocation();
  } catch (err) {
    console.log(err);
  }

  if (!weatherWidget) {
    try {
      weatherWidget = await getWeatherMethodIP();
    } catch (err) {
      console.log(err);
    }
  }

  return weatherWidget;
});

export const getWeatherMethodIP = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        'https://api.weatherapi.com/v1/forecast.json?key=6c6de76749984e3392e174750220305&days=5&aqi=no&alerts=no&q=auto:ip'
      )
      .then((weather) => {
        resolve(generateWeatherWidget(weather.data));
      })
      .catch((err) => {
        reject();
      });
  });
};

export const getWeatherMethodGeolocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      const errorReason = 'Geolocation not supported';
      reject(errorReason);
    } else {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          axios
            .get(
              `https://api.weatherapi.com/v1/forecast.json?key=6c6de76749984e3392e174750220305&days=5&aqi=no&alerts=no&q=${latitude},${longitude}`
            )
            .then((weather) => {
              resolve(generateWeatherWidget(weather.data));
            })
            .catch((err) => {
              reject(err);
            });
        },
        (err) => {
          reject(err.message);
        }
      );
    }
  });
};

export const generateWeatherWidget = (weather) => {
  return {
    id: 'weatherWidget',
    locations: {
      currLoc: {
        name: weather.location.region || weather.location.tz_id,
        icon: weather.current.condition.icon.replace(/64x64/, '128x128'),
        text: weather.current.condition.text,
        temp: {
          C: weather.current.temp_c,
          F: weather.current.temp_f,
        },
        windSpeed: {
          KMH: weather.current.wind_kph,
          MPH: weather.current.wind_mph,
        },
        windDirection: weather.current.wind_dir,
        humidity: weather.current.humidity,
        next5Days: [
          ...weather.forecast.forecastday.map((fd) => {
            return {
              name: fd.date,
              icon: `https:${fd.day.condition.icon}`,
              text: fd.day.condition.text,
              temp: {
                C: fd.day.maxtemp_c,
                F: fd.day.maxtemp_f,
              },
            };
          }),
        ],
      },
    },
    currentLocation: 'currLoc',
    tempUnit: 'C',
    speedUnit: 'KMH',
  };
};

const widgetsAdapter = createEntityAdapter({});

export const getWidgetObjects = (analyticsData) => {
  const mostSelledProductsByDate = {
    id: 'mostSelledWidget',
    ranges: [],
    currentRange: '',
    data: {
      name: 'Total Selling',
      count: {},
      extra: {
        name: 'Product',
        count: {},
      },
    },
  };

  for (const [createDate, productInfo] of Object.entries(analyticsData.productsByCreateDate)) {
    mostSelledProductsByDate.ranges[createDate] = createDate;
    mostSelledProductsByDate.data.count[createDate] = productInfo.quantity;
    mostSelledProductsByDate.data.extra.count[createDate] = productInfo.productName;
    if (!mostSelledProductsByDate.currentRange) {
      mostSelledProductsByDate.currentRange = createDate;
    }
  }

  const mostBookingDateWidget = {
    id: 'mostBookingDate',
    title: 'Most Booking Date',
    data: {
      name: 'Booking Count',
      count: 0,
      extra: {
        name: 'Date',
        count: '',
      },
    },
  };

  for (const [date, times] of Object.entries(analyticsData.mostOrderedDate)) {
    let totalQuantity = 0;
    for (const [time, products] of Object.entries(times)) {
      products.forEach((product) => {
        totalQuantity += product.quantity;
      });
    }
    mostBookingDateWidget.data.count = totalQuantity;
    mostBookingDateWidget.data.extra.count = date;
  }

  const mostBookingTimeWidget = {
    id: 'mostBookingTime',
    title: 'Most Booking Session',
    data: {
      name: 'Booking Count',
      count: 0,
      extra: {
        name: 'Time',
        count: '',
      },
    },
  };

  for (const [time, products] of Object.entries(analyticsData.mostOrderedTime)) {
    let totalQuantity = 0;
    products.forEach((product) => {
      totalQuantity += product.quantity;
    });
    mostBookingTimeWidget.data.count = totalQuantity;
    mostBookingTimeWidget.data.extra.count = `${time} of days`;
  }

  const todaysBookingsWidget = {
    id: 'todaysBookingsWidget',
    title: 'Todays Bookings',
    data: {
      name: 'Booking Count',
      count: 0,
      extra: {
        name: 'Today',
        count: 0,
      },
    },
  };

  for (const [date, times] of Object.entries(analyticsData.todaysBookings)) {
    let totalQuantity = 0;
    for (const [time, products] of Object.entries(times)) {
      products.forEach((product) => {
        totalQuantity += product.quantity;
      });
    }
    todaysBookingsWidget.data.count = totalQuantity;
    todaysBookingsWidget.data.extra.count = date;
  }

  const last30DaysBookingsWidget = {
    id: 'last30DaysBookingsWidget',
    title: "Last 30 Day's Bookings",
    data: {
      name: 'Booking Count',
      count: analyticsData.last30DaysBookings,
      extra: {
        name: '',
        count: '',
      },
    },
  };

  const last30DaysProductsWidget = {
    id: 'last30DaysProductsWidget',
    title: "Last 30 Day's Products",
    data: {
      name: 'Sell Count',
      count: analyticsData.last30DaysProducts,
      extra: {
        name: '',
        count: '',
      },
    },
  };

  const productSellings = {
    id: 'productSellings',
    title: 'Product Sellings',
    table: {
      columns: [
        {
          id: 'productName',
          title: 'Product Name',
        },
        {
          id: 'quantity',
          title: 'Quantity',
        },
      ],
      rows: [
        ...Object.values(analyticsData.productSellings).map((product, index) => {
          return {
            id: index + 1,
            cells: [
              {
                id: 'productName',
                value: product.productName,
                classes: 'text-white',
                icon: '',
              },
              {
                id: 'quantity',
                value: product.quantity,
                classes: 'font-semibold',
                icon: '',
              },
            ],
          };
        }),
      ],
    },
  };

  return [
    mostSelledProductsByDate,
    mostBookingDateWidget,
    mostBookingTimeWidget,
    todaysBookingsWidget,
    last30DaysBookingsWidget,
    last30DaysProductsWidget,
    productSellings,
  ];
};

export const { selectEntities: selectWidgets, selectById: selectWidgetById } =
  widgetsAdapter.getSelectors((state) => state.summaryDashboardApp.widgets);

const widgetsSlice = createSlice({
  name: 'summaryDashboardApp/widgets',
  initialState: widgetsAdapter.getInitialState({
    loading: false,
  }),
  reducers: {
    addWidget: (state, action) => {
      const widgetObject = getWidgetObjects(action.payload);
      widgetsAdapter.upsertMany(state, widgetObject);
      state.loading = false;
    },
    setWidgetsLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {
    [getWidgets.fulfilled]: widgetsAdapter.setAll,
    [getWidgets.rejected]: (state, data) => {
      console.log(data);
    },
    [getWeather.fulfilled]: widgetsAdapter.upsertOne,
  },
});

export const { addWidget, setWidgetsLoading } = widgetsSlice.actions;

export default widgetsSlice.reducer;
