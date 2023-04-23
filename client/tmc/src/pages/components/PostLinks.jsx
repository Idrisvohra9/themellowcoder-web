import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
export function PostLink({
  title,
  body,
  postedBy,
  tags,
  postedAt,
  slug,
}) {
  return (
    <div className="card post-link text-light">
      <div className="card-body">
        <Link to={"/" + slug} className="card-link">
          <h5 className="card-title">{title}</h5>
        </Link>
        <h6 className="card-subtitle mb-2 text-muted">{postedBy}</h6>
        <div className="d-flex justify-content-start mb-2">
          {tags.map((tag, id) => (
            <span className="post-tag" key={id}>
              {tag}
            </span>
          ))}
        </div>
        <p className="card-text">{body}</p>
        <div className="d-flex justify-content-end align-items-center">
          <time className="text-muted">
            <ReactTimeAgo
              date={postedAt}
              locale="en-US"
              timeStyle="round-minute"
            />
          </time>
        </div>
      </div>
    </div>
  );
}

PostLink.defaultProps = {
  title: "Placeholder title",
  body: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  postedBy: "Username",
  tags:[],
  postedAt: new Date(),
  slug: "discuss/topic",
};

// PostLink.
// export function PostLinks({ filteredList }) {
//   return (
//     <div className="PostLinks">
//       <PostLink />
//     </div>
//   );
// }
