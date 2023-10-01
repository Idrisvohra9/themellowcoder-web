import React, { useEffect, useState } from "react";
import useLoader from "../../Hooks/useLoader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Api/actions";
import Footer from "../../components/Footer";
import { isLoggedIn } from "../../tools/cookies";
import { PostCard } from "../../components/PostCard";
import Head from "../../components/Head";
import MusicToast from "../../components/MusicToast";
import { useSearchParams } from "react-router-dom";

export default function Discussion() {
  useLoader();
  const dispatch = useDispatch({ type: "FETCH_ALL" });
  const posts = useSelector((store) => store.postReducer);
  useEffect(() => {
    dispatch(getPosts()); // We go to the post reducer
  }, [dispatch]);
  const [searchParams, setSearchParms] = useSearchParams({
    q: "",
    page: 1,
    sortBy: "All",
  });
  const [search, setSearch] = useState(searchParams.get("q"));
  const [sortByVal, setSortBy] = useState(searchParams.get("sortBy"));

  const sortBy = (e) => {
    const sortValue = e.target.innerHTML;
    updateSearchParams("sortBy", sortValue);
    // setSortby is for active button class
    setSortBy(sortValue);
  };
  function updateSearchParams(key, value) {
    setSearchParms(
      (prev) => {
        prev.set(key, value);
        return prev;
      },
      { replace: true }
    );
  }
  function searchFilter() {
    updateSearchParams("q", search);
    const upperCased = search.toUpperCase();
    const postLinks = document.querySelectorAll(".PostLinks");

    for (const postLink of postLinks) {
      let title = postLink.querySelector(".card-title").innerHTML.toUpperCase();
      let tags = postLink.querySelectorAll(".post-tag");
      let tagsHTML = "";
      tags.forEach((tag) => (tagsHTML += " " + tag.innerHTML.toUpperCase()));
      if (title.includes(upperCased) || tagsHTML.includes(upperCased)) {
        postLink.style.display = "block";
      } else {
        postLink.style.display = "none";
      }
    }
  }
  useEffect(() => {
    if (searchParams.get("q") !== "") {
      searchFilter();
    }
  });
  return (
    <div>
      <Head title="Discussion" />
      <div className="mt-2 ms-3 me-3">
        <div className="discussion-header-bg">
          <div className="d-flex flex-row mb-3">
            <h1>
              Discuss <span>{searchParams.get("sortBy")}</span>
            </h1>
          </div>
          <div className="d-flex align-items-center">
            <div className="me-2">Sort By</div>
            <div
              className="btn-group sortBy"
              role="group"
              aria-label="Basic example"
            >
              <button
                onClick={sortBy}
                className={`btn btn-primary ${
                  sortByVal === "All" && "active"
                } text-truncat`}
              >
                All
              </button>
              <button
                onClick={sortBy}
                className={`btn btn-primary ${
                  sortByVal === "Latest" && "active"
                } text-truncate`}
              >
                Latest
              </button>
              <button
                onClick={sortBy}
                className={`btn btn-primary ${
                  sortByVal === "Trending" && "active"
                } text-truncate`}
              >
                Trending
              </button>
              <button
                onClick={sortBy}
                className={`btn btn-primary ${
                  sortByVal === "Rated" && "active"
                } text-truncate`}
              >
                Rated
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
                type="search"
                placeholder="Filter by topic title or tags"
                className="input"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onLoad={(e) => (e.target.value = searchParams.get("q"))}
              />
              <span
                className="input-group-text search-btn"
                onClick={searchFilter}
              >
                🔍
              </span>
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
        <div className="row">
          <div className="col-lg-10 col-sm-12">
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
            <div className="container d-flex justify-content-center mb-3">
              <button
                type="button"
                className="load-more"
                onClick={() => {
                  let currentPage = Number(searchParams.get("page"));
                  updateSearchParams("page", currentPage + 1);
                }}
              >
                Load More
              </button>
            </div>
          </div>
          <MusicToast />
          <div className="col-lg-2 col-sm-12">{/* <h1>Ads</h1> */}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
