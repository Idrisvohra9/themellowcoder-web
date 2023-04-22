import React, { useState } from "react";
import useLoader from "../Hooks/useLoader";
import TagsInput from "react-tagsinput";
import { getCookie } from "../tools/cookies";
import ScatterBlobs from "./components/Scattered-blobs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { useDispatch } from "react-redux";
// import { createPost } from "../Api/actions";

export default function CreatePost() {
  useLoader();
  // const [tags, setTags] = useState([]);
  const [postData, setPostData] = useState({
    title: "",
    body: "",
    postedBy: getCookie("username"),
    tags: [],
    slug: "",
  });
  function createSlug(title) {
    const regex = /[^a-zA-Z0-9_-]/g; // Replacing the special characters excluding hyphens and underscore with hyphens and
    // Replace multiple consecutive hyphens with a single hyphen
    const hyphenRegex = /-+/g;
    const slug = title.replace(regex, "-").replace(hyphenRegex, "-");
    return slug;
  }
  function post(e) {
    e.preventDefault();
    // setPostData({...postData, slug:createSlug(postData.title)});
    console.log(postData);
  }
  return (
    <div className="mainContent bg-dark text-light p-4 createPost">
      <ScatterBlobs />
      <div className="container rounded-2 border border-2 border-light border-opacity-25 p-3">
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
              placeholder="Discussion Title"
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
          </div>
          <div className="mb-3">
            <label htmlFor="tags">Add Tags</label>
            <TagsInput
              value={postData.tags}
              onChange={(tags) => {
                setPostData({ ...postData, tags: tags });
              }}
              className="input"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="post-body"
              className="form-label"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
            >
              Body{" "}
            </label>
            <ReactQuill
              className="input"
              onChange={(newValue) =>
                setPostData({ ...postData, body: newValue })
              }
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
