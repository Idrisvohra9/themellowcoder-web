import React, { useEffect, useState } from "react";
import useLoader from "../Hooks/useLoader";
import Footer from "./components/Footer";
import { Link, useParams } from "react-router-dom";
import { getCookie } from "../tools/cookies";
import ReactTimeAgo from "react-time-ago";
import DOMPurify from "dompurify";
import axios from "axios";

export default function Topic() {
  const { slug } = useParams();
  const [postData, setPostData] = useState({});
  useLoader();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/${slug}`)
      .then((response) => setPostData(response.data))
      .catch((error) => console.log(error));
    console.log(postData);
    const pureBody = DOMPurify.sanitize(postData.body);
  }, [slug]);
  function like_dislike(e) {
    let targetGroup = e.target;
    let icon, targetValue, count;
    let oppoElement;
    // If the target element is the children of group then set the target element to group
    if (getCookie("username") === "") {
      document.getElementById("trigger-oopsie").click();
    } else {
      if (targetGroup.className !== "group") {
        targetGroup = targetGroup.parentNode;
      }

      icon = targetGroup.children[1];
      targetValue = targetGroup.children[2];
      count = Number(targetValue.innerHTML);

      icon.classList.toggle("active");
      // If the target element is like then:
      if (targetGroup.className.includes("Like")) {
        // Logic for checking if the dislike button has already been clicked before:
        let isDislikeActive = false;
        oppoElement = document.querySelector(".bi-heartbreak-fill.active");
        if (targetGroup.parentNode.contains(oppoElement)) {
          isDislikeActive = true;
        }

        // What to do if dislike is active:
        if (isDislikeActive) {
          // Get the current dislike value:
          let oppoTargetValue = oppoElement.parentNode.children[2];
          // And decrement it's count
          count = Number(oppoTargetValue.innerHTML);
          count--;

          // And remove the active className from it's icon:
          oppoElement.classList.remove("active");
          oppoTargetValue.innerHTML = count;
        }
        // If it is not clicked increase the count by one
        if (icon.className.includes("active")) {
          count++;
          // See if it already has been clicked before
        } else {
          // and reduce it by one
          count--;
        }
        // Else if the target element is dislike
      } else {
        // Logic for checking if the dislike button has already been clicked before:
        let isLikeActive = false;
        oppoElement = document.querySelector(".bi-heart-fill.active");
        if (targetGroup.parentNode.contains(oppoElement)) {
          isLikeActive = true;
        }
        // What to do if dislike is active:
        if (isLikeActive) {
          // Get the current dislike value:
          let oppoTargetValue = oppoElement.parentNode.children[2];
          // And decrement it's count
          count = Number(oppoTargetValue.innerHTML);
          count--;

          // And remove the active className from it's icon:
          oppoElement.classList.remove("active");
          oppoTargetValue.innerHTML = count;
        }
        // If it is not clicked increase the count by one
        if (icon.className.includes("active")) {
          count++;
          // See if it already has been clicked before
        } else {
          // and reduce it by one
          count--;
        }
      }
      targetValue.innerHTML = count;
    }
  }
  function reply() {
    if (getCookie("username") === "") {
      document.getElementById("trigger-oopsie").click();
    } else {
    }
  }
  return (
    <div className="mainContent">
      <div className="row post-topic">
        <div className="col-2 border-end border-light"></div>
        <div className="col-10">
          <div className="p-3">
            <h1>{postData.title}</h1>
            <hr />
            <div className="d-flex mt-3">
              {/* Side Buttons  */}
              <div className="d-flex flex-column me-4">
                <div className="group Like" onClick={like_dislike}>
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
                  </ul>
                </div>
                <div className="group" onClick={reply}>
                  <span className="tooltiptext">Reply</span>

                  <i className="bi bi-reply"></i>
                </div>
              </div>
              <div className="d-flex flex-column">
                <div
                  className="post-body"
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
                        Shared By:
                        <span className="sub-text ms-1">
                          <Link>{postData.postedBy?.username}</Link>
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
