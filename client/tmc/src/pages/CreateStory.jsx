import React, {useState} from "react";
import { getCookie } from "../tools/cookies";
import TagsInput from "react-tagsinput";
import useLoader from "../Hooks/useLoader";
import ScatterBlobs from "./components/Scattered-blobs";
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
              <label
                htmlFor="post-body"
                className="form-label"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                Body{" "}
                <svg
                  viewBox="0 0 490 490"
                  fill="#d8d4cf"
                  onClick={() => {
                    document
                      .querySelector(".createPost label .tmc-tooltip")
                      .classList.toggle("show");
                  }}
                >
                  <path d="M245 490C109.9 490 0 380.1 0 245S109.9 0 245 0s245 109.9 245 245-109.9 245-245 245zm0-428C144.1 62 62 144.1 62 245s82.1 183 183 183 183-82.1 183-183S345.9 62 245 62z" />
                  <circle cx="241.3" cy="159.2" r="29.1" />
                  <path d="M285.1 359.9h-80.2V321h14.7v-66.2h-14.5v-38.9h65.3V321h14.7z" />
                </svg>
                <span className="bg-white text-dark rounded-2 ms-2 tmc-tooltip">
                  To know more about typing in markdown, see{" "}
                  <a href="" className="text-dark">
                    Markdown typing
                  </a>
                  .
                </span>
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
