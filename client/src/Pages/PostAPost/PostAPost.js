import React, { useState, useEffect } from "react";
import axios from "axios";
import baseURL from "../../config/baseURL";
import "./PostAPost.scss";

export default function Post() {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    console.log(image);
  }, [image]);

  /*  useEffect(() => {
    console.log(url);
  }, [url]); */

  const uploadImageAndPost = async (e) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "xeroxtry");
    formData.append("cloud_name", "xeroxcloud");
    const options = { method: "POST", body: formData };
    return fetch(
      "https://api.cloudinary.com/v1_1/xeroxcloud/image/upload",
      options
    )
      .then((res) => res.json())
      .then(async (res) => {
        console.log(res);
        setUrl(res.secure_url);
        // is not updated on time like it was happening with $image
        console.log(url);
        const post = {
          title: e.target.title.value,
          category: e.target.category.value,
          coverImage: res.secure_url,
          content: e.target.content.value,
        };
        console.log(post);

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
            }, 1000);
          }
          console.log("res => ", res.data);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  };

  const submitPost = async (e) => {
    e.preventDefault();
    await uploadImageAndPost(e);

    /*  const post = {
      title: e.target.title.value,
      category: e.target.category.value,
      coverImage: url,
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
        /* setTimeout(() => {
          window.location.replace("/posts");
        }, 3000);
      }
      console.log("res => ", res.data);
    } catch (err) {
      console.log(err);
    } */
  };
  return (
    <div className="createPostPage">
      <div style={{ padding: "4rem 0" }} className="formSection">
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
            Image Upload:
            <input
              type="file"
              onChange={(e) => {
                let files = e.target.files;
                setImage(files[0]);
              }}
            ></input>
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
