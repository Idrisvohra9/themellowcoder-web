import React from "react";
import useLoader from "../Hooks/useLoader";
export default function Profile() {
  useLoader();

  return (
    <div className="mainContent profile header__wrapper">
      <header></header>
      <div className="cols__container">
        <div className="left__col">
          <div className="img__container">
            <img src="" alt="User DP" />
            <span></span>
          </div>
          <h2>Username</h2>
          <p>Web Designer</p>
          <p>JD108.com</p>

          <ul className="about">
            <li>
              <span>1080</span>Followers
            </li>
            <li>
              <span>1080</span>Following
            </li>
            <li>
              <span>1080</span>points
            </li>
          </ul>

          <div className="content">
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam
              erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl
              ligula egestas nulla.
            </p>

            <ul>
              <li>
                <i> twitter</i>
              </li>
              <i>pinterest</i>
              <i> linkdin</i>
              <i>facebook</i>
            </ul>
          </div>
        </div>
        <div className="right__col">
          <nav>
            <ul>
              <li>
                <a href="">posts</a>
              </li>
              <li>
                <a href="">stories</a>
              </li>
              <li>
                <a href="">groups</a>
              </li>
              <li>
                <a href="">about</a>
              </li>
            </ul>
            <button>Follow</button>
          </nav>

          <div className="posts"></div>
        </div>
      </div>
    </div>
  );
}
