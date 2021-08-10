import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseURL from "../../config/baseURL";
import axios from "axios";
import Moment from "react-moment";
import "./Posts.scss";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
  console.log(posts);
  return (
    <div className="page">
      <div className="postsContainer">
        <h1 className="pageHeader">Posts</h1>
        <div className="cardList">
          {loading ? (
            <p>loading...</p>
          ) : (
            posts.map((post) => (
              <div className="card" key={post._id}>
                <Link to={"/posts/" + post._id}>
                  <div
                    className="card__img"
                    style={{ backgroundImage: `url(${post.coverImage})` }}
                  ></div>
                  <div className="card__text">
                    <h4 class="card__text__title">{post.title}</h4>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                          marginBottom: "1rem",
                        }}
                      >
                        <span>{post.userId.username}</span>
                        <img
                          alt="User Avatar"
                          src={post.userId.avatar}
                          className="userAvatar"
                        />
                        <p>
                          {" "}
                          <Moment date={post.date} fromNow />
                        </p>
                      </div>
                      <span className="card__category">{post.category}</span>
                      <p className="lastUpdated">
                        Last updated <Moment date={post.update} fromNow />
                      </p>
                    </div>
                    {post.views === 0 ? (
                      <span className="viewsBadge newPostBadge">New</span>
                    ) : null}
                    {post.views !== 0 ? (
                      <span className="viewsBadge">{post.views}</span>
                    ) : null}
                  </div>
                </Link>
              </div>
            ))
          )}
          {posts.length < 1 && !loading && "posts Not Found!"}
        </div>
      </div>
    </div>
  );
}
