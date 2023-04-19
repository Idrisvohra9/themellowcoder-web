import React, { useState, useRef, useEffect } from "react";
import useLoader from "../Hooks/useLoader";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createUser } from "../Api/actions";
import TagsInput from "react-tagsinput";
import { setCookie } from "../tools/cookies";
import { sendOtp, welcomeMail } from "../tools/Email";
import { Link } from "react-router-dom";
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
  let otp;
  // Declaring initial field validtators variables to be invalid
  const [validUname, setValidUname] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPass, setValidPass] = useState(false);

  // First it validates username and pass:
  const validate = (e) => {
    const userRegex = /[A-Za-z]+[A-Za-z0-9_]/i;
    const passRegex =
      /^(?=.*[A-Z])(?=.*[@!#$%^&*()<>?/|}{~:`,./:;'" +=])(?=.*[0-9])(?=.*[a-z]).{9}$/;
    const specialChars = /[@!#$%^&*()<>?/|}{~:`,./:;'" +=-]/;

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    // If anything is invalid
    if (validEmail === false || validUname === false || validPass === false) {
      console.log(`
      Valid username :${validUname}\n
      Valid Email : ${validEmail}\n
      Valid Password : ${validPass}
      `);
      place.current.innerHTML = "Invalid Sign up (Please refer to the warnings..)";
    } if (userData.tags.length < 3) {
      place.current.innerHTML = "Tags are less";
    } else {
      // Send otp to the email for confirmation
      otp = await sendOtp(userData.email);

      document.querySelector(".trigger-otp").click();
    }
  };
  function registerUser() {
    let OtpFields = document.querySelectorAll('input[type="number"]');
    let enteredOtp = "";
    OtpFields = [...OtpFields];
    OtpFields.forEach((field) => {
      enteredOtp += field.value;
    });
    enteredOtp = Number(enteredOtp);
    if (enteredOtp === otp) {
      dispatch(createUser(userData));
      setCookie("username", userData.username);
      welcomeMail(userData.email, userData.username);
      window.history.back();
    } else {
      // Remains
    }
  }
  useEffect(() => {
    let in1 = document.getElementById("otc-1"),
      ins = document.querySelectorAll('input[type="number"]'),
      splitNumber = function (e) {
        let data = e.data || e.target.value; // Chrome doesn't get the e.data, it's always empty, fallback to value then.
        if (!data) return; // Shouldn't happen, just in case.
        if (data.length === 1) return; // Here is a normal behavior, not a paste action.

        popuNext(e.target, data);
        //for (i = 0; i < data.length; i++ ) { ins[i].value = data[i]; }
      },
      popuNext = function (el, data) {
        el.value = data[0]; // Apply first item to first input
        data = data.substring(1); // remove the first char.
        if (el.nextElementSibling && data.length) {
          // Do the same with the next element and next data
          popuNext(el.nextElementSibling, data);
        }
      };

    ins.forEach(function (input) {
      /**
       * Control on keyup to catch what the user intent to do.
       * I could have check for numeric key only here, but I didn't.
       */
      input.addEventListener("keyup", function (e) {
        // Break if Shift, Tab, CMD, Option, Control.
        if (
          e.keyCode === 16 ||
          e.keyCode === 9 ||
          e.keyCode === 224 ||
          e.keyCode === 18 ||
          e.keyCode === 17
        ) {
          return;
        }

        // On Backspace or left arrow, go to the previous field.
        if (
          (e.keyCode === 8 || e.keyCode === 37) &&
          this.previousElementSibling &&
          this.previousElementSibling.tagName === "INPUT"
        ) {
          this.previousElementSibling.select();
        } else if (e.keyCode !== 8 && this.nextElementSibling) {
          this.nextElementSibling.select();
        }

        // If the target is populated to quickly, value length can be > 1
        if (e.target.value.length > 1) {
          splitNumber(e);
        }
      });

      /**
       * Better control on Focus
       * - don't allow focus on other field if the first one is empty
       * - don't allow focus on field if the previous one if empty (debatable)
       * - get the focus on the first empty field
       */
      input.addEventListener("focus", function (e) {
        // If the focus element is the first one, do nothing
        if (this === in1) return;

        // If value of input 1 is empty, focus it.
        if (in1.value === "") {
          in1.focus();
        }

        // If value of a previous input is empty, focus it.
        // To remove if you don't wanna force user respecting the fields order.
        if (this.previousElementSibling.value === "") {
          this.previousElementSibling.focus();
        }
      });
    });

    /**
     * Handle copy/paste of a big number.
     * It catches the value pasted on the first field and spread it into the inputs.
     */
    in1.addEventListener("input", splitNumber);
  });
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
                        // validate(event)
                      }}
                      onlyUnique={true}
                      maxTags={4}
                      className="input form-control"
                      addOnBlur={true}
                      addOnPaste={true}
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
                {/* Otp model trigger button */}
                <button
                  className="trigger-otp d-none"
                  data-bs-toggle="modal"
                  data-bs-target="#otp-confirm"
                ></button>
                <div
                  className="modal"
                  id="otp-confirm"
                  tabIndex="-1"
                  data-bs-keyboard="false"
                >
                  <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">Email confirmation</h4>
                      </div>
                      <div className="modal-body">
                        <p>
                          We just sent an email to <b>{userData.email}</b> to
                          confirm your account creation please enter the OTP.
                        </p>
                        <form className="otc" name="one-time-code" action="#">
                          <div>
                            <label htmlFor="otc-1">Number 1</label>
                            <label htmlFor="otc-2">Number 2</label>
                            <label htmlFor="otc-3">Number 3</label>
                            <label htmlFor="otc-4">Number 4</label>
                            <label htmlFor="otc-5">Number 5</label>
                            <label htmlFor="otc-6">Number 6</label>

                            <div>
                              <input
                                type="number"
                                pattern="[0-9]*"
                                defaultValue=""
                                inputtype="numeric"
                                autoComplete="one-time-code"
                                id="otc-1"
                                required
                              />

                              <input
                                type="number"
                                pattern="[0-9]*"
                                min="0"
                                max="9"
                                maxLength="1"
                                defaultValue=""
                                inputtype="numeric"
                                id="otc-2"
                                required
                              />
                              <input
                                type="number"
                                pattern="[0-9]*"
                                min="0"
                                max="9"
                                maxLength="1"
                                defaultValue=""
                                inputtype="numeric"
                                id="otc-3"
                                required
                              />
                              <input
                                type="number"
                                pattern="[0-9]*"
                                min="0"
                                max="9"
                                maxLength="1"
                                defaultValue=""
                                inputtype="numeric"
                                id="otc-4"
                                required
                              />
                              <input
                                type="number"
                                pattern="[0-9]*"
                                min="0"
                                max="9"
                                maxLength="1"
                                defaultValue=""
                                inputtype="numeric"
                                id="otc-5"
                                required
                              />
                              <input
                                type="number"
                                pattern="[0-9]*"
                                min="0"
                                max="9"
                                maxLength="1"
                                defaultValue=""
                                inputtype="numeric"
                                id="otc-6"
                                required
                              />
                            </div>
                          </div>
                        </form>
                        <div className="d-flex justify-content-evenly align-items-center">
                          <button
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            Change email
                          </button>
                          <Link to="" className="btn btn-primary">
                            Resend Email
                          </Link>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => registerUser()}
                        >
                          Confirm
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
                          Some representative placeholder content htmlFor the
                          first slide.
                        </p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src="" className="d-block w-100" alt="" />
                      <div className="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>
                          Some representative placeholder content htmlFor the
                          second slide.
                        </p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src="" className="d-block w-100" alt="" />
                      <div className="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>
                          Some representative placeholder content htmlFor the
                          third slide.
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
