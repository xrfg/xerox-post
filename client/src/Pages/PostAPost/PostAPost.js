import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../config/baseURL";
import "./PostAPost.scss";

export default function Post() {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const submitPost = async (e) => {
    e.preventDefault();

    const post = {
      title: e.target.title.value,
      category: e.target.category.value,
      coverImage: e.target.coverImage.value,
      content: e.target.content.value,
    };

    console.log("post data frontend ==>", post);

    // post req ==> http://localhost:5000/api/v1/posts/post

    try {
      const res = await axios.post(baseURL + "/posts/post", post);
      if (res.data.error) {
        setError(res.data.error);
        setSuccess(null);
      } else {
        setError(null);
        setSuccess("posted successfully, redirect in 3 seconds");
        setTimeout(() => {
          window.location.replace("/posts");
        }, 3000);
      }
      console.log("res => ", res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="homepage">
      <div className="formSection">
        <form onSubmit={submitPost} className="postForm">
          <label>
            Post Title:
            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              className="emailBox"
              required
            />
          </label>
          <label>
            Post Category:
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="emailBox"
              required
            />
          </label>
          <label>
            Cover Image:
            <input
              type="text"
              name="coverImage"
              placeholder="Cover Image URL"
              className="emailBox"
              required
            />
          </label>
          <label>
            Content:
            <textarea
              placeholder="text"
              name="content"
              required
              className="postTextarea"
            ></textarea>
          </label>
          <button className="startBtn" type="reset">
            clear all
          </button>
          <button className="startBtn" type="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
