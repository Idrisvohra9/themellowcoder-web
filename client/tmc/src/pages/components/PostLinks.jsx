import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import DOMPurify from "dompurify";
export function PostLink({ title, body, postedBy, tags, createdAt, slug }) {
  const pureBody = DOMPurify.sanitize(body);
  return (
    <div className="PostLinks">
      <div className="card post-link text-light">
        <div className="card-body">
          <Link to={"topic/"+slug} className="card-link">
            <h5 className="card-title">{title}</h5>
          </Link>
          <Link
            to={`/profile/${postedBy.username}`}
            className="text-decoration-none"
          >
            {/* <img src={} alt="" className="dp"/> */}
            <h6 className="card-subtitle mb-2 ">{postedBy.username}</h6>
          </Link>
          <div className="d-flex justify-content-start mb-2">
            {tags.map((tag, id) => (
              <span className="post-tag" key={id}>
                {tag}
              </span>
            ))}
          </div>
          <div
            className="card-text"
            dangerouslySetInnerHTML={{ __html: pureBody }}
          ></div>
          <div className="d-flex justify-content-end align-items-center">
            <time className="text-muted">
              <ReactTimeAgo
                date={createdAt}
                locale="en-US"
                timeStyle="round-minute"
              />
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}

// PostLink.defaultProps = {
//   title: "Placeholder title",
//   body: "Some quick example text to build on the card title and make up the bulk of the card's content.",
//   postedBy: "Username",
//   tags:[],
//   createdAt: new Date(),
//   slug: "discuss/topic",
// };

// PostLink.
// export function PostLinks({ filteredList }) {
//   return (
//     <div className="PostLinks">
//       <PostLink />
//     </div>
//   );
// }
