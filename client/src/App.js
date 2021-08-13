import React, { useState, useEffect } from "react";
import Container from "./context/Container";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Footer from "./Pages/Footer/Footer";
import Posts from "./Pages/Posts/Posts";
import PostAPost from "./Pages/PostAPost/PostAPost";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Profile from "./Pages/Profile/Profile";
import "./App.scss";
import setAuthFunc from "./config/setAuth";
import axios from "axios";
import baseURL from "./config/baseURL";
import SinglePost from "./Pages/SinglePost/SinglePost";
import MyPosts from "./Pages/MyPosts/MyPosts";
import EditPost from "./Pages/EditPost/EditPost";
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
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/posts/:id" component={SinglePost} />

            {!user && (
              <>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </>
            )}

            {user && (
              <>
                <Route exact path="/">
                  <Posts />
                </Route>
                <Route exact path="/profile">
                  <Profile user={user} />
                </Route>
                <Route exact path="/create-post">
                  <PostAPost user={user} />
                </Route>
                <Route exact path="/my-posts">
                  <MyPosts user={user} />
                </Route>
                <Route exact path="/edit-post/:id">
                  <EditPost user={user} />
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
