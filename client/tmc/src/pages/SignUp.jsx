import React, { useState, useRef } from "react";
import useLoader from "../Hooks/useLoader";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createUser } from "../Api/actions";
import TagsInput from "react-tagsinput";
import { setCookie } from "../tools/cookies";
import { Link } from "react-router-dom";
import {sendOTP} from "../tools/sendEmail"
import Footer from "./components/Footer";
export default function SignUp() {
  useLoader();
  const username = useRef();
  const pass = useRef();
  const re_pass = useRef();
  const email = useRef();
  const desc = useRef();
  const place = useRef();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    desc: "",
    joinDate: "",
    tags: [],
    dp: "",
  });
  // Declaring initial field validtators variables to be invalid
  const [validUname, setValidUname] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPass, setValidPass] = useState(false);

  // First it validates username and pass:
  const validate = (e) => {
    const userRegex = /[A-Za-z]+[A-Za-z0-9_]/i;
    const passRegex =
      /^(?=.*[A-Z])(?=.*[@!#$%^&*()<>?/|}{~:`,./:;'" +=])(?=.*[0-9])(?=.*[a-z]).{9}$/;
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

      // Checks if the target event is either pass field or re_pass field
    } else if (["pass", "re_pass"].includes(e.target.name)) {
      // Valid message Element
      const valid = re_pass.current.parentNode.children[3];
      // Invalid message Element
      const invalid = re_pass.current.parentNode.children[4];
      // Should be equal to 9 digits
      if (e.target.value.length < 9) {
        invalid.style.display = "block";
        valid.style.display = "none";
        // If proper length check if the password passes the regexp test
      } else {
        if (RegExp(passRegex).test(e.target.value)) {
          // If it passes the regexp test check if both the fields have same value:
          if (pass.current.value === re_pass.current.value) {
            invalid.style.display = "none";
            valid.style.display = "block";
            setValidPass(true);
            setUserData({ ...userData, password: e.target.value });
          }
        }
      }
      // To Check if the email already exists if it does tell to login instead
    } else if (e.target.name === "email") {
      setValidEmail(true);
      setUserData({ ...userData, email: e.target.value });
    }
  };

  const showHide = (e) => {
    let target = e.target.parentNode.children[1];

    if (target.type === "password") {
      target.type = "text";
    } else {
      target.type = "password";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // If anything is invalid
    if (validEmail === false || validUname === false || validPass === false) {
      console.log(`
      Valid username :${validUname}\n
      Valid Email : ${validEmail}\n
      Valid Password : ${validPass}
      `);
      place.current.innerHTML = "Invalid Sign up";
    } else {
      //   dispatch(createUser(userData));
      //   setCookie("username", userData.username);
      //   window.history.back();
      // Send otp to the email for confirmation
      let otp = sendOTP(userData.email);
      console.log(userData);
    }
  };
  return (
    <div className="mainContent">
      <div className="gradient-bg">
        <div className="container">
          <div className="d-flex w-100 flex-shrink-1 pt-4">
            <div className="w-50">
              <div className="d-flex justify-content-center flex-column">
                <h1>Sign-up, and join the community!</h1>
                <p>We are glad to have you here!</p>
                <form className="mt-3 needs-validation" onSubmit={handleSubmit}>
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
                      ref={username}
                      onChange={validate}
                    />
                    <div className="valid-feedback">It suits you!</div>
                    <div className="invalid-feedback">
                      The username must be more than 2 characters long, it
                      Should follow the variable declaration rules of python and
                      there should be no{" "}
                      <a href="/about#reserved-keywords">reserved keywords</a>{" "}
                      used. Examples of good usernames: (Idris_vohra, idris_987,
                      idris987, idris)
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Email</span>
                    <input
                      type="email"
                      className="form-control input"
                      placeholder="iamcool@gmail.com"
                      aria-label="email"
                      name="email"
                      ref={email}
                      required
                      onChange={validate}
                    />
                  </div>
                  <div className="invalid-feedback">
                    The email already exists consider login.
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Password</span>
                    <input
                      type="password"
                      className="form-control input"
                      name="pass"
                      aria-label="password"
                      placeholder="9 digits complex password"
                      required
                      ref={pass}
                      maxLength={9}
                      onChange={validate}
                    />
                    <span
                      className="input-group-text c-point"
                      onClick={showHide}
                    >
                      👁️
                    </span>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Retype Password</span>
                    <input
                      type="password"
                      className="form-control input"
                      name="re_pass"
                      aria-label="password"
                      placeholder="Should match the above password"
                      required
                      ref={re_pass}
                      maxLength={9}
                      onChange={validate}
                    />
                    <span
                      className="input-group-text c-point"
                      onClick={showHide}
                    >
                      👁️
                    </span>
                    <div className="valid-feedback">Good Password</div>
                    <div className="invalid-feedback">
                      The password must be 9 digits long and complex (i.e.
                      Should contain uppercase and lowercase letters, numbers
                      and special characters) and should match the above
                      password.
                    </div>
                  </div>
                  <div className="required mb-3 tags">
                    <label className="input-group-text">
                      Type three keywords that may describe you (Enter to
                      separate)
                    </label>
                    <TagsInput
                      value={userData.tags}
                      onChange={(tags) => {
                        setUserData({ ...userData, tags: tags });
                      }}
                      className="input form-control"
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <label htmlFor="remeber-me">Remember me</label>
                    <input
                      type="checkbox"
                      className="form-check-input bg-dark"
                      id="remeber-me"
                      defaultChecked
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
                        <FileBase
                          type="file"
                          required
                          multiple={false}
                          className="form-control"
                          name="dp"
                          onDone={({ base64 }) =>
                            setUserData({ ...userData, dp: base64 })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input-group text-dark mb-3">
                    <label
                      htmlFor="describe-you"
                      className="input-group-text w-25"
                    >
                      Describe yourself:
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
                <div className="modal fade" id="oopsie-modal">
                  <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">Email confirmation</h4>
                      </div>
                      <div className="modal-body">
                        <Link to="">Change email</Link>
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
            </div>
            <div className="w-50">
              <div className="container">
                <div
                  id="carouselExampleCaptions"
                  className="carousel slide"
                  data-bs-ride="false"
                >
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src="" className="d-block w-100" alt="" />
                      <div className="carousel-caption d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>
                          Some representative placeholder content for the first
                          slide.
                        </p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src="" className="d-block w-100" alt="" />
                      <div className="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>
                          Some representative placeholder content for the second
                          slide.
                        </p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src="" className="d-block w-100" alt="" />
                      <div className="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>
                          Some representative placeholder content for the third
                          slide.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
