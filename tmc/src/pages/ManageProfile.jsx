import React, { useEffect, useRef, useState } from "react";
import useLoader from "../Hooks/useLoader";
import Logo from "./components/Logo";
import TagsInput from "react-tagsinput";
import { deleteCookie, getCookie } from "../tools/cookies";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NoPage from "./NoPage";
import DeleteModal from "./components/DeleteModal";

export default function AboutProfile() {
  useLoader();
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("Edit Profile");
  const [userData, setUserData] = useState({
    username: "",
    desc: "",
    tags: [],
    dp: "",
    joinDate: "",
  });
  const desc = useRef();
  const place = useRef();
  // Declaring initial field validtators variables to be invalid
  const [validUname, setValidUname] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}users/${username}`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.log(error));
  }, [username]);
  const validate = (uname) => {
    const userRegex = /[A-Za-z]+[A-Za-z0-9_-]/i;
    const specialChars = /[@!#$%^&*()<>?/|}{~:`,./:;'" +=]/;

    const valid = document.querySelector(".valid-feedback");
    const invalid = document.querySelector(".invalid-feedback");
    // Checks if the username length is more than 3
    if (uname.length < 3) {
      valid.style.display = "none";
      invalid.style.display = "block";
    } else {
      // Checks if the username matches the regex pattern
      if (RegExp(userRegex).test(uname)) {
        // Checks if the username has invalid characters
        if (RegExp(specialChars).test(uname)) {
          valid.style.display = "none";
          invalid.style.display = "block";
        } else {
          // Checks if the username contains reseved keywords
          if (
            uname.match(/op/gi) != null ||
            uname.match(/admin/gi) != null ||
            uname.match(/super/gi) != null
          ) {
            valid.style.display = "none";
            invalid.style.display = "block";
          } else {
            // Checks if the username already exists if it does it says to pick another username
            invalid.style.display = "none";
            valid.style.display = "block";
            setValidUname(true);
          }
        }
      }
    }
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  function updateProfile(e) {
    e.preventDefault();
    if (validUname === false) {
      place.current.innerHTML =
        "Invalid Sign up (Please refer to the warnings..)";
    }
    if (userData.tags.length < 3) {
      place.current.innerHTML = "Tags are less";
    } else {
    }
  }
  function logOut() {
    deleteCookie("username");
    deleteCookie("uid");
    setUserData({});

    window.location.reload();
  }
  function logOutAndClearData() {
    deleteCookie("username");
    deleteCookie("uid");
    deleteCookie("active-theme");
    setUserData({});

    window.location.reload();
  }
  async function logOutAndDelUser() {
    deleteCookie("username");
    deleteCookie("uid");
    deleteCookie("active-theme");
    setUserData({});
    await axios.delete(`${process.env.REACT_APP_SERVER}users/${userData._id}`);
    window.location.reload();
  }
  function requestVerify() {}
  if (getCookie("username") === username) {
    return (
      <div className="gradient-bg pt-4">
        <DeleteModal delFunc={logOutAndDelUser} />

        <div className="container mt-3 mb-3 rounded-2">
          <h1 className="mb-4">Profile Management</h1>
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
                    <div className="input-group w-50 mb-3">
                      <span className="input-group-text">@</span>
                      <input
                        type="text"
                        className="form-control input"
                        placeholder="Username"
                        aria-label="Username"
                        name="username"
                        maxLength={14}
                        required
                        onChange={(e) =>
                          setUserData({ ...userData, username: e.target.value })
                        }
                        value={userData.username}
                      />
                      <div className="valid-feedback">It suits you!</div>
                      <div className="invalid-feedback">
                        The username must be more than 2 characters long, it
                        Should follow the variable declaration rules of python
                        and There should be no{" "}
                        <a href="/about#reserved-keywords">reserved keywords</a>{" "}
                        used. Examples of good usernames: (Idris_vohra,
                        idris_987, idris987, idris)
                      </div>
                      <div className="note">
                        {" "}
                        Don't change your username if it contains reserved
                        words!
                      </div>
                    </div>
                    <div className="input-group w-50 mb-3">
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
                              setUserData({
                                ...userData,
                                dp: e.target.files[0],
                              })
                            }
                            accept="image/png, image/jpeg, image/webp"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="input-group w-50 text-dark mb-3">
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
                    <Link to="/change-password">Change Password</Link>
                    <div className="bg-dark d-flex justify-content-between align-items-center mb-3 p-3 rounded-2">
                      <input
                        type="submit"
                        value="Update Profile"
                        className="btn btn-primary"
                      />
                      <span className="text-danger" ref={place}></span>
                    </div>
                  </form>
                </div>
              )}
              {activeTab === "Log-out" && (
                <div>
                  <h2>Log-Out</h2>
                  <p>Are you sure you want to log out?</p>
                  <button className="btn btn-secondary" onClick={logOut}>
                    Yes, Logout
                  </button>
                  <button
                    className="btn btn-outline-danger ms-2"
                    onClick={logOutAndClearData}
                  >
                    Logout and clear data
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    // onClick={logOutAndClearData}
                    data-bs-toggle="modal"
                    data-bs-target="#delete-modal"
                  >
                    Logout and delete user
                  </button>
                </div>
              )}
              {activeTab === "Login with New Account" && (
                <div>
                  <h2>Login with New Account</h2>
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#loginReg"
                  >
                    New Login
                  </button>
                </div>
              )}
              {activeTab === "Other Info" && (
                <div>
                  <h2 className="mb-3">Other Info</h2>
                  <div className="bg-dark text-light p-2 rounded-3">
                    <h4>Join Date: {userData.joinDate}</h4>
                    <h4>Friends: {userData.friends?.length}</h4>
                    <h4>TMC Silver: {userData.tmcSilver}</h4>
                    <h4>TMC Gold: {userData.tmcGold}</h4>
                    <h4>
                      Verification status:{" "}
                      {userData.isVerified ? "Verified" : "Not verified"}
                    </h4>
                  </div>
                  {userData.isVerified && (
                    <button
                      className="btn btn-dark mt-2"
                      type="button"
                      onClick={requestVerify}
                    >
                      Request Verification
                    </button>
                  )}
                </div>
              )}
              {activeTab === "privacy-policy" && (
                <div>
                  <h2>Privacy Policy</h2>
                  <p>
                    Check out <Link to="">privacy policy</Link>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <NoPage />;
  }
}
