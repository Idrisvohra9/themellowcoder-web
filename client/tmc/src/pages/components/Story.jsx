import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

export default function Story({
  title,
  body,
  postedBy,
  image,
  likeCount,
  createdAt,
}) {
  function like() {}
  return (
    <div className="slider__item">
      <div className="postedAt">
        <ReactTimeAgo
          date={createdAt}
          locale="en-US"
          timeStyle="round-minute"
        />
      </div>
      <img className="slider__image" src={image} alt="Story" />
      <div className="slider__info">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <span className="d-flex user-info align-items-center w-100">
        <Link className="w-100 me-auto" to={`/profile/${postedBy}`}>
          <img src="" alt="" className="dp" />
          <span>{postedBy}</span>
        </Link>
        <div className="d-flex flex-column justify-content-center align-items-center ">
          <i className="bi bi-heart"></i>
          <div className="likeCount">{likeCount}</div>
        </div>
      </span>
    </div>
  );
}

Story.defaultProps = {
  title: "Story title",
  body: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  postedBy: "Username",
  image:
    "https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODR8fGFic3RyYWN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  createdAt: new Date(),
  likeCount: 0,
};
