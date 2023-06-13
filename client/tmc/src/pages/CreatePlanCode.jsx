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
import TagsInput from "react-tagsinput";

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
    projTitle: "",
    projDesc: "",
    tags: [],
    technologies: [],
    cover: "",
    postedBy: getCookie("uid"),
    privacy: "Public",
  });
  function post(e) {
    e.preventDefault();
    const invalidFeedbacks = document.querySelectorAll(".invalid-feedback");
    if (pcData.projTitle.length < 5) {
      invalidFeedbacks[0].style.display = "block";
    }
    if (!pcData.cover.type.includes("cover/")) {
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
      ).innerHTML += ` <a href="/stories#${pcData.privacy}" class="link2">${pcData.privacy}</a>`;
    }
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
                      Project Title:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="post-title"
                      placeholder="Discussion Title"
                      name="title"
                      required
                      maxLength={36}
                      value={pcData.title}
                      onChange={(e) =>
                        setPcData({ ...pcData, projTitle: e.target.value })
                      }
                    />

                    <div className="invalid-feedback">
                      The title is too short.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="post-body" className="form-label">
                      Project Description:
                    </label>

                    <ReactQuill
                      className="form-control"
                      onChange={(newValue) =>
                        setPcData({ ...pcData, projDesc: newValue })
                      }
                      modules={modules}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tags">Add Tags (Atleast 3):</label>
                    <TagsInput
                      value={pcData.tags}
                      onChange={(tags) => {
                        setPcData({ ...pcData, tags: tags });
                      }}
                      className="form-control"
                      onlyUnique={true}
                      maxTags={4}
                      addOnPaste={true}
                    />
                    <div className="invalid-feedback">
                      There should be atleast 3 tags.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tags">Technologies Used:</label>
                    <TagsInput
                      value={pcData.technologies}
                      onChange={(tags) => {
                        setPcData({ ...pcData, technologies: tags });
                      }}
                      className="form-control"
                      onlyUnique={true}
                      maxTags={4}
                      addOnPaste={true}
                    />
                    <div className="invalid-feedback">
                      There should be atleast 3 tags.
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="file-input">
                      <div className="file-input-title">Cover Image</div>
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
                              cover: e.target.files[0],
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
                      Privacy:
                      <select
                        className="form-select mb-3 bg-dark text-light"
                        required
                        onChange={(e) =>
                          setPcData({ ...pcData, privacy: e.target.value })
                        }
                        value={pcData.privacy}
                      >
                        <option value="progress-check-ins">
                          Public
                        </option>
                        <option value="tech-roundups">
                          Private
                        </option>
                      </select>
                    </label>
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
