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
          <div style={{ display: "flex" }}>
            <span>{post.userId.username}</span>
            <div
              className="avatarBox"
              style={{ backgroundImage: "url(" + post.userId.avatar + ")" }}
            ></div>
          </div>
          <cite title="Source Title">
            <Moment date={post.date} fromNow />
          </cite>
          {" | Last update "}{" "}
          <cite title="Source Title">
            <Moment date={post.update} fromNow />
          </cite>
          {" | "}
          <i class="fas fa-eye"></i> {post.views}
          <p
            className="Content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></p>
        </div>
      )}
    </div>
  );
}