import React, { useState } from "react";
import { getCookie, isLoggedIn } from "../tools/cookies";
import useLoader from "../Hooks/useLoader";
import ScatterBlobs from "./components/Scattered-blobs";
import hljs from "highlight.js";
import "highlight.js/styles/base16/onedark.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { createStory } from "../Api/actions";
import NoPage from "./NoPage";

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

export default function CreateStory() {
  useLoader();
  const dispatch = useDispatch();
  const [storyData, setStoryData] = useState({
    title: "",
    body: "",
    image: "",
    postedBy: getCookie("uid"),
    type: "fun-stuff",
  });
  function post(e) {
    e.preventDefault();
    const invalidFeedbacks = document.querySelectorAll(".invalid-feedback");
    if (storyData.title.length < 5) {
      invalidFeedbacks[0].style.display = "block";
    }
    if (!storyData.image.type.includes("image/")) {
      invalidFeedbacks[1].style.display = "block";
    } else {
      const keys = Object.keys(storyData);
      const formData = new FormData();
      keys.forEach((key) => {
        formData.append(key, storyData[key]);
      });
      dispatch(createStory(formData));
      console.log(storyData);
      const toast = document.querySelector(".toast.story-posted");
      toast.classList.add("show");
      toast.querySelector(
        ".toast-body"
      ).innerHTML += ` <a href="/stories#${storyData.type}" class="link2">${storyData.type}</a>`;
    }
  }
  if (!isLoggedIn()) {
    return <NoPage />;
  } else {
    return (
      <div>
        <div className="mainContent bg-dark text-light p-4 createPost h-100">
          <ScatterBlobs />
          <div className="container rounded-2 border border-2 border-light border-opacity-25 p-3">
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
              <h2 className="mb-3">Post a new Story!</h2>
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
                  value={storyData.title}
                  onChange={(e) =>
                    setStoryData({ ...storyData, title: e.target.value })
                  }
                />

                <div className="invalid-feedback">The title is too short.</div>
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
                        setStoryData({ ...storyData, image: e.target.files[0] })
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
                      setStoryData({ ...storyData, type: e.target.value })
                    }
                    value={storyData.type}
                  >
                    <option value="progress-check-ins">Project Check-in</option>
                    <option value="tech-roundups">Technology Roundup</option>
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
                    setStoryData({ ...storyData, body: newValue })
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
    );
  }
}
