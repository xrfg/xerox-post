import React, { useState } from "react";
import "./Profile.scss";
import baseURL from "../../config/baseURL";
import axios from "axios";

export default function Profile({ user }) {
  const [success, setSuccess] = useState();
  const onSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const avatar = e.target.avatar.value;
    const userData = {
      username,
      avatar,
    };

    try {
      const res = await axios.post(baseURL + "/users/edit", userData);

      setSuccess("profile successfully updated, redirect in 2s");
      setTimeout(() => {
        window.location.replace("/profile");
      }, 2000);

      console.log("RES ==> ", res.data);
    } catch (e) {
      console.log(e);
    }
    console.log("profile ==> ", userData);
  };
  return (
    <div className="homepage">
      <div className="formSection">
        <h1 className="registerHeader">My Profile</h1>
        <h4 className="profileName">Hi {user.username}!</h4>
        {success && (
          <div className="" role="alert">
            {success}
          </div>
        )}
        <img src={user.avatar} alt="Profile Avatar" className="profileAvatar" />
        <form className="postForm" onSubmit={onSubmit}>
          <label>
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
          <label>
            Avatar URL:
            <input
              name="avatar"
              defaultValue={user.avatar}
              type="text"
              className="emailBox bigUrl"
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
