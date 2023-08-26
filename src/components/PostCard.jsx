import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import DOMPurify from "dompurify";
import UserDisplayPic from "./UserDisplayPic";
export function PostCard({ title, body, postedBy, tags, createdAt, slug }) {
  const pureBody = DOMPurify.sanitize(body);
  // console.log(createdAt)
  return (
    <div className="PostLinks">
      <div className="card post-link text-light">
        <div className="card-body">
          <Link to={"/discuss/topic/" + slug} className="card-link">
            <h5 className="card-title">{title}</h5>
          </Link>
          <Link
            to={`/profile/${postedBy?.username}`}
            className="text-decoration-none d-flex align-items-center mb-2"
          >
            <UserDisplayPic dp={postedBy?.dp} className="dp me-1"/>
            <h6 className="card-subtitle">{postedBy?.username}</h6>
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
                date={createdAt || Date.now()}
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
