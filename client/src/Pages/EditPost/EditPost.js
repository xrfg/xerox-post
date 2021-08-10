import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import baseURL from "../../config/baseURL";
import axios from "axios";
import "./EditPost.scss";
import "../PostAPost/PostAPost.scss";

export default function EditPost() {
  const [content, setContent] = useState();
  const [post, setPost] = useState([]);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = () => {
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
      .then((res) => setUrl(res.secure_url))
      .catch((err) => console.log(err));
  };

  let { id } = useParams();
  const submitHandler = async (e) => {
    e.preventDefault();
    uploadImage();
    const title = e.target.title.value;
    const coverImage = url;
    const category = e.target.category.value;
    const postData = {
      content,
      category,
      coverImage,
      title,
    };

    console.log("postData ==> ", postData);
    try {
      const res = await axios.post(
        baseURL + "/posts/edit/" + post._id,
        postData
      );
      if (res.data.error) {
        setError(res.data.error);
        setSuccess(null);
      } else {
        setError(null);
        setSuccess("the post Edited successfully, redirect in 1s");
        setTimeout(() => {
          window.location.replace("/posts");
        }, 1000);
      }
      console.log("RES ==> ", res.data);
    } catch (e) {
      console.log(e);
    }
    // POST req  ==> http://localhost:5000/api/v1/signup
  };
  const getPost = async () => {
    setLoading(true);
    try {
      const postData = await axios.get(baseURL + "/posts/" + id);
      setPost(postData.data);
      setContent(postData.data.content);
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
    <div className="createPostPage">
      {error && <div role="alert">{error}</div>}
      {success && <div role="alert">{success}</div>}
      {loading ? (
        <span>loading...</span>
      ) : (
        <div style={{ padding: "4rem 0" }} className="formSection">
          <h1 style={{ marginBottom: "2rem" }}>Edit Post</h1>
          <form onSubmit={submitHandler} className="postForm">
            <label>
              Post Title:
              <input
                type="text"
                name="title"
                defaultValue={post.title}
                className="emailBox"
              />
            </label>
            <label>
              Post Category:
              <input
                type="text"
                name="category"
                defaultValue={post.category}
                className="emailBox"
              />
            </label>
            <label>
              Image Upload:
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
            </label>
            <label>
              Content:
              <textarea
                placeholder="text"
                name="content"
                defaultValue={post.content}
                className="postTextarea"
              ></textarea>
            </label>

            <button className="startBtn" type="submit">
              Update Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
