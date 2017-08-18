import React from 'react';
import axios from 'axios';
import moment from 'moment';
import info from '../../private/config.js';


export default class App extends React.Component {
  constructor(props) {    
    super()
    this.state = { weatherWeek: null, toggle: false };
  }

  componentDidMount() {
  axios.get(`http://api.aerisapi.com/forecasts/11101?client_id=${info.id}&client_secret=${info.secret}`)
    .then((res) => {
      // Pulling the weather data for the coming week from the Aeris Weather API
      const weatherData = res.data.response[0].periods
      // Updating our state and rerendering our app with the new data
      this.setState({ weatherWeek: weatherData })

    });
  }

  toggleScale(event) {
    const scale = event.target.innerText; // identifying which temperature scale to display

    let farenHTMLCollection = document.getElementsByClassName('faren')
    let celHTMLCollection = document.getElementsByClassName('cel')
    // HTMLCollections are array-like objects that can't, on their own, take advantage of the methods on the Array objects.
    // read more on them here: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection

    if (scale === '°C') {  
      // The call method allows us to pass down the collections as the 'this' value for the forEach method.
      Array.prototype.forEach.call(farenHTMLCollection, (elem) => elem.hidden = true)// Hide all p elements displaying temperature in farenheit
      Array.prototype.forEach.call(celHTMLCollection, (elem) => elem.hidden = false) // Display all p elements with temperature in celsius
    } else {
      // the same as above, switched.
      Array.prototype.forEach.call(farenHTMLCollection, (elem) => elem.hidden = false)
      Array.prototype.forEach.call(celHTMLCollection, (elem) => elem.hidden = true)
    }
  }

  render() {
    const weatherWeek = this.state.weatherWeek;
    return (
      <div id="app">

        <header>

          <h1 id="title">Upcoming Weather for the Week!</h1>          

          <div id="toggle">
            <button onClick={this.toggleScale}>°C </button> <button onClick={this.toggleScale}> °F</button>
          </div>

        </header>

        <main id='week'>


          {
            ! weatherWeek // If the data doesn't exist yet...
            ? 'Loading...' // display this placeholder, else...
            : weatherWeek.map((day,idx) => { // render the weather data for the coming week.


                const dayName = moment(day.dateTimeISO).format('dddd'); // Monday, Tuesday, etc...
                const date = moment(day.dateTimeISO).format('MMMM Do YYYY'); // August 15th 2017

                return (
                  <section className='days' key={dayName}>

                    <h4>{date}</h4>

                    <h3>{dayName}</h3>

                    <img src={`./icons/${day.icon}`} alt={day.icon}></img>

                    <p className='faren'>
                      High: {day.maxTempF} ℉<br/>
                      Low: {day.minTempF} ℉
                    </p>

                    <p className='cel' hidden>
                      High: {day.maxTempC} ℃<br/>
                      Low: {day.minTempC} ℃
                    </p>

                  </section>
                );

              })
          }
        </main>
      </div>
    );
  }
}

