import React, { useState } from "react";
import axios from "axios";
import GoogleAuth from "../authentication/GoogleAuth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const User = useSelector((s) => {
    return s.user.currUser;
  });
  const handleInput = (e) => {
    // console.log(e);
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handelSubmitLogin = (e) => {
    e.preventDefault();
    console.log("user data", user);
    axios
      .post("http://localhost:5001/api/auth/login", { user })
      .then((res) => {
        dispatch(login(res.data.others));
        alert("User Login Successfully", res);
      })
      .catch((err) => {
        console.log("error is:", err);
      });
  };

  if (User) {
    console.log("logged In");
  } else {
    console.log("not logged in");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handelSubmitLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              className="mt-1 p-2  block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              className="mt-1 p-2  block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Login
          </button>
        </form>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Login;
