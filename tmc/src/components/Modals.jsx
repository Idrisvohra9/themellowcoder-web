import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setCookie } from "../tools/cookies";
import axios from "axios";

export default function Login() {
  const [getData, setData] = useState({
    username: "",
    pass: "",
  });
  async function logIn(e) {
    e.preventDefault();
    const existingUser = await axios.post(
      `${process.env.REACT_APP_SERVER}users/login`,
      getData
    );
    // This returns true if the user already exists in db and false else wise.
    let { _id, result } = existingUser.data;
    if (result) {
      setCookie("username", getData.username);
      setCookie("uid", _id);
      window.location.reload();
    } else {
      document.querySelector(".toast.login-warning").classList.add("show");
    }
  }
  return (
    <>
      <div
        className="toast custom login-warning align-items-center text-bg-danger border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">Invalid Login Credentials!</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
      {/* Login Modal */}
      <div className="modal" id="loginReg">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content loginReg">
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Login!</h3>
                <h4 className="text-muted">Welcome Back💝</h4>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form onSubmit={logIn}>
              <div className="modal-body">
                <table>
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <input
                          type="text"
                          className="inputCont"
                          placeholder="Username"
                          maxLength={14}
                          value={getData.username}
                          onChange={(e) =>
                            setData({ ...getData, username: e.target.value })
                          }
                          required
                        />
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="2">
                        <input
                          type="password"
                          className="inputCont"
                          id="pass"
                          placeholder="Password"
                          maxLength={9}
                          required
                          value={getData.pass}
                          onChange={(e) =>
                            setData({ ...getData, pass: e.target.value })
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <div>
                  <input
                    className="form-check-input text-bg-dark me-2"
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    defaultChecked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="rememberMe"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                  >
                    Remember Me
                  </label>
                </div>
                <Link
                  to="/Forgot-Password"
                  style={{ color: "white", fontSize: "18px" }}
                >
                  Forgot your password?
                </Link>
                <button className="inputBtns btn-primary" type="submit">
                  Log-in
                </button>
                New to TMC?
                <Link to="/Sign-up" className="inputBtns btn-primary">
                  Sign-up!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* OOPSIE Modal */}
      <div className="modal fade" id="oopsie-modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Oopsie</h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <p>It seems you've not logged in yet. </p>
              <p>You need to login or sign up to do dat..</p>
              <div className="d-flex justify-content-center">
                <Link to="/sign-up" className="btn btn-dark">
                  Login/Register
                </Link>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="d-none"
        id="trigger-oopsie"
        data-bs-toggle="modal"
        data-bs-target="#oopsie-modal"
      ></button>
    </>
  );
}
