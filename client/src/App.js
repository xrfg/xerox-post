import React from "react";
import Container from "./context/Container";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import Posts from "./Components/Posts";
import Post from "./Components/Post";
import About from "./Components/About";
import "./Sass/Reset.scss";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <div className="App page">
          <Navbar />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/posts" component={Posts} />
            <Route path="/post" component={Post} />
            <Route path="/about" component={About} />
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    </Container>
  );
}

export default App;
