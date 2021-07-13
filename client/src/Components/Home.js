import React, { useContext, useRef } from "react";
import MyContext from "../context/MyContext";
import "../Sass/Home.scss";
import Blob1 from "../assets/svg/blob.svg";
import Blob2 from "../assets/svg/blob2.svg";
import Blob3 from "../assets/svg/blob3.svg";

export default function Home(props) {
  const { setUserEmail } = useContext(MyContext);
  const inputVal = useRef("");

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  return (
    <div className="homepage">
      <img className="blobImg" src={Blob1} alt="Blob log" />
      <img className="blobImg blob2" src={Blob2} alt="Blob log" />
      <img className="blobImg blob3" src={Blob3} alt="Blob log" />
      <div className="fancyborder"></div>
      <div className="hero">
        <h1>blob posting</h1>
        <h2>Read anywhere. Post anytime.</h2>
        <h2>blobs in progress... Enter your email to create a membership</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            ref={inputVal}
            placeholder="Email address"
            className="emailBox"
            required
          />
          <button
            type="submit"
            onClick={() => {
              const email = inputVal.current.value;
              if (validateEmail(email)) {
                setUserEmail(email);
                props.history.push("/register");
              } else {
                alert("enter a valid email - example@example.example");
              }
            }}
          >
            <span>Get Started</span>
          </button>
        </form>
      </div>
    </div>
  );
}
