import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import baseURL from "../../config/baseURL";
import Moment from "react-moment";
import "./MyPosts.scss";
export default function MyPosts({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    setLoading(true);
    try {
      const postsData = await axios.get(baseURL + "/posts/user-posts");
      setPosts(postsData.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const onDeletePost = async (id) => {
    setLoading(true);
    try {
      const postData = await axios.delete(baseURL + "/posts/" + id);
      console.log(postData.data);
      setLoading(false);
      window.location.reload();
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  console.log(posts);
  console.log(user);

  return (
    <div className="page">
      <div className="container">
        <h1 className="myPostsHeader">{user.username} posts </h1>
        <h4 className="myPostsEmail">{user.email}</h4>

        <button className="newPostBtn">
          <Link to="/create-post">NEW post</Link>
        </button>
        <ul className="myPostsList">
          {loading ? (
            <span>loading...</span>
          ) : (
            posts.map((post, idx) => (
              <Link to={"/posts/" + post._id}>
                <li className="postRow" key={idx}>
                  <img
                    alt="Post Avatar"
                    src={post.coverImage}
                    width="80"
                    height="80"
                  />
                  <div>
                    {post.title}
                    <Moment className="myPostsDate" date={post.date} fromNow />
                  </div>
                  <div className="btnBox">
                    <button className="editBtn" type="button">
                      <Link to={"/edit-post/" + post._id}>Edit</Link>
                    </button>
                    <button
                      className="deleteBtn"
                      onClick={(e) => {
                        e.preventDefault();
                        onDeletePost(post._id);
                      }}
                      type="button"
                      style={{ zIndex: "100" }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              </Link>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
