import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dname: "",
      lat: "",
      lon: "",
      errorMsg: false,
      mapImg: false,
      zoom: 18,
      weather: [],
    };
  }

  getLocationData = async (event) => {
    event.preventDefault();
    const cityName = event.target.city.value;
    const URL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_MAP_KEY}&q=${cityName}&format=json`;

    try {
      let resResult = await axios.get(URL);
      this.setState({
        dname: resResult.data[0].display_name,
        lat: resResult.data[0].lat,
        lon: resResult.data[0].lon,
        mapImg: true,
        errorMsg: false,
      });

      this.getWeatherData(resResult.data[0].lat, resResult.data[0].lon);
    } catch {
      this.setState({
        errorMsg: true,
      });
    }
  };
  getWeatherData = async (lat, lon) => {
    try {
      let resResult = await axios.get(`${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`);
      console.log(resResult);
      this.setState({
        weather: resResult.data,
      });
    } catch {
      this.setState({
        errorMsg: true,
      });
    }
  };
  zoomIn = () => {
    if (this.state.zoom < 18) {
      this.setState({
        zoom: this.state.zoom + 1,
      });
    }
  };
  zoomOut = () => {
    if (this.state.zoom > 0) {
      this.setState({
        zoom: this.state.zoom - 1,
      });
    }
  };
  render() {
    return (
      <div>
        <h1>City Explorer</h1>
        <br></br>
        <br></br>

        <form onSubmit={this.getLocationData}>
          <input type="text" name="city" placeholder="Enter a city" />
          <button type="submit">Explore!</button>
        </form>

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossorigin="anonymous"
        />
        <Card style={{ width: "40rem" }}>
          {this.state.mapImg && (
            <Card.Img
              variant="top"
              src={`https://maps.locationiq.com/v3/staticmap?key=pk.8f6f74f05371d52160397d85b766283a&center=${this.state.lat},${this.state.lon}&zoom=${this.state.zoom}`}
            />
          )}
          <Card.Body>
            <Card.Title>Name {this.state.dname}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Latitude: {this.state.lat}</ListGroup.Item>
            <ListGroup.Item>Longitude: {this.state.lon}</ListGroup.Item>
            <div>
              {this.state.weather.map((day) => (
                <ListGroup.Item>
                  <span>Date: {day.date}</span>
                  <br></br>
                  <span>{day.description}</span>
                  </ListGroup.Item>
              ))}
            </div>
          </ListGroup>

          <Card.Body>
            {this.state.mapImg && (
              <button onClick={this.zoomIn}>Zoom In</button>
            )}
            <span> </span>

            {this.state.mapImg && (
              <button onClick={this.zoomOut}>Zoom Out</button>
            )}
            {this.state.errorMsg && (
              <h4>Error : sorry something went wrong!</h4>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default App;
