import React from 'react';
import axios from 'axios';
import moment from 'moment';

const id = 'xBLMizJATMjg20qtueMRB';
const secret = 'Rjc4mVkRmm260hOxgQTDTuzdhG4YcsbP5uqBwfjQ';


export default class App extends React.Component {
  constructor(props) {    
    super()
    this.state = { weatherWeek: null };
  }

  componentDidMount() {
  axios.get(`http://api.aerisapi.com/forecasts/11101?client_id=${id}&client_secret=${secret}`)
    .then((res) => {

      let weatherData = res.data.response[0].periods
      console.log(res);
      console.log(weatherData);

      this.setState({ weatherWeek: weatherData })

    });
  }

  render() {
    let weatherWeek = this.state.weatherWeek;
    return (
      <div id='app'>
        {
          !weatherWeek //If the data doesn't exist yet...
          ? 'Loading...' //display this placeholder, else...
          : weatherWeek.map((day,idx) => { //render the weather data for the coming week.

              let dayName = moment(day.dateTimeISO).format('dddd'); //Monday, Tuesday, etc...
              let date = moment(day.dateTimeISO).format('MMMM Do YYYY'); // August 15th 2017

              return (
                <section className='days' key={dayName}>
                  <h4>{date}</h4>
                  <h3>{dayName}</h3>
                  <img src={`../assets/icons/${day.icon}`} alt={day.icon}></img>
                  <p>
                    High: {day.minTempF}<br/>
                    Low: {day.maxTempF}
                  </p>
                </section>
              );

            })
        }
      </div>
    );
  }
}
