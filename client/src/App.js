import React, { useState, useEffect } from "react";
import Container from "./context/Container";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import Posts from "./Components/Posts";
import Post from "./Components/Post";
import About from "./Components/About";
import "./Sass/Reset.scss";
import Contact from "./Components/Contact";
import setAuthFunc from "./config/setAuth";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthFunc(token);
      setIsLogin(true);
    }
  }, []);

  return (
    <Container>
      <BrowserRouter>
        <div className="App page">
          <Navbar />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />

            {isLogin ? (
              <>
                <Route path="/post" component={Post} />
                <Route path="/posts" component={Posts} />{" "}
              </>
            ) : (
              <Redirect to="/login" />
            )}

            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    </Container>
  );
}

export default App;
