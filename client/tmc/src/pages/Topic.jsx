import React from "react";
import useLoader from "../Hooks/useLoader";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
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
  function like_dislike(e) {
    let targetGroup = e.target;
    let icon, targetValue, count;
    let oppoElement;
    // If the target element is the children of group then set the target element to group
    if (targetGroup.className != "group") {
      targetGroup = targetGroup.parentNode;
    }

    icon = targetGroup.children[0];
    targetValue = targetGroup.children[1];
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
      if(isDislikeActive){
        // Get the current dislike value:
        let oppoTargetValue = oppoElement.parentNode.children[1];
        // And decrement it's count
        count = Number(oppoTargetValue.innerHTML);
        count--;

        // And remove the active class from it's icon:
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
      if(isLikeActive){
        // Get the current dislike value:
        let oppoTargetValue = oppoElement.parentNode.children[1];
        // And decrement it's count
        count = Number(oppoTargetValue.innerHTML);
        count--;

        // And remove the active class from it's icon:
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
  return (
    <div className="mainContent">
      <div className="row post-topic">
        <div className="col-2 border-end border-light"></div>
        <div className="col-10">
          <div className="p-3">
            <h1>{title}</h1>
            <div className="d-flex mt-3">
              {/* Side Buttons  */}
              <div className="d-flex flex-column me-4">
                <div className="group Like" onClick={like_dislike}>
                  <i className="bi bi-heart-fill"></i>
                  <div className="count">{likeCount}</div>
                </div>
                <div className="group Dislike" onClick={like_dislike}>
                  <i className="bi bi-heartbreak-fill"></i>
                  <div className="count">{dislikeCount}</div>
                </div>
                <div className="group">
                  <i className="bi bi-three-dots"></i>
                </div>
                <div className="group">
                  <i className="bi bi-reply"></i>
                </div>
              </div>
              <div className="post-body">
                {postBody}
                <div className="d-flex justify-content-start mt-2 mb-2 align-self-end">
                  {tags.map((tag, id) => (
                    <span className="post-tag" key={id}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="d-flex justify-content-start mb-2 align-self-end">
                <div className="box">
                  <div>
                    Shared By:
                    <span className="sub-text ms-1">
                      <Link>{postedBy}</Link>
                    </span>
                  </div>
                  <div>
                    Shared At:<span className="sub-text ms-1">{date}</span>
                  </div>
                </div>
              </div>
              {/* end Side Buttons  */}
            </div>
            <div className="mt-3">
              <h3>Replies</h3>
              <div className="container">
                <div className="reply-form">
                  <input
                    className="reply-input"
                    placeholder="Share your thoughts"
                    required=""
                    type="text"
                  />
                  <span className="input-border"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
