import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const User = useSelector((s) => {
    return s.user.currUser;
  });
  console.log("user is", User);
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-white text-xl font-bold">
            My App
          </NavLink>
          <div>
            <NavLink to="/login" className="text-white mr-4">
              Login
            </NavLink>
            <NavLink to="/register" className="text-white">
              Register
            </NavLink>
          </div>
        </div>
      </nav>
      {User && (
        <>
          <img src={User.profile} alt="no image" />

          <h1>{User.name}</h1>
        </>
      )}
    </div>
  );
};

export default Navbar;
