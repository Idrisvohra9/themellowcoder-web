import React, { useState } from "react";
import { getCookie } from "../tools/cookies";
// import TagsInput from "react-tagsinput";
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
  const dispatch = useDispatch()
  const [storyData, setStoryData] = useState({
    title: "",
    body: "",
    image: "",
    postedBy: getCookie("uid"),
    type: "",
  });
  function post(e) {
    e.preventDefault();
    console.log(storyData);
  }
  if (getCookie("username") === "") {
    return <NoPage />;
  } else {
    return (
      <div>
        <div className="mainContent bg-dark text-light p-4 createPost h-100">
          <ScatterBlobs />
          <div className="container rounded-2 border border-2 border-light border-opacity-25 p-3">
            <form onSubmit={post} className="d-flex flex-column justify-content-center align-items-center">
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
                  maxLength={36}
                  value={storyData.title}
                  onChange={(e) =>
                    setStoryData({ ...storyData, title: e.target.value })
                  }
                />
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
              </div>
              <div className="mb-3">
                <label htmlFor="tags">Select A type</label>
                
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
