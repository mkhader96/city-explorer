import React from "react";
import Main from "./Components/Main";
import Header from "./Components/Header";
import Footer from "./Components/Footer";


class App extends React.Component {
  render() {
    return (
      <div>
      <Header/>
      <Main/>
      <Footer/>
      </div>
    );
  }
}

export default App;
