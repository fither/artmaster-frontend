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

export const { selectEntities: selectWidgets, selectById: selectWidgetById } =
  widgetsAdapter.getSelectors((state) => state.summaryDashboardApp.widgets);

const widgetsSlice = createSlice({
  name: 'summaryDashboardApp/widgets',
  initialState: widgetsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: widgetsAdapter.setAll,
    [getWidgets.rejected]: (state, data) => {
      console.log(data);
    },
    [getWeather.fulfilled]: widgetsAdapter.upsertOne,
  },
});

export default widgetsSlice.reducer;
