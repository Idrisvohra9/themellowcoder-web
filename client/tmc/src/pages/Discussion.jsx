import React, { useRef, useEffect } from "react";
import useLoader from "../Hooks/useLoader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Api/actions";
import Footer from "./components/Footer";
import { isLoggedIn } from "../tools/cookies";
import { PostCard } from "./components/PostCard";
import Head from "./components/Head";
import MusicToast from "./components/MusicToast";

export default function Discussion() {
  useLoader();
  const dispatch = useDispatch({ type: "FETCH_ALL" });
  const posts = useSelector((store) => store.postReducer);
  useEffect(() => {
    dispatch(getPosts()); // We go to the post reducer
  }, [dispatch]);

  const showFilter = useRef();
  const sortBy = (e) => {
    let filterBtns = document.getElementsByClassName(e.target.className);
    filterBtns = Array.from(filterBtns);

    filterBtns.forEach((elem) => {
      elem.classList.remove("active");
    });
    e.target.classList.add("active");
    showFilter.current.innerHTML = e.target.innerHTML;
  };

  function searchFilter(e) {
    const SearchValue = e.target.value.toUpperCase();
    const postLinks = document.querySelectorAll(".PostLinks");

    for (const postLink of postLinks) {
      let title = postLink.querySelector(".card-title").innerHTML.toUpperCase();
      let tags = postLink.querySelectorAll(".post-tag");
      // console.log(tags);
      let tagsHTML = "";
      tags.forEach((tag) => (tagsHTML += " " + tag.innerHTML.toUpperCase()));
      // console.log(tagsHTML);
      if (title.includes(SearchValue) || tagsHTML.includes(SearchValue)) {
        postLink.style.display = "block";
      } else {
        postLink.style.display = "none";
      }
    }
  }
  return (
    <div className="mainContent discussion">
      <Head title="Discussion" />
      <div className="mt-2 ms-3 me-3">
        <div className="discussion-header-bg">
          <div className="d-flex flex-row mb-3">
            <h1>
              Discuss <span ref={showFilter}>All</span>
            </h1>
          </div>
          <div className="d-flex align-items-center">
            <div className="me-2">Sort By</div>
            <div
              className="btn-group sortBy"
              role="group"
              aria-label="Basic example"
            >
              <button onClick={sortBy} className="btn btn-primary active">
                All
              </button>
              <button onClick={sortBy} className="btn btn-primary">
                Latest
              </button>
              <button onClick={sortBy} className="btn btn-primary">
                Trending
              </button>
              <button onClick={sortBy} className="btn btn-primary">
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
                <g opacity="1">
                  <path d="M13.67 7.51c-.5-.15-1.05-.25-1.67-.25-2.76 0-5 2.24-5 5s2.24 5 5 5a5.002 5.002 0 004.16-7.78M14.38 7.65l-1.66-1.91M14.38 7.65l-1.94 1.42" />
                </g>
              </g>
            </svg>
          </div>
          <div className="d-flex justify-content-between mt-3 align-items-center">
            <div className="input-group w-50 flex-nowrap">
              <input
                type="text"
                placeholder="Filter by topic title or tags"
                className="input"
                onChange={searchFilter}
              />
              <span className="input-group-text search-btn">🔍</span>
            </div>
            <div className="d-flex">
              {isLoggedIn() ? (
                <Link to="/discuss/create" className="addPost">
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
                  <span>Start a discussion</span>
                </Link>
              ) : (
                <div>Login to Post!</div>
              )}
            </div>
          </div>
        </div>

        <hr />
        <div className="d-flex flex-row w-100 h-100">
          <div className="posts-area pe-3">
            {!posts.length ? (
              <div className="post-loader">
                <div className="wrapper">
                  <div className="circle"></div>
                  <div className="line-1"></div>
                  <div className="line-2"></div>
                  <div className="line-3"></div>
                  <div className="line-4"></div>
                </div>
              </div>
            ) : (
              posts.map((post) => <PostCard {...post} key={post._id} />)
            )}
          </div>
          <div className="ads">
            <MusicToast/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
