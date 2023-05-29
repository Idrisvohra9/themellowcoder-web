import React, { useState } from "react";
import Head from "./components/Head";
import { getCookie, isLoggedIn } from "../tools/cookies";
import useLoader from "../Hooks/useLoader";
import { useDispatch } from "react-redux";
import NoPage from "./NoPage";
import hljs from "highlight.js";
import "highlight.js/styles/base16/onedark.css";
import ReactQuill from "react-quill";
import { createPC } from "../Api/actions";

hljs.configure({
  languages: ["javascript", "css", "scss", "python", "html", "php"],
});
const highlightCode = (input) => {
  return hljs.highlightAuto(input).value;
};
const modules = {
  syntax: {
    highlight: (text) => highlightCode(text),
  }, // Include syntax module
  toolbar: [
    [{ header: [2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ], // Include button in toolbar
};

export default function CreatePlanCode() {
  useLoader();
  const dispatch = useDispatch();
  const [pcData, setPcData] = useState({
    title: "",
    body: "",
    image: "",
    postedBy: getCookie("uid"),
    type: "fun-stuff",
  });
  function post(e) {
    e.preventDefault();
    const invalidFeedbacks = document.querySelectorAll(".invalid-feedback");
    if (pcData.title.length < 5) {
      invalidFeedbacks[0].style.display = "block";
    }
    if (!pcData.image.type.includes("image/")) {
      invalidFeedbacks[1].style.display = "block";
    } else {
      const keys = Object.keys(pcData);
      const formData = new FormData();
      keys.forEach((key) => {
        formData.append(key, pcData[key]);
      });
      dispatch(createPC(formData));
      console.log(pcData);
      const toast = document.querySelector(".toast.story-posted");
      toast.classList.add("show");
      toast.querySelector(
        ".toast-body"
      ).innerHTML += ` <a href="/stories#${pcData.type}" class="link2">${pcData.type}</a>`;
    }
  }
  function createSlug(title = "") {
    const regex = /[^a-zA-Z0-9_-]/g; // Replacing the special characters excluding hyphens and underscore with hyphens and
    // Replace multiple consecutive hyphens with a single hyphen
    const hyphenRegex = /-+/g;
    let slug = title.replace(regex, "-").replace(hyphenRegex, "-");
    if (slug.endsWith("-")) {
      slug = slug.slice(0, slug.length - 1);
    }
    return slug;
  }
  if (!isLoggedIn()) {
    return <NoPage />;
  } else {
    return (
      <>
        <Head title="Create Plan Code" />
        <div className="create-pc plan-code-bg">
          <div className="pc-gradient"></div>
          <div className="pc-pattern">
            <div className="p-3">
              <div className="mb-3">
                <h1>Enter Project's Initial Details:</h1>
                <hr />
              </div>
              <div className="container rounded-2 border border-2 border-dark border-opacity-25 p-3">
                <div
                  className="toast story-posted custom align-items-center bg-primary border-0"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  <div className="d-flex">
                    <div className="toast-body">
                      Your story is posted and can be found at
                    </div>
                    <button
                      type="button"
                      className="btn-close btn-close-white me-2 m-auto"
                      data-bs-dismiss="toast"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
                <form
                  onSubmit={post}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <div className="mb-3">
                    <label htmlFor="post-title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control input"
                      id="post-title"
                      placeholder="Discussion Title"
                      name="title"
                      required
                      maxLength={36}
                      value={pcData.title}
                      onChange={(e) =>
                        setPcData({ ...pcData, title: e.target.value })
                      }
                    />

                    <div className="invalid-feedback">
                      The title is too short.
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="file-input">
                      <div className="file-input-title">Cover Image</div>
                      <div className="file-input-paragraph">
                        Recomended orientation portrait
                      </div>
                      <div className="drop-container">
                        <div className="drop-title">Drop An Image</div>
                        or
                        <input
                          type="file"
                          required
                          multiple={false}
                          onChange={(e) =>
                            setPcData({
                              ...pcData,
                              image: e.target.files[0],
                            })
                          }
                          accept="image/png, image/jpeg, image/webp"
                        />
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      The file should be an image!
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tags">
                      Select a type
                      <select
                        className="form-select form-select mb-3 bg-dark text-light"
                        required
                        onChange={(e) =>
                          setPcData({ ...pcData, type: e.target.value })
                        }
                        value={pcData.type}
                      >
                        <option value="progress-check-ins">
                          Project Check-in
                        </option>
                        <option value="tech-roundups">
                          Technology Roundup
                        </option>
                        <option value="fun-stuff">Fun Stuff</option>
                        <option value="misc">Misc</option>
                      </select>
                    </label>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="post-body" className="form-label">
                      Body{" "}
                    </label>

                    <ReactQuill
                      className="bg-light input"
                      onChange={(newValue) =>
                        setPcData({ ...pcData, body: newValue })
                      }
                      modules={modules}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary ps-5 pe-5">
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
