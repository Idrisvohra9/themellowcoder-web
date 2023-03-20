import React, { useState, useRef } from "react";
import useLoader from "../Hooks/useLoader";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createUser } from "../Api/actions";
import { setCookie } from "../tools/cookies";
import Footer from "./components/Footer";
export default function SignUp() {
  useLoader();
  const username = useRef();
  const pass = useRef();
  const re_pass = useRef();
  const email = useRef();
  const tags = [];
  const select = useRef();
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

  // First it validates username and pass:
  const validate = (e) => {
    const userRegex = /[A-Za-z]+[A-Za-z0-9_]/i;
    const passRegex =
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{9}$/;
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
            if (
              e.target.value.indexOf("OP") !== -1 ||
              e.target.value.indexOf("Admin") !== -1 ||
              e.target.value.indexOf("Super") !== -1
            ) {
              valid.style.display = "none";
              invalid.style.display = "block";
            } else {
              invalid.style.display = "none";
              valid.style.display = "block";
            }
          }
        }
      }
    } else if (["pass", "re_pass"].includes(e.target.name)) {
      const valid = re_pass.current.parentNode.children[3];
      const invalid = re_pass.current.parentNode.children[4];
      if (e.target.value.length < 9) {
        invalid.style.display = "block";
        valid.style.display = "none";
      } else {
        if (RegExp(passRegex).test(e.target.value)) {
          if (pass.current.value === re_pass.current.value) {
            invalid.style.display = "none";
            valid.style.display = "block";
          }
        }
      }
    } else if (e.target.name === "email") {
    } else if (e.target.name === "desc") {
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
    let options = select.current && select.current.options;
    let opt;
    if (
      username.current.value === "" &&
      pass.current.value === "" &&
      email.current.value === "" &&
      desc.current.value === "" &&
      select.current.value === ""
    ) {
      place.current.innerHTML = "Form fields are empty!";
    } else {
      for (var i = 0; i < options.length; i++) {
        opt = options[i];

        if (opt.selected) {
          tags.push(opt.value || opt.text);
        }
      }
      let base64 = userData.dp;

      setUserData({
        username: username.current.value,
        email: email.current.value,
        password: pass.current.value,
        desc: desc.current.value,
        joinDate: new Date().toDateString(),
        tags: tags,
        dp: base64,
      });
      if (
        userData.username === "" &&
        userData.password === "" &&
        userData.email === ""
      ) {
        place.current.innerHTML = "Click again for good luck!";
      } else {
        dispatch(createUser(userData));
        setCookie("username", userData.username);
        window.history.back();
      }
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
                  <div className="input-group required mb-3">
                    <span className="input-group-text">@</span>
                    <input
                      type="text"
                      className="form-control input"
                      placeholder="Username"
                      aria-label="Username"
                      name="username"
                      required
                      ref={username}
                      onChange={validate}
                    />
                    <div className="valid-feedback">It suits you!</div>
                    <div className="invalid-feedback">
                      The username must be more than 2 characters long, it
                      Should follow the variable declaration rules of python.
                      Examples of good usernames: (" Idris_vohra, idris_987,
                      idris987, idris ")
                    </div>
                  </div>
                  <div className="input-group required mb-3">
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
                  <div className="input-group required mb-3">
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
                  <div className="input-group required mb-3">
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
                      The password must be 9 digits long and complex and should
                      match the above password.
                    </div>
                  </div>
                  <select
                    className="form-select mb-3 required input"
                    aria-label="Default select example"
                    multiple
                    name="tags"
                    required
                    ref={select}
                  >
                    <option disabled value="Select Multiple">
                      What describes you the best? (Select Multiple)
                    </option>
                    <option value="Explorer">Just an explorer</option>
                    <option value="Programmer">A Programmer</option>
                    <option value="Student">A Student</option>
                    <option value="Teacher">A Teacher</option>
                  </select>
                  <div className="mb-3 form-check">
                    <label htmlFor="remeber-me">Remember me</label>
                    <input
                      type="checkbox"
                      className="form-check-input bg-dark"
                      id="remeber-me"
                      defaultChecked
                    />
                  </div>
                  <div className="mb-3 required">
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
                  <div className="form-floating text-dark mb-3 required">
                    <textarea
                      className="form-control input"
                      placeholder="Description"
                      id="floatingTextarea"
                      name="desc"
                      ref={desc}
                      required
                      maxLength="200"
                    ></textarea>
                    <label htmlFor="floatingTextarea" className="text-info">
                      Describe yourself (200 words):
                    </label>
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
