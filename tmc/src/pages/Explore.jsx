import React, { useEffect } from "react";
import useLoader from "../Hooks/useLoader";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../Api/actions";
import { Link } from "react-router-dom";
export default function Explore() {
  useLoader();
  const dispatch = useDispatch({ type: "FETCH_ALL" });
  const users = useSelector((store) => store.userReducer);
  useEffect(() => {
    dispatch(getUsers()); // We go to the post reducer
  }, [dispatch]);
  function search(e) {
    const searchValue = e.target.value.toUpperCase();
    const searchProfiles = document.querySelectorAll(".search-profiles");
    for (const profile of searchProfiles) {
      const uname = profile.querySelector(".uname").innerHTML.toUpperCase();
      const usertags = profile.querySelectorAll("user-tags");
      let userTagsHML = "";
      usertags.forEach((tag) => (userTagsHML += tag.innerHTML.toUpperCase()));
      if (uname.includes(searchValue) || userTagsHML.includes(searchValue)) {
        profile.style.display = "block";
      } else {
        profile.style.display = "none";
      }
      if (searchValue === "") {
        profile.style.display = "none";
      }
    }
  }
  return (
    <div className="mainContent explore pt-4 explore-header-bg">
      <div className="container mt-4 mb-2">
        <h1>Explore</h1>
        <input
          type="text"
          className="input mt-3"
          placeholder="Find people alike!"
          onChange={search}
        />
        <div className="container-fluid p-2 rounded-2 explore-back">
          {users.map((user, id) => (
            <div className="m-2 search-profiles" key={id}>
              <Link
                to={`/profile/${user.username}`}
                className="text-decoration-none w-100"
              >
                <div className="d-flex align-items-center flex-lg-grow-0 flex-wrap">
                  <img
                    src={`${process.env.REACT_APP_SERVER}users/${user.dp}`}
                    alt=""
                    className="dp"
                  />
                  <span className="text-light ms-2 uname">{user.username}</span>
                  <div className="ms-auto">
                    {user.tags.map((tag, id) => (
                      <span className="user-tags" key={id}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <hr />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
