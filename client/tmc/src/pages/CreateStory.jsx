import React, { useState } from "react";
import { getCookie } from "../tools/cookies";
import TagsInput from "react-tagsinput";
import useLoader from "../Hooks/useLoader";
import ScatterBlobs from "./components/Scattered-blobs";
import NoPage from "./NoPage";

export default function CreateStory() {
  useLoader();
  const [postData, setPostData] = useState({
    title: "",
    body: "",
    postedBy: getCookie("username"),
    tags: [],
    slug: "",
  });
  function post(e) {
    e.preventDefault();
    console.log(postData);
  }
  if (getCookie("username") === "") {
    return <NoPage />;
  } else {
    return (
      <div>
        <div className="mainContent bg-dark text-light p-4 createPost">
          <ScatterBlobs />
          <div className="container rounded-2 border border-2 border-light border-opacity-25 p-3">
            <form onSubmit={post}>
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
                  value={postData.title}
                  onChange={(e) =>
                    setPostData({ ...postData, title: e.target.value })
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
                <label htmlFor="post-body" className="form-label">
                  Body{" "}
                </label>
                <textarea
                  className="form-control input"
                  id="post-body"
                  rows="3"
                  placeholder="You can use markdown typing and also html elements for creating the post body."
                  value={postData.body}
                  onChange={(e) =>
                    setPostData({ ...postData, body: e.target.value })
                  }
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
