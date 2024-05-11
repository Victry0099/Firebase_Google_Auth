import React from "react";
import { FcGoogle } from "react-icons/fc";
// import googleLoginAuth from "./googleLoginAuth.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      let name = resultsFromGoogle.user.displayName;
      let email = resultsFromGoogle.user.email;
      let profile = resultsFromGoogle.user.photoURL;
      let response = axios
        .post("http://localhost:5001/api/auth/google", {
          name,
          email,
          profile,
        })
        .then((d) => {
          console.log("data:", d.data);
          dispatch(login(d.data));
          navigate("/");
        })
        .catch((d) => {
          console.log("error is :", d);
        });
    } catch (error) {
      console.error(error);
      // res.status(500).json({ message: "Internal errir" });
    }
  };
  return (
    <>
      <div>
        <button onClick={handleGoogleClick}>
          <FcGoogle /> Continew with google
        </button>
      </div>
    </>
  );
};

export default GoogleAuth;
