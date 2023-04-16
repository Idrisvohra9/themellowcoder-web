import React from "react";
import useLoader from "../Hooks/useLoader";
export default function Topic({
  title,
  postedBy,
  postBody,
  tags,
  date,
  likeCount,
  dislikeCount,
}) {
  useLoader();
  return (
    <div className="mainContent">
      <div className="row">
        <div className="col-2 border-end border-light"></div>
        <div className="col-10 post-topic">
          <div className="p-3 rounded-4">
            <h1>{title}</h1>
            <div className="d-flex mt-3">
              <div className="d-flex flex-column">
                <div className="group">
                  <i className="bi bi-heart"></i>
                  <div className="count">{likeCount}</div>
                </div>
                <div className="group">
                  <i className="bi bi-heartbreak"></i>
                  <div className="count">{dislikeCount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Topic.defaultProps = {
  title: "Placeholder title",
  postedBy: "Username",
  date: "date",
  postBody:
    "Some quick example text to build on the card title and make up the bulk of the card's content.",
  tags: ["There", "Will", "Be Tags"],
  likeCount: 0,
  dislikeCount: 0,
};
