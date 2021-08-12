import React, { useState, useEffect } from "react";
import "./Profile.scss";
import baseURL from "../../config/baseURL";
import axios from "axios";

export default function Profile({ user }) {
  const [success, setSuccess] = useState();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState();

  useEffect(() => {
    console.log(image);
  }, [image]);

  useEffect(() => {
    setUrl(user.avatar);
  }, []);

  useEffect(() => {
    console.log(url);
  }, [url]);

  const handleImgUploadAndPost = async (e) => {
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
        setUrl(res.secure_url);
        console.log(url);
        const userData = {
          username: e.target.username.value,
          avatar: res.secure_url,
        };
        try {
          const res = await axios.post(baseURL + "/users/edit", userData);

          setSuccess(true);
          setTimeout(() => {
            window.location.replace("/my-posts");
          }, 1000);

          console.log("RES ==> ", res.data);
        } catch (e) {
          console.log(e);
        }
        console.log("profile ==> ", userData);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleImgUploadAndPost(e);
  };
  return (
    <div className="homepage" style={{ position: "relative" }}>
      {success && <div className="successNote"></div>}
      <div className="formSection">
        <h1 className="registerHeader">My Profile</h1>
        <h4 className="profileName">Hi {user.username}!</h4>
        <label className="addImg" id="overcome">
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              let files = e.target.files;
              setImage(files[0]);
              setUrl(URL.createObjectURL(files[0]));
            }}
          />
        </label>

        <img src={url} alt="Profile Avatar" className="profileAvatar" />
        <form className="postForm" onSubmit={onSubmit}>
          <label style={{ marginTop: "4rem" }}>
            Username:
            <input
              name="username"
              defaultValue={user.username}
              type="text"
              className="emailBox"
            />
          </label>
          <label>
            User Email (Read only)
            <input
              value={user.email}
              type="text"
              className="emailBox"
              disabled
            />
          </label>

          <button type="submit" className="startBtn profileBtn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
