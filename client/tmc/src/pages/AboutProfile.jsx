import React, { useRef, useState } from "react";
import useLoader from "../Hooks/useLoader";
import Logo from "./components/Logo";
import TagsInput from "react-tagsinput";

export default function AboutProfile() {
  useLoader();
  const [activeTab, setActiveTab] = useState("Edit Profile");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    desc: "",
    tags: [],
    dp: "",
  });
  const desc = useRef();
  const place = useRef();
  // Declaring initial field validtators variables to be invalid
  const [validUname, setValidUname] = useState(false);
  const validate = (e) => {
    const userRegex = /[A-Za-z]+[A-Za-z0-9_-]/i;
    // const passRegex =
    //   /^(?=.*[A-Z])(?=.*[@!#$%^&*()<>?/|}{~:`,./:;'" +=])(?=.*[0-9])(?=.*[a-z]).{9}$/;
    const specialChars = /[@!#$%^&*()<>?/|}{~:`,./:;'" +=]/;

    if (e.target.name === "username") {
      const valid = e.target.parentNode.children[2];
      const invalid = e.target.parentNode.children[3];

      // Checks if the username length is more than 3
      if (e.target.value.length < 3) {
        valid.style.display = "none";
        invalid.style.display = "block";
      } else {
        // Checks if the username matches the regex pattern
        if (RegExp(userRegex).test(e.target.value)) {
          // Checks if the username has invalid characters
          if (RegExp(specialChars).test(e.target.value)) {
            valid.style.display = "none";
            invalid.style.display = "block";
          } else {
            // Checks if the username contains reseved keywords
            if (
              e.target.value.match(/op/gi) != null ||
              e.target.value.match(/admin/gi) != null ||
              e.target.value.match(/super/gi) != null
            ) {
              valid.style.display = "none";
              invalid.style.display = "block";
            } else {
              // Checks if the username already exists if it does it says to pick another username
              setUserData({
                ...userData,
                username: e.target.value,
                joinDate: new Date().toDateString(),
              });
              invalid.style.display = "none";
              valid.style.display = "block";
              setValidUname(true);
            }
          }
        }
      }
    }
    // To Check if the email already exists if it does tell to login instead
    else if (e.target.name === "email") {
      // setValidEmail(true);
      setUserData({ ...userData, email: e.target.value });
    }
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  function updateProfile(e) {
    e.preventDefault();
    // If anything is invalid
    if (validUname === false) {
      console.log(`
      Valid username :${validUname}\n
      `);
      place.current.innerHTML =
        "Invalid Sign up (Please refer to the warnings..)";
    }
    if (userData.tags.length < 3) {
      place.current.innerHTML = "Tags are less";
    } else {
    }
  }
  return (
    <div className="gradient-bg pt-4">
      <div className="container mt-3 mb-3">
        <h1>Profile Management</h1>
        <div className="profile-container">
          <div className="profile-sidebar">
            <div>
              <Logo />
            </div>
            <div
              className={`profile-tab ${
                activeTab === "Edit Profile" ? "active" : ""
              }`}
              onClick={() => handleTabClick("Edit Profile")}
            >
              Edit Profile
            </div>
            <div
              className={`profile-tab ${
                activeTab === "Log-out" ? "active" : ""
              }`}
              onClick={() => handleTabClick("Log-out")}
            >
              Log-out
            </div>
            <div
              className={`profile-tab ${
                activeTab === "Login with New Account" ? "active" : ""
              }`}
              onClick={() => handleTabClick("Login with New Account")}
            >
              Login with New Account
            </div>
            <div
              className={`profile-tab ${
                activeTab === "Other Info" ? "active" : ""
              }`}
              onClick={() => handleTabClick("Other Info")}
            >
              Other Info
            </div>
            <div
              className={`profile-tab ${
                activeTab === "privacy-policy" ? "active" : ""
              }`}
              onClick={() => handleTabClick("privacy-policy")}
            >
              Privacy policy
            </div>
          </div>
          <div className="profile-content">
            {activeTab === "Edit Profile" && (
              <div>
                <h2>Edit Profile</h2>
                <form
                  onSubmit={updateProfile}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <div className="input-group mb-3">
                    <span className="input-group-text">@</span>
                    <input
                      type="text"
                      className="form-control input"
                      placeholder="Username"
                      aria-label="Username"
                      name="username"
                      maxLength={14}
                      required
                      onChange={validate}
                    />
                    <div className="valid-feedback">It suits you!</div>
                    <div className="invalid-feedback">
                      The username must be more than 2 characters long, it
                      Should follow the variable declaration rules of python and
                      There should be no{" "}
                      <a href="/about#reserved-keywords">reserved keywords</a>{" "}
                      used. Examples of good usernames: (Idris_vohra, idris_987,
                      idris987, idris)
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <label className="input-group-text">Keywords:</label>
                    <TagsInput
                      value={userData.tags}
                      onChange={(tags) => {
                        setUserData({ ...userData, tags: tags });
                      }}
                      className="input form-control"
                      onlyUnique={true}
                      maxTags={4}
                      addOnPaste={true}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="file-input">
                      <div className="file-input-title">Display Picture</div>
                      <div className="file-input-paragraph">
                        Recomended size (512 x 512)px
                      </div>
                      <div className="drop-container">
                        <div className="drop-title">Drop An Image</div>
                        or
                        <input
                          type="file"
                          required
                          multiple={false}
                          onChange={(e) =>
                            setUserData({ ...userData, dp: e.target.files[0] })
                          }
                          accept="image/png, image/jpeg, image/webp"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input-group text-dark mb-3">
                    <label
                      htmlFor="describe-you"
                      className="input-group-text w-25"
                    >
                      Bio:
                    </label>
                    <textarea
                      className="form-control input"
                      placeholder="Description (250 words)"
                      id="describe-you"
                      name="desc"
                      required
                      maxLength={250}
                      minLength={30}
                      value={userData.desc}
                      onChange={(e) => {
                        setUserData({ ...userData, desc: e.target.value });
                        let progressbar =
                          e.target.parentElement.children[2].children[0];
                        progressbar.style.width =
                          e.target.value.length / 2.5 + "%";
                        // console.log(e.target.parentElement.children[2].children);
                      }}
                      ref={desc}
                    ></textarea>
                    <div
                      className="progress mt-2 bg-dark"
                      style={{ height: "6px", width: "100%" }}
                    >
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-dark d-flex justify-content-between align-items-center mb-3 p-3 rounded-2">
                    <input
                      type="submit"
                      value="Sign in"
                      className="btn btn-primary"
                    />
                    <span className="ms-2 text-danger" ref={place}></span>
                  </div>
                </form>
              </div>
            )}
            {activeTab === "Log-out" && (
              <div>
                <h2>Log-Out</h2>
              </div>
            )}
            {activeTab === "Login with New Account" && (
              <div>
                <h2>Login with New Account</h2>
              </div>
            )}
            {activeTab === "Other Info" && (
              <div>
                <h2>Other Info</h2>
              </div>
            )}
            {activeTab === "privacy-policy" && (
              <div>
                <h2>Privacy Policy</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
