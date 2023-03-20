import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [getData, setData] = useState({
    username: "",
    pass: "",
  });
  function logIn(e) {
    e.preventDefault();
    
    console.log(getData);
  }
  return (
    <div>
      <div className="modal" id="loginReg">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content loginReg">
            <div className="modal-header">
              <h3 className="modal-title">Welcome back!</h3>
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
                          placeholder="Password"
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
                <button className="inputBtns btn-primary" type="submit">Log-in</button>
                New to TMC?
                <Link to="/Sign-up" className="inputBtns btn-primary">
                  Sign-up!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="tagsWindow">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Tags</h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div id="tags-show"></div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>

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
              It seems you've not logged in yet.{" "}
              <Link to="">Login/Register</Link>
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
    </div>
  );
}
