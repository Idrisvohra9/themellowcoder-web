import React, { useRef, useEffect } from "react";
import useLoader from "../Hooks/useLoader";
import { Link } from "react-router-dom";
// import post
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Api/actions";
import Footer from "./components/Footer";
import { getCookie } from "../tools/cookies";
export default function Discussion() {
  useLoader();
  // Whole global redux store:

  const dispatch = useDispatch({ type: "FETCH_ALL" });
  const posts = useSelector((store) => store.postReducer);
  console.log(posts);
  useEffect(() => {
    dispatch(getPosts()); // We go to the post reducer
  }, [dispatch]);
  const showFilter = useRef();
  const filterBy = (e) => {
    let filterBtns = document.getElementsByClassName(e.target.className);
    filterBtns = Array.from(filterBtns);

    filterBtns.forEach((elem) => {
      elem.classNameList.remove("active");
    });
    e.target.classNameList.add("active");
    showFilter.current.innerHTML = e.target.innerHTML;
  };

  return (
    <div className="mainContent discussion">
      <div className="mt-2 ms-3 me-3">
        <div className="d-flex flex-row mb-3">
          <h1>
            Discuss <span ref={showFilter}>All</span>
          </h1>

          <div className="input-group align-self-center ms-auto w-25 flex-nowrap">
            <input
              type="text"
              placeholder="Search for a topic"
              className="input"
            />
            <span className="input-group-text search-btn">🔍</span>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="me-2">Filter By</div>
          <div
            className="btn-group filterBy"
            role="group"
            aria-label="Basic example"
          >
            <button onClick={filterBy} className="btn btn-primary active">
              All
            </button>
            <button onClick={filterBy} className="btn btn-primary">
              Latest
            </button>
            <button onClick={filterBy} className="btn btn-primary">
              Trending
            </button>
            <button onClick={filterBy} className="btn btn-primary">
              Most Rated
            </button>
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="refresh-btn ms-auto"
            onClick={() => {
              window.location.reload(false);
            }}
          >
            <title>Reload Posts</title>
            <g
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              strokeLinejoin="round"
            >
              {/* <path d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z" /> */}
              <g opacity="1">
                <path d="M13.67 7.51c-.5-.15-1.05-.25-1.67-.25-2.76 0-5 2.24-5 5s2.24 5 5 5a5.002 5.002 0 004.16-7.78M14.38 7.65l-1.66-1.91M14.38 7.65l-1.94 1.42" />
              </g>
            </g>
          </svg>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <div className="d-flex">
            {getCookie("username") ? (
              <Link to="/post" className="addPost">
                <svg viewBox="0 0 24 24" fill="aliceblue">
                  <g
                    stroke="aliceblue"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 12h12M12 18V6" />
                  </g>
                </svg>
                <span>
                  Start a discussion
                </span>
              </Link>
            ) : (
              <div>Login to Post!</div>
            )}
          </div>
        </div>
        <hr />
        <div className="d-flex flex-row w-100 h-100">
          <div className="posts-area pe-3">
            <div className="card post-link text-light">
              <div className="card-body">
                <h5 className="card-title">Post title</h5>
                <h6 className="card-subtitle mb-2 text-muted">Username</h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="" className="card-link">
                    Open Post
                  </Link>
                  <span className="text-muted">date</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ads"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
