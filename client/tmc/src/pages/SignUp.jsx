import React from "react";

export default function SignUp() {
  return (
    <div className="mainContent">
      <div className="gradient-bg">
        <div className="container">
          <div className="d-flex w-100 flex-shrink-1 pt-4">
            <div className="w-50">
              <div className="d-flex justify-content-center flex-column">
                <h1>Sign-up, and join the community!</h1>
                <p>We are glad to have you here!</p>
                <form action="" className="mt-3">
                  <div className="input-group mb-3">
                    <span className="input-group-text">@</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      aria-label="Username"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Email</span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="iamcool@gmail.com"
                      aria-label="email"
                      name="email"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Password</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      aria-label="password"
                    />
                  </div>
                  <div className="input-group mb-3">
                  <span className="input-group-text">What describes you the best</span>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      multiple
                      name="tags"
                      required
                    >
                      <option selected disabled> <b>Select Multiple</b></option>
                      <option value="">Explorer</option>
                      <option value="">Programmer</option>
                      <option value="">Student</option>
                      <option value="">Teacher</option>
                    </select>
                  </div>
                  <input type="submit" value="Sign in" className="btn btn-success mb-3" />
                </form>
              </div>
            </div>
            <div className="w-50">
              <h1>-- Auto Changing Feature display animations to come--</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
