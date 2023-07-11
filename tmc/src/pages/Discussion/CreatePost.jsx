import React, { useState } from "react";
import useLoader from "../../Hooks/useLoader";
import TagsInput from "react-tagsinput";
import { getCookie } from "../../tools/cookies";
import ScatterBlobs from "../../components/Scattered-blobs";
import hljs from "highlight.js";
import "highlight.js/styles/base16/onedark.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { createPost } from "../../Api/actions";
import NoPage from "../Other/NoPage";

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
    [{ header: [ 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["code-block"],
    ["link"],
    ["clean"],
  ], // Include button in toolbar
};

export default function CreatePost() {
  useLoader();
  const [postData, setPostData] = useState({
    title: "",
    body: "",
    postedBy: getCookie("uid"),
    tags: [],
    slug: "",
  });

  const dispatch = useDispatch();
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
  function post(e) {
    e.preventDefault();
    const invalidFeedbacks = document.querySelectorAll(".invalid-feedback");
    if (postData.title.length < 5) {
      invalidFeedbacks[0].style.display = "block";
    }
    if (postData.tags.length < 3) {
      invalidFeedbacks[1].style.display = "block";
    }
    if (postData.body.length < 15) {
      invalidFeedbacks[2].style.display = "block";
    } else {
      if (postData.slug.length > 3) {
        dispatch(createPost(postData));
        window.history.back();
      }
      document.querySelector(".toast.post-warning").classList.add("show");
    }
  }
  if (getCookie("username") === "") {
    return <NoPage />;
  } else {
    return (
      <div className="mainContent bg-dark text-light p-4 createPost">
        <ScatterBlobs />
        <div
          className="toast post-warning custom align-items-center text-bg-danger border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">Invalid Post Request!</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div className="container rounded-2 border border-2 border-light border-opacity-25 p-3">
        <div
            className="toast align-items-center bg-primary border-0 w-100 show mb-3"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">
                <h6>
                  There are certain things to keep in mind while creating a topic of discussion please checkout <a href="about" className="link2">topic guidelines</a>.
                </h6>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto ms-2"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
          </div>
          <form onSubmit={post}>
            <h2 className="mb-3">Start a new topic to discuss!</h2>
            <div className="mb-3">
              <label htmlFor="post-title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control input"
                id="post-title"
                placeholder="Discussion Title (Under 37 characters)"
                name="title"
                maxLength={36}
                value={postData.title}
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    title: e.target.value,
                    slug: createSlug(e.target.value),
                  })
                }
              />
              <div className="invalid-feedback">The title is too short.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="tags">Add Tags (Atleast 3)</label>
              <TagsInput
                value={postData.tags}
                onChange={(tags) => {
                  setPostData({ ...postData, tags: tags });
                }}
                className="input"
                onlyUnique={true}
                maxTags={4}
                addOnPaste={true}
              />
              <div className="invalid-feedback">
                There should be atleast 3 tags.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="post-body" className="form-label">
                Body{" "}
              </label>
              <ReactQuill
                className="bg-light input"
                value={postData.body}
                onChange={(newValue) =>
                  setPostData({ ...postData, body: newValue })
                }
                modules={modules}
              />
              <div className="invalid-feedback">The body is too short.</div>
            </div>
            <button
              type="submit"
              className="btn btn-primary ps-5 pe-5"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    );
  }
}
