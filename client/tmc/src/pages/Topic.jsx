import React, { useEffect, useState } from "react";
import useLoader from "../Hooks/useLoader";
import Footer from "./components/Footer";
import { Link, useParams } from "react-router-dom";
import { getCookie } from "../tools/cookies";
import ReactTimeAgo from "react-time-ago";
import DOMPurify from "dompurify";
import axios from "axios";
import NoPage from "./NoPage";
import Head from "./components/Head";

export default function Topic() {
  const { slug } = useParams();
  const [postData, setPostData] = useState({});
  useLoader();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/${slug}`)
      .then((response) => setPostData(response.data))
      .catch((error) => console.log(error));
    // console.log(postData?._id);
    // Logic for saving the like and dislike state:

    const likeIcon = document.querySelector(".bi-heart-fill");
    const dislikeIcon = document.querySelector(".bi-heartbreak-fill");
    console.log(likeIcon);
    console.log(dislikeIcon);
    console.log(postData?.likedBy?.includes(getCookie("uid")));
    if (postData.likedBy?.includes(getCookie("uid"))) {
      likeIcon?.classList.add("active");
    }
    if (postData.dislikedBy?.includes(getCookie("uid"))) {
      dislikeIcon?.classList.add("active");
    }
  }, [slug]);
  async function deletePost() {}
  async function sendLike() {
    await axios.post("http://localhost:5000/posts/like/", {
      userId: getCookie("uid"),
      postId: postData._id,
    });
  }

  async function sendDislike() {
    await axios.post("http://localhost:5000/posts/dislike/", {
      userId: getCookie("uid"),
      postId: postData._id,
    });
  }
  function like_dislike(e) {
    let targetGroup = e.target;
    let icon;
    let oppoElement;
    // If the target element is the children of group then set the target element to group
    if (getCookie("username") === "") {
      document.getElementById("trigger-oopsie").click();
    } else {
      if (targetGroup.className !== "group") {
        targetGroup = targetGroup.parentNode;
      }
      icon = targetGroup.children[1];

      icon.classList.toggle("active");
      // If the target element is like then:
      if (targetGroup.className.includes("Like")) {
        // Logic for checking if the dislike button has already been clicked before:
        let isDislikeActive = false;
        oppoElement = document.querySelector(".bi-heartbreak-fill.active");
        if (targetGroup.parentNode.contains(oppoElement)) {
          isDislikeActive = true;
        }
        sendLike();
        // What to do if dislike is active:
        if (isDislikeActive) {
          // And remove the active className from it's icon:
          oppoElement.classList.remove("active");
        }
        // Else if the target element is dislike
      } else {
        // Logic for checking if the dislike button has already been clicked before:
        let isLikeActive = false;
        oppoElement = document.querySelector(".bi-heart-fill.active");
        if (targetGroup.parentNode.contains(oppoElement)) {
          isLikeActive = true;
        }
        sendDislike();
        // What to do if like is active:
        if (isLikeActive) {
          // And remove the active className from it's icon:
          oppoElement.classList.remove("active");
        }
      }
    }
  }
  function reply() {
    if (getCookie("username") === "") {
      document.getElementById("trigger-oopsie").click();
    } else {
    }
  }
  if (!postData) {
    return <NoPage />;
  } else {
    const likedBy = postData?.likedBy || [];
    const dislikedBy = postData?.dislikedBy || [];

    // If the user has already clicked like or dislike buttons
    if (likedBy.includes(getCookie("uid"))) {
    }
    if (dislikedBy.includes(getCookie("uid"))) {
    }
    // console.log(likedBy);
    return (
      <div className="mainContent">
        <Head title={postData.title} />
        <div className="row post-topic">
          <div className="col-2 border-end border-light"></div>
          <div className="col-10">
            <div className="p-3">
              <Link
                to={postData.slug}
                className="text-text-decoration-none text-light"
              >
                <h1>{postData.title}</h1>
              </Link>
              <hr />
              <div className="d-flex mt-3 w-100">
                {/* Side Buttons  */}
                <div className="d-flex flex-column me-4">
                  <div
                    className="group Like"
                    onClick={like_dislike}
                    // onLoad={(e) => {
                    //   return console.log(e.target.children);
                    // }}
                  >
                    <span className="tooltiptext">Like</span>
                    <i className="bi bi-heart-fill"></i>
                    <div className="count">{postData.likedBy?.length}</div>
                  </div>
                  <div className="group Dislike" onClick={like_dislike}>
                    <span className="tooltiptext">Disike</span>
                    <i className="bi bi-heartbreak-fill"></i>
                    <div className="count">{postData.dislikedBy?.length}</div>
                  </div>
                  <div className="group">
                    <span className="tooltiptext">More Options</span>
                    <i
                      className="bi bi-three-dots dropend"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></i>
                    <ul className="dropdown-menu dropdown-menu">
                      <span className="d-flex justify-content-center">
                        More Options
                      </span>
                      <li>
                        <a className="dropdown-item" href="#">
                          Share
                        </a>
                      </li>
                      {getCookie("username") === postData.postedBy?.username ? (
                        <>
                          <li>
                            <a className="dropdown-item" href="#">
                              Edit
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                  <div className="group" onClick={reply}>
                    <span className="tooltiptext">Reply</span>

                    <i className="bi bi-reply"></i>
                  </div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div
                    className="post-body w-100"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(postData.body),
                    }}
                  ></div>
                  <div>
                    <div className="d-flex justify-content-start mt-4 mb-2 align-self-end">
                      {postData.tags?.map((tag, id) => (
                        <span className="post-tag" key={id}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="d-flex justify-content-end mb-2 ms-auto">
                      <div className="box">
                        <div>
                          <span className="sub-text ms-1">
                            Shared By:
                            <Link
                              to={`/profile/${postData.postedBy?.username}`}
                              className="d-flex justify-content-between align-items-center"
                            >
                              <img
                                src={`http://localhost:5000/users/${postData.postedBy?.dp}`}
                                alt={`@${postData.postedBy?.username}`}
                                className="dp me-1"
                              />
                              <span>{postData.postedBy?.username}</span>
                            </Link>
                          </span>
                        </div>
                        <div>
                          <span className="sub-text">
                            <ReactTimeAgo
                              date={
                                postData.createdAt
                                  ? postData.createdAt
                                  : new Date().getTime()
                              }
                              locale="en-US"
                              timeStyle="round-minute"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end Side Buttons  */}
              </div>
              <hr />
              <div className="mt-3">
                <h3>Replies</h3>
                <div className="container">
                  <div className="reply-form"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
