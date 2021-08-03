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
import Profile from "./Pages/Profile/Profile";
import "./App.scss";
import setAuthFunc from "./config/setAuth";
import axios from "axios";
import baseURL from "./config/baseURL";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();

  const getUser = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const userData = await axios.get(baseURL + "/users/" + userId);
      console.log(userData);
      setUser(userData.data);
    }
  };

  const setAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthFunc(token);
      setIsLogin(true);
    }
  };

  useEffect(() => {
    setAuthToken();
    getUser();
  }, []);

  return (
    <Container>
      <BrowserRouter>
        <div className="App page">
          <Navbar user={user} />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/posts" component={Posts} />

            {!user && (
              <>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </>
            )}

            {user && (
              <>
                <Route exact path="/profile">
                  <Profile user={user} />
                </Route>
                <Route exact path="/post">
                  <Post user={user} />
                </Route>
              </>
            )}
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    </Container>
  );
}

export default App;
