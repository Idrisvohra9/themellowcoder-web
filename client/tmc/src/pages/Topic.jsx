import React from "react";
import useLoader from "../Hooks/useLoader";

export default function Topic({title, postedBy, postBody, tags, date}) {
  useLoader();
  return (
    <div className="mainContent post-topic mt-3">
      <div className="container bg-dark p-3 rounded-4">
        <h1>{title}</h1>
        <div className="row border-top border-light p-3">
          <div className="col-8 border-end border-light"></div>
          <div className="col-4"></div>
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
  tags: ["There", "Will", "Be Tags"]
};