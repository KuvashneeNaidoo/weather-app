import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Weather.css';

/* I imported the list of countries from i18n-iso-countries in order to return the name of the country in 
English when the user enters his/her location. */
import countries from 'i18n-iso-countries';

/* The icons used in this weather app were imported from React Font Awesome.*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlassLocation,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

/* We will need to register the languages we want to use from the i18n-iso-countries package 
in order for these languages to appear in the browser. */
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

/* Within our Weather component, we will begin by creating some states to store our weather data. 
The states of the inital values will always be changing and is dependent on the users input. The
useState function will be used to update the states. I have chosen to use Cape Town as an example
whereby the weather data of this city will appear when the app runs.*/
const Weather = () => {
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('Cape Town');
  const [state, setState] = useState('Cape Town');

  /* I signed up on OpenWeatherMap and obtained my own apikey code. This apikey together with the 
  state is inserted in the URL below which will retrieve our weather data. */
  const apiKey = `a2e44f776bb10bac99a7a827df96686c`;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&APPID=${apiKey}`;

  /* We will now fetch the weather data from the API. The useEffect hook will help us to perform this side
  effect to store and render our data when the user enters or changes their location. */
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  /* An input handler is used to retrieve the weather data when the user inputs their location. getState 
  is the store method used to store this data and is the same as the value returned by the user. */
  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  /* A submit handler is used to process the request made by the user when the search button is triggered. */
  const submitHandler = () => {
    setState(getState);
  };

  /* To present the temperature data in Celsius, a Kelvin to Celsius conversion is performed whereby
  the value is rounded off to nearest whole number. */
  const kelvinToCelsius = (k) => {
    return (k - 273.15).toFixed();
  };

  /* To display the weather data for a specific date, we will use the Get Method to specify the weather 
  for a certain day, date, month and year (in this order).  */
  const calendarDate = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  /* Here the inputHandler is called whenever the input value is changed. The submitHandler is also  
  called when the user clicks on the search button. React Bootstrap columns, rows and the container is 
  used to structure the weather data on the page. Also, by using the weather data from OpenWeatherMap, 
  the weather icon, a list of countries and various weather conditions can now be displayed. The Calendar
  Date is also called which will display the date of when the data is loaded. If the data takes some time 
  to load, a loading message will be shown on the page until the weather data for the specified location 
  is ready to be displayed. */
  return (
    <div className="main">
      <Container className="container">
        <Row>
          <Col>
            <header>
              <h1>What's The Weather?</h1>
              <h6>Get your daily weather forecast right here!</h6>
            </header>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <input
                type="text"
                id="location-name"
                placeholder="Type your location"
                class="form-control"
                onChange={inputHandler}
                value={getState}
              />
              <button className="searchbutton" onClick={submitHandler}>
                <FontAwesomeIcon
                  className="icon"
                  icon={faMagnifyingGlassLocation}
                />
              </button>
            </div>
            {apiData.main ? (
              <div>
                <img
                  src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                  alt="weather status icon"
                />
                <div className="data">
                  <div className="date">{calendarDate(new Date())}</div>
                  <h1 className="city/town">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
                    <strong>{apiData.name}</strong>
                  </h1>
                  <h2 className="country">
                    <strong>
                      {' '}
                      {countries.getName(apiData.sys.country, 'en', {
                        select: 'official',
                      })}
                    </strong>
                  </h2>
                  <h3 className="status">
                    <strong>{apiData.weather[0].main}</strong>
                  </h3>
                  <h3 className="description">
                    <strong>{apiData.weather[0].description}</strong>
                  </h3>
                  <br />
                  <h3 className="realfeel">
                    <strong>
                      Real Feel: {kelvinToCelsius(apiData.main.temp)} °C
                    </strong>
                  </h3>
                  <h3 className="maxtemperature">
                    <strong>
                      Max Temperature: {kelvinToCelsius(apiData.main.temp_max)}{' '}
                      °C
                    </strong>
                  </h3>
                  <h3 className="mintemperature">
                    <strong>
                      Min Temperature: {kelvinToCelsius(apiData.main.temp_min)}{' '}
                      °C
                    </strong>
                  </h3>
                  <h3 className="pressure">
                    <strong>Pressure: {apiData.main.pressure}hPa</strong>
                  </h3>
                  <h3 className="humidity">
                    <strong>Humidity: {apiData.main.humidity}%</strong>
                  </h3>
                </div>
              </div>
            ) : (
              <h1>Weather data is currently loading...</h1>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

/*We export the 'Weather' component in order to display this code in App.js.*/
export default Weather;
