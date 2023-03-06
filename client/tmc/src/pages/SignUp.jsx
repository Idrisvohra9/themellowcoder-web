import React, { useState, useRef } from "react";
import useLoader from "../Hooks/useLoader";
import FileBase from "react-file-base64";
// import { useDispatch } from "react-redux";

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
  // const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    pass: "",
    tags: [],
    desc: "",
    dp: "",
  });

  const createProfileFields = document.querySelectorAll(".create-profile");
  Array.from(createProfileFields).forEach((element) => {
    element.setAttribute("disabled", true);
  });
  // First it validates username and pass:
  const validate = (e) => {
    const userRegex = /[A-Za-z]+[A-Za-z0-9_?]+/i;
    const passRegex = /[A-Za-z]+[A-Za-z0-9_?]+/i;

    if(e.target.name === "username") {
      const valid = e.target.parentNode.children[2];
      const invalid = e.target.parentNode.children[3];
      if(e.target.value.length < 3){
        invalid.style.display = "block";
      }
      else{
        if(RegExp(userRegex).test(e.target.value)) {
          invalid.style.display = "none";
          valid.style.display = "block";
        }
      }
    }
    else if(["pass", "re_pass"].includes(e.target.name)) {
      const valid = re_pass.current.parentNode.children[2];
      const invalid = re_pass.current.parentNode.children[3];
      // if(e.target.value.length )
    }
    else if (e.target.name === "email"){

    }
    else if(e.target.name === "desc"){

    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let options = select.current && select.current.options;
    let opt;
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
      pass: pass.current.value,
      tags: tags,
      desc: desc.current.value,
      dp: base64,
    });
    if (
      userData.username === "" &&
      userData.pass === "" &&
      userData.email === ""
    ) {
      place.current.innerHTML = "Please click the submit button again.";
    }
    console.log(userData);
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
                <form action="" className="mt-3 needs-validation" noValidate>
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
                      The username must be more than 2 characters long, it Should
                      follow the variable declaration rules of python. Examples of good usernames: (" Idris_vohra, idris_987, __idris, idris ")
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
                      type="text"
                      className="form-control input"
                      name="pass"
                      aria-label="password"
                      placeholder="9 digits complex password"
                      required
                      ref={pass}
                      maxLength={9}
                      onChange={validate}
                    />
                  </div>
                  <div className="input-group required mb-3">
                    <span className="input-group-text">Retype Password</span>
                    <input
                      type="text"
                      className="form-control input"
                      name="re_pass"
                      aria-label="password"
                      placeholder="Should match the above password"
                      required
                      ref={re_pass}
                      maxLength={9}
                      onChange={validate}
                    />
                    <div className="valid-feedback">Good Password</div>
                    <div className="invalid-feedback">
                      The password must be 9 digits long and complex and should match the above password.
                    </div>
                  </div>
                  <select
                    className="form-select mb-3 required input"
                    aria-label="Default select example"
                    multiple
                    defaultValue={["Explorer"]}
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
                  <div className="mb-3 bg-dark rounded-2 p-2">
                    <label
                      className="form-label me-3"
                      htmlFor="inputGroupFile01"
                    >
                      Display Picture
                    </label>
                    <FileBase
                      type="file"
                      multiple={false}
                      className="form-control"
                      id="inputGroupFile01"
                      name="dp"
                      onDone={({ base64 }) =>
                        setUserData({ ...userData, dp: base64 })
                      }
                    />
                  </div>
                  <div className="form-floating text-dark mb-3">
                    <textarea
                      className="form-control input"
                      placeholder="Description"
                      id="floatingTextarea"
                      name="desc"
                      ref={desc}
                    ></textarea>
                    <label htmlFor="floatingTextarea" className="text-info">
                      Describe yourself (40 words):
                    </label>
                  </div>
                  <div className="bg-dark d-flex justify-content-between align-items-center mb-3 p-3 rounded-2">
                    <input
                      type="submit"
                      value="Sign in"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    />
                    <span className="ms-2 text-danger" ref={place}></span>
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
