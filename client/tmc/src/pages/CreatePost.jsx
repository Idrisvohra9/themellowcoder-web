import React, { useState, useRef } from "react";
import useLoader from "../Hooks/useLoader";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../Api/actions";

export default function CreatePost() {
  useLoader();
  return (
    <div className="mainContent">
      <div className="container">
        <form action="">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>
        </form>
      </div>
    </div>
  );
}
