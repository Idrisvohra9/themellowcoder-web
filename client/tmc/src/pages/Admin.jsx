import React, { useState, useRef, useEffect } from "react";
import useLoader from "../Hooks/useLoader";
import { getCookie, setCookie } from "../tools/cookies";
import { Link } from "react-router-dom";
export default function Admin() {
  useLoader();
  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
  });
  const redirect = useRef();
  // setCookie("isAdmin", "");

  function validateAdmin() {
    if (
      adminData.username === "IdrisAdmin" &&
      adminData.password === "AdminIam987"
    ) {
      setCookie("isAdmin", "true");
      redirect.current.click();
    }
  }
  useEffect(() => {
    // If the user is found to be admin he will be redirected to the panel page.
    if (getCookie("isAdmin") === "true") {
      redirect.current.click();
    }
  }, []);
  return (
    <div className="gradient-bg" style={{ height: "85vh" }}>
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <div class="login-box">
          <form onSubmit={validateAdmin}>
              <div className="d-flex justify-content-center align-items-center mb-2">
                <h4>Admin Login</h4>
              </div>
            <div class="user-box">
              <input
                type="text"
                required
                value={adminData.username}
                onChange={(e) => {
                  setAdminData({ ...adminData, username: e.target.value });
                }}
              />
              <label>Username</label>
            </div>
            <div class="user-box">
              <input
                type="password"
                required
                value={adminData.password}
                onChange={(e) => {
                  setAdminData({ ...adminData, password: e.target.value });
                }}
              />
              <label>Password</label>
            </div>
            <center>
              <button type="submit">
                SEND
                <span></span>
              </button>
            </center>
          </form>
          <Link to="/admin/panel" ref={redirect} />
        </div>
      </div>
    </div>
  );
}
