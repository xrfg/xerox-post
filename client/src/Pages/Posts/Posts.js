import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseURL from "../../config/baseURL";
import axios from "axios";
import Moment from "react-moment";

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
      <h1>posts</h1>
      <div class="row">
        {loading ? (
          <p>loading...</p>
        ) : (
          posts.map((post, idx) => (
            <div className="" key={idx}>
              <Link to={"/post/" + post._id} style={{ textDecoration: "none" }}>
                <div
                  className={
                    post.views == 0 ? "card Card NewCard" : "card Card"
                  }
                >
                  <div
                    className="CardImg"
                    style={{ backgroundImage: `url(${post.coverImage})` }}
                  ></div>

                  <h4 class="card-title">{post.title}</h4>
                  <div>
                    <small class="text-muted">
                      {" "}
                      By: {" " + post.userId.userName + "  "}
                      <img src={post.userId.avatar} className="Avatar" />
                      {" . "}
                      <Moment date={post.date} fromNow />
                    </small>
                    <p>
                      <small class="text-muted">
                        Category: {post.category}
                      </small>
                    </p>
                    <p>
                      <small class="text-muted">
                        Last updated <Moment date={post.update} fromNow />
                      </small>
                    </p>
                  </div>

                  {post.views == 0 ? (
                    <span className="badge badge-success Alert">New</span>
                  ) : null}
                  {post.views != 0 ? (
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
