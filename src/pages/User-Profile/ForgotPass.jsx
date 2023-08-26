import React, { useState } from "react";
import useLoader from "../../Hooks/useLoader";
import { emailVerify } from "../../tools/Email";
import { getCookie } from "../../tools/cookies";
export default function ForgotPass() {
  useLoader();
  const [email, setEmail] = useState("");
  const [showPassPage, setShowPassPage] = useState(false);
  const [OTP, setOTP] = useState("");
  async function sendMail(e) {
    e.preventDefault();
    // const otp = await emailVerify(email, getCookie("username"));
    // console.log(otp);
    const placeField = document.querySelector(".place-field");
    placeField.innerHTML = `
    <div class="user-box">
    <input
      type="text"
      required
      maxLength=6
      onchange="(e) => setOTP(e.target.value)"
      id="givenOTP"
      autoComplete="one-time-code"
      pattern="[0-9]*"      
    />
    <label for="givenOTP">OTP</label>
  </div>`;
    console.log(e.target);
    const btn = e.target.querySelector("button[type='submit']");
    btn.innerHTML = "Change Password";
    console.log(btn);
  }
  return (
    <div className="gradient-bg" style={{ height: "100%" }}>
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <div className="login-box">
          {!showPassPage && (
            <form onSubmit={sendMail}>
              <div className="d-flex justify-content-center align-items-center mb-3 flex-column">
                <h4>Let's first verify that it's you.</h4>
                <p className="text-muted">
                  An OTP will be sent to your email address to verify that it's
                  you
                </p>
              </div>
              <div className="user-box">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="givenEmail"
                />
                <label htmlFor="givenEmail">Email</label>
              </div>
              <div className="place-field"></div>
              <center>
                <button type="submit">
                  Send Otp
                  <span></span>
                </button>
              </center>
            </form>
          )}
          {
            showPassPage && (
              "SHow pass "
            )
          }
        </div>
      </div>
    </div>
  );
}
