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

  let { id } = useParams();

  const getPost = async () => {
    setLoading(true);
    try {
      const postData = await axios.get(baseURL + "/posts/" + id);
      setPost(postData.data);
      setContent(postData.data.content);
      setLoading(false);
      setUrl(postData.data.coverImage);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    console.log(image);
  }, [image]);

  useEffect(() => {
    console.log(url);
  }, [url]);

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
        const editedPost = {
          title: e.target.title.value,
          category: e.target.category.value,
          coverImage: res.secure_url,
          content: e.target.content.value,
        };
        console.log(post);

        try {
          const res = await axios.post(
            baseURL + "/posts/edit/" + post._id,
            editedPost
          );
          if (res.data.error) {
            setError(res.data.error);
            setSuccess(null);
          } else {
            setError(null);
            setSuccess("posted edited successfully, redirect in 1s");
            setTimeout(() => {
              window.location.replace("/posts");
            }, 1000);
          }
          console.log("res => ", res.data);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      });
    /* .catch((err) => console.log(err)); */
  };

  const submitPost = async (e) => {
    e.preventDefault();
    await uploadImageAndPost(e);
  };

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
          <form onSubmit={submitPost} className="postForm">
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
            <label className="addImg">
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  let files = e.target.files;
                  setImage(files[0]);
                  setUrl(URL.createObjectURL(files[0]));
                }}
              />
              <img className="imgPreview" src={url} alt="" />
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
