import React, { useRef } from "react";
import useLoader from "../Hooks/useLoader";
export default function SignUp() {
  useLoader();
  const username = useRef();
  const pass = useRef();

  const createProfileFields = document.querySelectorAll(".create-profile");
  Array.from(createProfileFields).forEach((element) => {
    element.setAttribute("disabled", true);
  });

  const createProfileLater = () => {
    // console.log(createProfileFields);
    const disabled = Array.from(
      document.querySelectorAll(".create-profile[disabled]")
    );
    if (disabled.length > 0) {
      disabled.forEach((element) => {
        element.removeAttribute("disabled");
      });
    } else {
      Array.from(createProfileFields).forEach((element) => {
        element.setAttribute("disabled", true);
      });
    }
  };

  const handleSubmit = () => {};
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
                  <div className="input-group required mb-3">
                    <span className="input-group-text">@</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      name="username"
                      required
                      // onChange={userNa}
                    />
                  </div>
                  <div className="input-group required mb-3">
                    <span className="input-group-text">Email</span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="iamcool@gmail.com"
                      aria-label="email"
                      name="email"
                      required
                    />
                  </div>
                  <div className="input-group required mb-3">
                    <span className="input-group-text">Password</span>
                    <input
                      type="text"
                      className="form-control"
                      name="pass"
                      aria-label="password"
                      placeholder="9 digits complex password"
                      required
                      maxLength={9}
                    />
                  </div>
                  <select
                    className="form-select mb-3 required"
                    aria-label="Default select example"
                    multiple
                    defaultValue={["Explorer"]}
                    name="tags"
                    required
                  >
                    <option disabled value="Select Multiple">
                      What describes you the best? (Select Multiple)
                    </option>
                    <option value="Explorer">Explorer</option>
                    <option value="Programmer">Programmer</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                  </select>
                  <div className="mb-3 form-check">
                    <label htmlFor="remeber-me">Remember me</label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remeber-me"
                      defaultChecked
                    />
                  </div>
                  <div className="mb-3 form-check form-switch">
                    <label htmlFor="createProfileLater">
                      Create Profile Later
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="createProfileLater"
                      defaultChecked
                      onClick={createProfileLater}
                    />
                  </div>
                  <div className="mb-3">
                    <h2>Create Profile Options:</h2>
                  </div>
                  <div className="mb-3">
                    <div className="input-group mb-3">
                      <label
                        className="input-group-text"
                        htmlFor="inputGroupFile01"
                      >
                        Display Picture
                      </label>
                      <input
                        type="file"
                        className="form-control create-profile"
                        id="inputGroupFile01"
                        name="dp"
                      />
                    </div>
                    <div className="form-floating text-dark">
                      <textarea
                        className="form-control create-profile"
                        placeholder="Description"
                        id="floatingTextarea"
                        name="desc"
                      ></textarea>
                      <label htmlFor="floatingTextarea">
                        Describe yourself (40 words):
                      </label>
                    </div>
                  </div>
                  <div className="bg-dark d-flex justify-content-between align-items-center mb-3 p-3 rounded-2">
                    <input
                      type="submit"
                      value="Sign in"
                      className="btn btn-primary"
                      onSubmit={() => handleSubmit()}
                    />
                  </div>
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
