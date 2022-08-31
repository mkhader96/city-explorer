import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";


class App extends React.Component {

render() {
    return (

<div>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={this.props.movie.image_url} />
                <Card.Body>
                  <Card.Title>this.props.movie Name: {this.props.movie.title}</Card.Title>
                  <Card.Text>Overview: {this.props.movie.overview}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    Average Votes: {this.props.movie.average_votes}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Total Votes: {this.props.movie.total_votes}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Popularity: {this.props.movie.popularity}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Release Date: {this.props.movie.released_on}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </div>
    );
}   }

export default App;