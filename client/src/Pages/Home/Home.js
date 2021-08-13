import React, { useContext, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../context/MyContext";
import "./Home.scss";
import axios from "axios";
import baseURL from "../../config/baseURL";

export default function Home(props) {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setUserEmail } = useContext(MyContext);
  const [running, setRunning] = useState(true);

  const inputVal = useRef("");

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const getPosts = async () => {
    setLoading(true);
    try {
      const postData = await axios.get(baseURL + "/posts");
      setPosts(postData.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="homepage">
      <div className="fancyborder"></div>
      <div className="hero">
        <h1 className="hero__title">Posts</h1>
        <h2 className="hero__subtitle">🧱 Read anywhere 🐀 Post anytime 🚱</h2>
        <h2>Enter your email to contribute to the wall</h2>
        <form className="hero__form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            ref={inputVal}
            placeholder="Email address"
            className="emailBox"
            style={{ marginRight: "2rem" }}
          />
          <button
            className="startBtn"
            type="submit"
            onClick={() => {
              const email = inputVal.current.value;
              if (validateEmail(email)) {
                setUserEmail(email);
                console.log(email);
                setTimeout(() => {
                  props.history.push("/register");
                }, 1000);
              } else {
                setError("Please enter a valid email (example@mail.com)");
                console.log(error);
              }
            }}
          >
            <span>Get Started</span>
          </button>
        </form>

        {error && (
          <div className="infoWarning">
            <span>{error}</span>
          </div>
        )}
      </div>
      <div
        className="homeList"
        style={{ animationPlayState: running ? "running" : "paused" }}
      >
        {posts.map((post) => (
          <div
            onMouseOver={() => setRunning(false)}
            onMouseOut={() => setRunning(true)}
            className="homeList__card"
            key={post._id}
          >
            <Link to={"/posts/" + post._id}>
              <div
                className="homeList__card__img"
                style={{ backgroundImage: `url(${post.coverImage})` }}
              ></div>
              <h4 className="homeList__card__title">{post.title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
