import React from "react";
import useLoader from "../Hooks/useLoader";

export default function Discussion() {
  useLoader();
  return (
    <div className="mainContent discussion">
      <div className="mt-2 ms-3 me-3">
        <h1>Discuss</h1>
        <div className="d-flex align-items-center">
          <div className="me-2">Filter By</div>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button className="btn btn-primary active">
              All
            </button>
            <button className="btn btn-primary">
              Latest
            </button>
            <button className="btn btn-primary">
              Trending
            </button>
            <button className="btn btn-primary">
              Most Rated
            </button>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
