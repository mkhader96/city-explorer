import React from "react";
import './Style.css'


class App extends React.Component {
  render() {
    return (
        <>
        <td>{this.props.day.date}</td>
        <td>{this.props.day.description}</td>
        </>
    );
  }
}

export default App;
