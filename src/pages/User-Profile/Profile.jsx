import React, { useEffect, useState } from "react";
import useLoader from "../../Hooks/useLoader";
import { getCookie, deleteCookie } from "../../tools/cookies";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import grumpy from "../../components/Images/kraken.webp";
import Footer from "../../components/Footer";
import { PostCard } from "../../components/PostCard";
import tmcGold from "../../static/Images/tmcGold.png";
import tmcSilver from "../../static/Images/tmcSilver.png";
import UserListModal from "../../components/UserListModal";
import UserDisplayPic from "../../components/UserDisplayPic";

export default function Profile() {
  useLoader();
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const [activeTab, setActiveTab] = useState("Post");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  function addFreind() {
    // If the user is not logged in:
    if (getCookie("username") === "") {
      document.getElementById("trigger-oopsie").click();
    } else {
      console.log("followed");
    }
  }

  function logOut() {
    deleteCookie("username");
    deleteCookie("uid");
    setUserData({});
    window.location.reload();
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}users/${username}`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.log(error));

    console.log(userData);
  }, []);
  if (!userData) {
    return (
      <div className=" dark">
        <div className="ms-3 me-3 d-flex justify-content-center align-items-center h-100 flex-column">
          <img
            src={grumpy}
            alt=""
            style={{ width: "220px", height: "220px" }}
          />
          <h1>You encountered Ocro!</h1>
          <h2>
            <b>The user doesn't exist!</b>
          </h2>
          <h3>(He is pissed..)</h3>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="">
          <UserListModal
            heading="Friends"
            type="friends"
            userList={userData.friends}
          />
          <div className="profile header__wrapper h-100">
            <header></header>
            <div className="cols__container">
              <div className="left__col">
                <div className="img__container">
                  <UserDisplayPic dp={userData?.dp}/>
                  <span></span>
                </div>
                <h2 className="mb-4">
                  {username}{" "}
                  {userData.isVerified && (
                    <i className="bi bi-patch-check-fill"></i>
                  )}
                </h2>
                {/* <p>{userData.email}</p> */}
                <p>
                  {userData.tags?.map((tag, id) => (
                    <span key={id} className="user-tags">
                      {tag}
                    </span>
                  ))}
                </p>

                <ul className="about">
                  <li
                    className="c-point"
                    data-bs-toggle="modal"
                    data-bs-target="#userlist-modal-friends"
                  >
                    <span>{userData.friends?.length}</span>Friends
                  </li>
                  <li className="c-point">
                    <span>{userData.tmcGold}</span>
                    <div className="d-flex justify-content-center align-items-center">
                      <img src={tmcGold} alt="" className="coin" />
                      Gold
                    </div>
                  </li>
                  <li className="c-point">
                    <span>{userData.tmcSilver}</span>
                    <div className="d-flex justify-content-center align-items-center">
                      <img src={tmcSilver} alt="" className="coin" />
                      Silver
                    </div>
                  </li>
                </ul>

                <div className="content">
                  <p>{userData.desc}</p>
                  {userData?.findMeLinks && (
                    <div className="mt-3 mb-3 social-card w-100">
                      <span>Find me</span>
                      <Link
                        to="https://www.youtube.com/channel/UCllRlG3XjZZrMpCzB5slu2A"
                        className="social-link"
                      >
                        <svg viewBox="0 -7 48 48">
                          <path
                            d="M19.044 23.27l-.002-13.582 12.97 6.814-12.968 6.768zM47.52 7.334s-.47-3.33-1.908-4.798C43.786.61 41.74.601 40.803.49 34.086 0 24.011 0 24.011 0h-.022S13.914 0 7.197.49C6.258.6 4.214.61 2.387 2.535.948 4.003.48 7.334.48 7.334S0 11.247 0 15.158v3.668c0 3.912.48 7.823.48 7.823s.468 3.331 1.907 4.798c1.827 1.926 4.225 1.866 5.293 2.067C11.52 33.885 24 34 24 34s10.086-.015 16.803-.505c.938-.113 2.983-.122 4.809-2.048 1.438-1.467 1.908-4.798 1.908-4.798s.48-3.91.48-7.823v-3.668c0-3.911-.48-7.824-.48-7.824z"
                            fill="#CE1312"
                            fillRule="evenodd"
                          />
                        </svg>
                      </Link>
                      <Link
                        to="https://twitter.com/themellowcoder"
                        className="social-link"
                      >
                        <svg viewBox="0 0 48 48" fill="none">
                          <circle cx="24" cy="24" r="20" fill="#1DA1F2" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M36 16.309a9.83 9.83 0 01-2.828.775 4.936 4.936 0 002.165-2.724 9.862 9.862 0 01-3.126 1.195 4.924 4.924 0 00-8.39 4.49 13.976 13.976 0 01-10.15-5.144 4.898 4.898 0 00-.665 2.476c0 1.707.867 3.215 2.19 4.098a4.908 4.908 0 01-2.231-.616v.061a4.93 4.93 0 003.95 4.83 4.949 4.949 0 01-2.225.084 4.93 4.93 0 004.6 3.42A9.881 9.881 0 0112 31.291a13.938 13.938 0 007.547 2.212c9.057 0 14.01-7.502 14.01-14.008 0-.214-.005-.427-.015-.637A10.03 10.03 0 0036 16.309z"
                            fill="#fff"
                          />
                        </svg>
                      </Link>
                      <Link
                        to="https://www.instagram.com/themellowcoder/"
                        className="social-link"
                      >
                        <svg viewBox="0 0 2500 2500">
                          <defs>
                            <radialGradient
                              id="prefix__a"
                              cx="332.14"
                              cy="2511.81"
                              r="3263.54"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset=".09" stopColor="#fa8f21" />
                              <stop offset=".78" stopColor="#d82d7e" />
                            </radialGradient>
                            <radialGradient
                              id="prefix__b"
                              cx="1516.14"
                              cy="2623.81"
                              r="2572.12"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                offset=".64"
                                stopColor="#8c3aaa"
                                stopOpacity="0"
                              />
                              <stop offset="1" stopColor="#8c3aaa" />
                            </radialGradient>
                          </defs>
                          <path
                            d="M833.4 1250c0-230.11 186.49-416.7 416.6-416.7s416.7 186.59 416.7 416.7-186.59 416.7-416.7 416.7-416.6-186.59-416.6-416.7m-225.26 0c0 354.5 287.36 641.86 641.86 641.86s641.86-287.36 641.86-641.86S1604.5 608.14 1250 608.14 608.14 895.5 608.14 1250m1159.13-667.31a150 150 0 10150.06-149.94h-.06a150.07 150.07 0 00-150 149.94M745 2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28 7.27-505.15c5.55-121.87 26-188 43-232.13 22.72-58.36 49.78-100 93.5-143.78s85.32-70.88 143.78-93.5c44-17.16 110.26-37.46 232.13-43 131.76-6.06 171.34-7.27 505-7.27s373.28 1.31 505.15 7.27c121.87 5.55 188 26 232.13 43 58.36 22.62 100 49.78 143.78 93.5s70.78 85.42 93.5 143.78c17.16 44 37.46 110.26 43 232.13 6.06 131.87 7.27 171.34 7.27 505.15s-1.21 373.28-7.27 505.15c-5.55 121.87-25.95 188.11-43 232.13-22.72 58.36-49.78 100-93.5 143.68s-85.42 70.78-143.78 93.5c-44 17.16-110.26 37.46-232.13 43-131.76 6.06-171.34 7.27-505.15 7.27s-373.28-1.21-505-7.27M734.65 7.57c-133.07 6.06-224 27.16-303.41 58.06C349 97.54 279.38 140.35 209.81 209.81S97.54 349 65.63 431.24c-30.9 79.46-52 170.34-58.06 303.41C1.41 867.93 0 910.54 0 1250s1.41 382.07 7.57 515.35c6.06 133.08 27.16 223.95 58.06 303.41 31.91 82.19 74.62 152 144.18 221.43S349 2402.37 431.24 2434.37c79.56 30.9 170.34 52 303.41 58.06C868 2498.49 910.54 2500 1250 2500s382.07-1.41 515.35-7.57c133.08-6.06 223.95-27.16 303.41-58.06 82.19-32 151.86-74.72 221.43-144.18s112.18-139.24 144.18-221.43c30.9-79.46 52.1-170.34 58.06-303.41 6.06-133.38 7.47-175.89 7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95 97.54 2068.86 65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17 1.51 1589.56 0 1250.1 0S868 1.41 734.65 7.57"
                            fill="url(#prefix__a)"
                          />
                          <path
                            d="M833.4 1250c0-230.11 186.49-416.7 416.6-416.7s416.7 186.59 416.7 416.7-186.59 416.7-416.7 416.7-416.6-186.59-416.6-416.7m-225.26 0c0 354.5 287.36 641.86 641.86 641.86s641.86-287.36 641.86-641.86S1604.5 608.14 1250 608.14 608.14 895.5 608.14 1250m1159.13-667.31a150 150 0 10150.06-149.94h-.06a150.07 150.07 0 00-150 149.94M745 2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28 7.27-505.15c5.55-121.87 26-188 43-232.13 22.72-58.36 49.78-100 93.5-143.78s85.32-70.88 143.78-93.5c44-17.16 110.26-37.46 232.13-43 131.76-6.06 171.34-7.27 505-7.27s373.28 1.31 505.15 7.27c121.87 5.55 188 26 232.13 43 58.36 22.62 100 49.78 143.78 93.5s70.78 85.42 93.5 143.78c17.16 44 37.46 110.26 43 232.13 6.06 131.87 7.27 171.34 7.27 505.15s-1.21 373.28-7.27 505.15c-5.55 121.87-25.95 188.11-43 232.13-22.72 58.36-49.78 100-93.5 143.68s-85.42 70.78-143.78 93.5c-44 17.16-110.26 37.46-232.13 43-131.76 6.06-171.34 7.27-505.15 7.27s-373.28-1.21-505-7.27M734.65 7.57c-133.07 6.06-224 27.16-303.41 58.06C349 97.54 279.38 140.35 209.81 209.81S97.54 349 65.63 431.24c-30.9 79.46-52 170.34-58.06 303.41C1.41 867.93 0 910.54 0 1250s1.41 382.07 7.57 515.35c6.06 133.08 27.16 223.95 58.06 303.41 31.91 82.19 74.62 152 144.18 221.43S349 2402.37 431.24 2434.37c79.56 30.9 170.34 52 303.41 58.06C868 2498.49 910.54 2500 1250 2500s382.07-1.41 515.35-7.57c133.08-6.06 223.95-27.16 303.41-58.06 82.19-32 151.86-74.72 221.43-144.18s112.18-139.24 144.18-221.43c30.9-79.46 52.1-170.34 58.06-303.41 6.06-133.38 7.47-175.89 7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95 97.54 2068.86 65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17 1.51 1589.56 0 1250.1 0S868 1.41 734.65 7.57"
                            fill="url(#prefix__b)"
                          />
                        </svg>
                      </Link>
                      <Link
                        to="https://github.com/Idrisvohra9"
                        className="social-link"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 006.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 012.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0022 12c0-5.525-4.475-10-10-10z"
                            fill="#000"
                          />
                        </svg>
                      </Link>
                      <Link to="" className="social-link">
                        <svg
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="24" cy="24" r="20" fill="#0077B5" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.775 14.284c0 1.245-.948 2.253-2.43 2.253-1.426 0-2.374-1.008-2.344-2.253-.03-1.306.918-2.284 2.372-2.284 1.454 0 2.373.978 2.402 2.284zM14.12 32.819V18.316h4.507v14.502H14.12v.001zM22.24 22.945c0-1.81-.06-3.352-.12-4.627h3.915l.208 1.987h.09c.592-.92 2.075-2.312 4.477-2.312 2.965 0 5.19 1.957 5.19 6.226v8.602h-4.508v-8.037c0-1.87-.652-3.144-2.283-3.144-1.246 0-1.987.86-2.283 1.69-.119.297-.178.711-.178 1.127v8.364h-4.507v-9.876h-.002z"
                            fill="#fff"
                          />
                        </svg>
                      </Link>
                      <Link to="" className="social-link">
                        <svg viewBox="0 0 16 16" fill="none">
                          <g fill="#000">
                            <path d="M4.416 7.378v1.244L5.346 8l-.93-.622zm3.211-.905V4.738L4.712 6.683l1.302.87 1.613-1.08zm3.658.21L8.37 4.738v1.735l1.613 1.08 1.302-.87zM4.712 9.32l2.915 1.942V9.527l-1.613-1.08-1.302.873zm3.658.207v1.735l2.915-1.942-1.302-.873-1.613 1.08zM8 7.12L6.683 8 8 8.879 9.314 8 8 7.12z" />
                            <path d="M8 1a7 7 0 10.001 14.001A7 7 0 008 1zm4.327 8.32c0 .018 0 .033-.003.047 0 .006-.003.012-.003.015l-.006.033c-.002.006-.002.012-.005.018l-.01.026-.008.018c-.003.009-.01.018-.012.024a.06.06 0 01-.012.017l-.015.024a.065.065 0 01-.012.015c-.005.006-.011.015-.017.02l-.015.015c-.006.006-.015.012-.02.018-.007.003-.013.009-.019.012-.003 0-.003.003-.005.006l-3.96 2.64a.377.377 0 01-.414 0L3.832 9.631c-.003 0-.003-.003-.006-.006l-.018-.012c-.006-.006-.015-.012-.02-.018l-.016-.014a.129.129 0 01-.017-.021c-.003-.006-.01-.012-.012-.015a.064.064 0 01-.015-.024.062.062 0 00-.012-.017l-.012-.024-.009-.018-.008-.026-.006-.018a.106.106 0 01-.006-.033c0-.006-.003-.012-.003-.015-.003-.014-.003-.032-.003-.047V6.686c0-.018 0-.033.003-.048 0-.005.003-.011.003-.014l.006-.033.006-.018.008-.026.01-.018c.002-.009.008-.018.011-.024a.062.062 0 01.012-.017l.015-.024a.065.065 0 01.012-.015c.006-.006.011-.015.017-.02l.015-.015c.006-.006.015-.012.02-.018.007-.003.013-.01.019-.012.003 0 .003-.003.006-.006L7.79 3.741a.372.372 0 01.411 0l3.958 2.637c.002 0 .002.003.005.006l.018.012.021.018.015.014c.006.006.012.012.018.021l.011.015a.065.065 0 01.015.024.06.06 0 00.012.017.087.087 0 01.012.024l.009.018.009.026c.003.006.003.012.005.018.004.009.006.02.006.033 0 .006.003.012.003.014a.251.251 0 01.003.048V9.32h.006z" />
                            <path d="M11.584 8.622V7.378L10.652 8l.932.622z" />
                          </g>
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="right__col">
                <nav>
                  <ul className="nav">
                    <li>
                      <div
                        className={`tabs ${
                          activeTab === "Post" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("Post")}
                      >
                        posts <span>{userData.postsCount}</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className={`tabs ${
                          activeTab === "Story" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("Story")}
                      >
                        stories <span>{userData.storiesCount}</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className={`tabs ${
                          activeTab === "PlannedCodes" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("PlannedCodes")}
                      >
                        PlannedCodes <span>{userData.storiesCount}</span>
                      </div>
                    </li>
                  </ul>
                  {getCookie("username") !== username ? (
                    <button onClick={addFreind}>Add Friend +</button>
                  ) : (
                    <>
                      <button
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Options
                      </button>
                      <div className="dropdown-menu dropdown-menu">
                        <div>
                          <div
                            className="dropdown-item c-point"
                            onClick={logOut}
                          >
                            Log Out
                          </div>
                        </div>
                        <div>
                          <a className="dropdown-item" href="#">
                            Share Profile
                          </a>
                        </div>
                        <div>
                          <Link
                            className="dropdown-item"
                            to={`/profile/manage/${userData.username}`}
                          >
                            Manage Profile
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </nav>

                <div className="profile-media">
                  {activeTab === "Post"
                    ? userData.posts?.length === 0
                      ? "No Posts"
                      : userData.posts?.map((post, id) => (
                          <PostCard {...post} key={id} />
                        ))
                    : ""}
                  {activeTab === "Story"
                    ? userData.stories?.length === 0
                      ? "No Stories"
                      : userData.stories?.map((post, id) => "")
                    : ""}
                  {activeTab === "PlannedCodes"
                    ? userData.plannedCodes?.length === 0
                      ? "No Planned Codes"
                      : userData.plannedCodes?.map((post, id) => "")
                    : ""}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}
