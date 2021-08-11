import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SinglePost.scss";
import axios from "axios";
import baseURL from "../../config/baseURL";
import Moment from "react-moment";

export default function SinglePost() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  const getPost = async () => {
    setLoading(true);
    try {
      const postData = await axios.get(baseURL + "/posts/" + id);
      console.log(postData.data);
      setPost(postData.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  console.log(post);

  return (
    <div className="page">
      {loading ? (
        <span>loading</span>
      ) : (
        <div className="container">
          <h1>{post.title}</h1>
          <img
            style={{ maxWidth: "700px", minWidth: "300px" }}
            src={post.coverImage}
          ></img>
          <div style={{ display: "flex" }}>
            <span>{post.userId.username}</span>
            <div
              className="avatarBox"
              style={{ backgroundImage: "url(" + post.userId.avatar + ")" }}
            ></div>
          </div>

          <span>
            <Moment date={post.date} fromNow />
          </span>

          <span>
            {" | Last update "} <Moment date={post.update} fromNow />
            {" | "}
          </span>
          <span>{post.views}</span>
          <p>{post.content}</p>
        </div>
      )}
    </div>
  );
}
