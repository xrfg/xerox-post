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
    <div className="container Page">
      <h1>Posts</h1>
      <div className="cardList">
        {loading ? (
          <p>loading...</p>
        ) : (
          posts.map((post, idx) => (
            <div className="card" key={idx}>
              <Link to={"/posts/" + post._id}>
                <div
                  className="card__img"
                  style={{ backgroundImage: `url(${post.coverImage})` }}
                ></div>
                <div className="card__text">
                  <h4 class="card__text__title">{post.title}</h4>
                  <div>
                    <div>
                      <span>By: {" " + post.userId.username + "  "}</span>
                      <img
                        alt="User Avatar"
                        src={post.userId.avatar}
                        className="userAvatar"
                      />
                      <Moment date={post.date} fromNow />
                    </div>
                    <p>Category: {post.category}</p>
                    <p>
                      Last updated <Moment date={post.update} fromNow />
                    </p>
                  </div>

                  {post.views === 0 ? (
                    <span className="badge badge-success Alert">New</span>
                  ) : null}
                  {post.views !== 0 ? (
                    <span className="badge badge-pill badge-info CardViews">
                      <i class="fas fa-eye"></i> {post.views}
                    </span>
                  ) : null}
                </div>
              </Link>
            </div>
          ))
        )}
        {posts.length < 1 && !loading && "posts Not Found!"}
      </div>
    </div>
  );
}
