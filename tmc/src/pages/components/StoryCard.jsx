import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { getCookie } from "../../tools/cookies";
import DOMPurify from "dompurify";

export default function StoryCard({
  _id,
  title,
  body,
  postedBy,
  image,
  likedBy,
  createdAt,
  sendId
}) {
  const pureBody = DOMPurify.sanitize(body);

  function like(e) {
    let targetGroup = e.target;
    let icon, count, targetValue;
    if (getCookie("username") === "") {
      document.getElementById("trigger-oopsie").click();
    } else {
    }
  }
  function toParent(){
    sendId(_id);
  }
  return (
    <div className="slider__item">
      <div className="postedAt">
        <ReactTimeAgo
          date={createdAt || new Date()}
          locale="en-US"
          timeStyle="round-minute"
        />
      </div>
      <img
        className="slider__image"
        src={`${process.env.REACT_APP_SERVER}stories/${image}`}
        alt="Story"
      />
      <div className="slider__info">
        <h2>{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: pureBody }}></p>
      </div>
      <span className="d-flex user-info align-items-center w-100">
        <Link className="w-100 me-auto" to={`/profile/${postedBy?.username}`}>
          <img
            src={`${process.env.REACT_APP_SERVER}users/${postedBy?.dp}`}
            alt={`@${postedBy?.username}`}
            className="dp"
          />
          <span>{postedBy?.username}</span>
        </Link>
        <div className="group">
          <span className="tooltiptext">Like</span>
          <i className="bi bi-heart" onClick={like}></i>
          <div className="likeCount">{likedBy?.length}</div>
        </div>
        <div className="group ms-3">
          <span className="tooltiptext">More Options</span>
          <i
            className="bi bi-three-dots dropend"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>
          <ul className="dropdown-menu dropdown-menu">
            <span className="d-flex justify-content-center">More Options</span>
            <li>
              <a className="dropdown-item" href="#">
                Share
              </a>
            </li>
            {getCookie("username") === postedBy?.username ? (
              <>
                <li>
                  <button
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#delete-modal"
                    onClick={toParent}
                  >
                    Delete
                  </button>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </span>
    </div>
  );
}
