import React from "react";
import Row from "react-bootstrap/Row";
import Movie from "./Movie";


class App extends React.Component {


  render() {
    return (
        <div>
        <h1>Movies in this City: </h1>
      <Row xs={1} md={4} className="g-4">
        {this.props.movies.map((movie) => (
          <Movie movie = {movie} /> 
        ))}
      </Row>
        </div>
    );
  }
}
export default App;
