import React, { useState, useRef, useEffect } from "react";
import useLoader from "../Hooks/useLoader";
import { getCookie, setCookie } from "../tools/cookies";
import { Link, useNavigate } from "react-router-dom";
export default function Admin() {
  useLoader();
  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
  });
  const redirect = useNavigate();

  function validateAdmin(e) {
    e.preventDefault();
    if (
      adminData.username === "IdrisAdmin" &&
      adminData.password === "AdminIam987"
    ) {
      setCookie("isAdmin", adminData.username);
      // console.log("Redirect");
      redirect(`/admin/panel/${adminData.username}`)
    }
  }
  useEffect(() => {
    console.log(getCookie("isAdmin"));
    // If the user is found to be admin he will be auto redirected to the admin panel.
    if (getCookie("isAdmin") === "IdrisAdmin") {
      redirect(`/admin/panel/${getCookie("isAdmin")}`);
    }
  }, []);
  return (
    <div className="gradient-bg" style={{ height: "85vh" }}>
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <div className="login-box">
          <form onSubmit={validateAdmin}>
              <div className="d-flex justify-content-center align-items-center mb-2">
                <h4>Admin Login</h4>
              </div>
            <div className="user-box">
              <input
                type="text"
                required
                maxLength={14}
                value={adminData.username}
                onChange={(e) => {
                  setAdminData({ ...adminData, username: e.target.value });
                }}
              />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                required
                maxLength={15}
                value={adminData.password}
                onChange={(e) => {
                  setAdminData({ ...adminData, password: e.target.value });
                }}
              />
              <label>Password</label>
            </div>
            <center>
              <button type="submit">
                Send
                <span></span>
              </button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}
