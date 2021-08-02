import React, { useState, useEffect } from "react";
import Container from "./context/Container";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Footer from "./Pages/Footer/Footer";
import Posts from "./Pages/Posts/Posts";
import Post from "./Pages/Post/Post";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import "./App.scss";
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
