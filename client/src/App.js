import React from "react";
import Container from "./context/Container";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import Posts from "./Components/Posts";
import About from "./Components/About";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/posts" component={Posts} />
            <Route path="/about" component={About} />
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    </Container>
  );
}

export default App;
