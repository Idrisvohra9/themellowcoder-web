import React from "react";
import logo from "./Images/logo3.png";
import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink to="/" className="logo">
      <img src={logo} alt="logo" />
      <div className="d-flex justify-content-center flex-column">
        <div className="title">themellowcoder</div>
        <p>A Creative Stop!</p>
      </div>
    </NavLink>
  );
}
