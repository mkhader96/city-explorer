import React from "react";
import WeatherDay from "./WeatherDay";
import './Style.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: this.props.weather,
    };
  }

  render() {
    return (
        <table>
          <tr>
            <th>Date</th>
            <th>Forecast</th>
          </tr>
          {this.props.weather.map((day) => (
            <tr>
              <WeatherDay day={day} />
            </tr>
          ))}
        </table>
    );
  }
}

export default App;
