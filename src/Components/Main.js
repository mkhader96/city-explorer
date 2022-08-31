import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Weather from "./Weather";
import Movies from "./Movies";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      lat: "",
      lon: "",
      zoom: 18,
      errorMsg: false,
      mapImg: false,
      movies: [],
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
        cityName: resResult.data[0].display_name,
        lat: resResult.data[0].lat,
        lon: resResult.data[0].lon,
        mapImg: true,
        errorMsg: false,
      });

      this.getWeatherData(resResult.data[0].lat, resResult.data[0].lon);
      this.getMoviesData(event.target.city.value);
    } catch {
      this.setState({
        errorMsg: true,
      });
    }
  };
  getWeatherData = async (lat, lon) => {
    try {
      let resResult = await axios.get(
        `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`
      );
      this.setState({
        weather: resResult.data,
        errorMsg: false,
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
  getMoviesData = async (cityName) => {
    try {
      let city = cityName;
      console.log(city);
      let resResult = await axios.get(
        `${process.env.REACT_APP_SERVER}/movies?city=${city}`
      );
      console.log(resResult.data);
      this.setState({
        movies: resResult.data,
        errorMsg: false,
      });
      console.log(this.state.movies);
    } catch {
      this.setState({
        errorMsg: true,
      });
    }
  };
  render() {
    return (
      <div>
        <br></br>
        <br></br>

        <br></br>

        <form onSubmit={this.getLocationData}>
          <input type="text" name="city" placeholder="Enter a city" />
          <button type="submit">Explore!</button>
        </form>
        <br></br>
        <br></br>
        <br></br>

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossorigin="anonymous"
        />
        {this.state.mapImg && <Card style={{ width: "40rem" }}>
          
          {this.state.mapImg && (
            <Card.Img
              variant="top"
              src={`https://maps.locationiq.com/v3/staticmap?key=pk.8f6f74f05371d52160397d85b766283a&center=${this.state.lat},${this.state.lon}&zoom=${this.state.zoom}`}
            />
          )}
          <Card.Body>
            {this.state.mapImg && (
              <button onClick={this.zoomIn}>Zoom In</button>
            )}
            <span> </span>

            {this.state.mapImg && (
              <button onClick={this.zoomOut}>Zoom Out</button>
            )}
            <Card.Title>Name {this.state.cityName}</Card.Title>
          </Card.Body>
          <ListGroup>
            <ListGroup.Item>Latitude: {this.state.lat}</ListGroup.Item>
            <ListGroup.Item>Longitude: {this.state.lon}</ListGroup.Item>
            <Weather weather = {this.state.weather}/>

          </ListGroup>
          {this.state.errorMsg &&<Card.Body>
             (
              <h4>Error : sorry something went wrong!</h4>
            )
          </Card.Body>}
        </Card>}

        <Movies movies = {this.state.movies}/>
      </div>
    );
  }
}

export default App;
