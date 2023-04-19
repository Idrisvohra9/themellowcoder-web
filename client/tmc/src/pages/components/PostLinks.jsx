import React from "react";
import { Link } from "react-router-dom";

function PostLink({ title, postBody, tags=["Python","C#"], username, date, postLink }) {
  return (
    <div className="card post-link text-light">
      <div className="card-body">
        <Link to={"/" + postLink} className="card-link">
          <h5 className="card-title">{title}</h5>
        </Link>
        <h6 className="card-subtitle mb-2 text-muted">{username}</h6>
        <div className="d-flex justify-content-start mb-2">
          {tags.map((tag, id) => (
            <span className="post-tag" key={id}>{tag}</span>
          ))}
        </div>
        <p className="card-text">{postBody}</p>
        <div className="d-flex justify-content-end align-items-center">
          <span className="text-muted">{date}</span>
        </div>
      </div>
    </div>
  );
}

PostLink.defaultProps = {
  title: "Placeholder title",
  username: "Username",
  date: "date",
  postBody:
    "Some quick example text to build on the card title and make up the bulk of the card's content.",
  postLink: "discuss/topic",
};

// PostLink.
export default function PostLinks({ filteredList }) {
  return (
    <div className="PostLinks">
      <PostLink />
    </div>
  );
}
