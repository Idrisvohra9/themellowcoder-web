import React, { useRef, useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Logo from "./components/Logo";
import clickSound from "../static/Other/mixkit-arcade-game-jump-coin-216.wav";
import starFallSound from "../static/Other/stars-falling.mp3";
import CookieConsent from "./components/CookieConsent";
import { getCookie } from "../tools/cookies";
import LoginModal from "./components/Login";

export default function Layout() {
  const sidebar = useRef();
  const navbar = useRef();
  const starfall = useRef();
  const [starFall, setStarFall] = useState(0);
  const [online, setOnline] = useState(true);
  let pos = -116;
  var i = 0;
  let toTop = useRef();
  
  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      toTop.current.style.display = "block";
    } else {
      toTop.current.style.display = "none";
    }
  }
  window.onload = function () {
    toTop.current.style.display = "none";
    toTop.current.onclick = topFunction;
    window.onscroll = function () {
      scrollFunction();
    };
  };
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  function showCookieConsent() {
    // Checks for the user consent and does'nt ask again.
    if (getCookie("cookie-consent") === "false") {
      return <CookieConsent />;
    } else if (getCookie("cookie-consent") === "true") {
      // console.log("Ok");
      return "";
    }
  }
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      navbar.current.style.top = "0";
    } else {
      navbar.current.style.top = "-89px";
    }
    prevScrollpos = currentScrollPos;
  };

  function startFallingStars(e) {
    if (starFall === 0) {
      const starSound = new Audio(starFallSound);
      starSound.play();
      starfall.current.classList.remove("off")
      setStarFall(1);
    } else {
      e.stopPropagation();
      starfall.current.classLits.add("off");
    }
  }
  function slideBar() {
    i++;
    const click = new Audio(clickSound);
    click.play();
    let id = null;
    if (i % 2 === 0) {
      pos = 0;
      id = setInterval(frameOut, 1);
    } else {
      id = setInterval(frameIn, 1);
    }
    function frameIn() {
      if (pos === 0) {
        clearInterval(id);
      } else {
        pos += 2;
        sidebar.current.style.left = pos + "px";
      }
    }
    function frameOut() {
      if (pos === -116) {
        clearInterval(id);
      } else {
        pos -= 2;
        sidebar.current.style.left = pos + "px";
      }
    }
  }
  useEffect(() => {
    setTimeout(() => {
      navigator.onLine ? setOnline(true) : setOnline(false);
    }, 1000);
  }, []);
  return (
    <>
      {!online ? <div className="status">You are currently offline</div> : ""}
      <nav className="navbar" ref={navbar}>
        <section className="starfall off" ref={starfall}>
          <span className="stars"></span>
          <span className="stars"></span>
          <span className="stars"></span>
          <span className="stars"></span>
          <span className="stars"></span>
          <span className="stars"></span>
          <span className="stars"></span>
          <span className="stars"></span>
          <span className="stars"></span>
          <span className="stars"></span>
        </section>
        <Logo />
        <button className="sidebarIcon" onClick={() => slideBar()}>
          <svg width="800" height="800" viewBox="0 0 24 24" fill="none">
            <path
              d="M21.97 15V9c0-5-2-7-7-7h-6c-5 0-7 2-7 7v6c0 5 2 7 7 7h6c5 0 7-2 7-7z"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              opacity=".4"
              d="M7.97 2v20M14.97 9.44L12.41 12l2.56 2.56"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <NavLink to="/discuss" className="tab">
          Discuss
          <div className="highlight"></div>
        </NavLink>
        <NavLink to="/stories" className="tab">
          Stories
          <div className="highlight"></div>
        </NavLink>
        <svg
          viewBox="0 0 64 64"
          className="falling-star"
          onClick={(e) => startFallingStars(e)}
        >
          <title>Start Star fall</title>
          <path
            d="M58 25.72c-.38-.06-4.91 4.22-8.19 8a261.43 261.43 0 01-18.53 18.44c-5.16 4.4-8.28 4.5-11.63 3.9s-7.43-3-10.43-7.72S7 38.13 7.75 35.78a28.69 28.69 0 017.12-11.06c3.91-3.56 17.19-16 17.31-16.34S31.42 6.89 31 7.16C28.18 8.94 11.59 25.34 9.59 28.09a24.43 24.43 0 00-4.44 12.63c-.25 5.22 2 9 5.35 12.75s8.28 4.53 12.18 4.59 9.16-4.06 13.07-7.87S58.68 27.13 58.84 27s-.44-1.22-.84-1.28zM27.9 23c.07.28.5 1 .88.94S47.06 7.41 47.12 7.16s-.47-1.28-.94-1.22S27.78 22.43 27.9 23zm8.16 1.69c0 .22.56.93.91 1s18.5-16.75 18.59-17-.56-1.19-.94-1.13-18.52 16.79-18.56 17.1zm1.12 11.47c.19 0 15.66-14.75 15.88-15.13s-.69-1.28-.91-1.34-15.89 14.83-15.93 15.25.78 1.19.96 1.19zm-26.09-1.41c-.28.19-.59 1.56-.84 3.38s.4 6.21 4.4 10.06 12.16 4.19 12.57 4.09.34-1.31.21-1.5-.81-.34-1.84-.44-5.5-.5-10.53-4.93A9.19 9.19 0 0112.62 35c.1-.37-1.36-.37-1.53-.25zm25.44 9.31c.37-.53-2.91-8.25-3-8.47s3.66-5.84 3-6.53-8-.9-8.41-.93-5.09-5-5.81-4.5-1.91 7-2.06 7.37-5.64 4.67-5.91 5.09c-.65 1 .5 1.22 1.31 1.35s4.79.28 5 .4.81 5.75.93 7.38 1.2 1.41 1.42 1.28 4.78-3.87 5.09-4.12 8.06 2.21 8.44 1.68zm-8.88-3.43c-.56.15-3.84 3.53-4.09 3.34s-.75-6.63-1-7a1.63 1.63 0 00-1.37-.69c-.66-.06-3.91-.28-4.07-.62s4.88-3.85 4.91-4 .81-5.71 1.28-5.75 3.97 4 4.59 4.09 6.82 0 6.69.38-2.75 4.87-2.84 5.28 2.37 6.37 2.18 6.5-5.71-1.69-6.28-1.53zm-4-12.32a23 23 0 00-.62 4c.06.29.59.19.87.13s.57-3.69.57-4-.58-.44-.79-.13zM30 35.47c.09 0 .15-.5.12-.78s-1.57-.79-1.78-.69-.15.78-.06.94a7.41 7.41 0 001.72.53zm.5 2.28c.25-.09 0-.66-.28-.94a6.22 6.22 0 00-2-.59c-.22 0-.22.81-.13.94a8.6 8.6 0 002.44.59zm-2.44.38c-.19 0-.09 1 .06 1.09a27.14 27.14 0 003 .87c.28 0 0-.65-.15-.84a12.18 12.18 0 00-2.88-1.12z"
            fill="#d8d4cf"
          />
        </svg>
        <ul>
          <li className="nav-item dropdown">
            <div
              className="nav-link dropdown-toggle tab"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Handy Tools
            </div>
            <ul className="dropdown-menu">
              <li>
                <NavLink to="/OctoAI" className="dropdown-item">
                  Octo The AI
                </NavLink>
              </li>
              <li>
                <NavLink to="/Img2Webp" className="dropdown-item">
                  Image 2 Webp
                </NavLink>
              </li>
              <li>
                <NavLink to="/PlanCode" className="dropdown-item">
                  Plan Code
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
        {getCookie("username") ? (
          <NavLink to="/profile" className="tab">
            Profile
            <div className="highlight"></div>
          </NavLink>
        ) : (
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginReg">Login</button>
        )}
      </nav>
      <div className="sidebar" id="sidebar" ref={sidebar}>
        <div className="side-btns">
          <NavLink to="/explore" className="mainlinks">
            <svg fill="#fff" className="btns" viewBox="0 0 52.966 52.966">
              <path d="M51.704 51.273L36.845 35.82c3.79-3.801 6.138-9.041 6.138-14.82 0-11.58-9.42-21-21-21s-21 9.42-21 21 9.42 21 21 21c5.083 0 9.748-1.817 13.384-4.832l14.895 15.491a.998.998 0 001.414.028 1 1 0 00.028-1.414zM21.983 40c-10.477 0-19-8.523-19-19s8.523-19 19-19 19 8.523 19 19-8.524 19-19 19z" />
            </svg>

            <svg viewBox="0 0 483.049 483.049" className="arrow">
              <path
                fill="#242436"
                d="M121.155 241.524v241.525l240.739-241.525z"
              />
              <path fill="#353550" d="M121.155 0v241.524h240.739z" />
            </svg>

            <span className="internal-txt">Explore</span>
          </NavLink>

          <NavLink to="/Games" className="mainlinks">
            <svg className="btns" width="24" height="24" fill="none">
              <path
                d="M15.47 11.293a1 1 0 10-1.415 1.414 1 1 0 001.415-1.414zM16.177 9.172a1 1 0 111.414 1.414 1 1 0 01-1.414-1.414zM19.712 11.293a1 1 0 10-1.414 1.414 1 1 0 001.414-1.414zM16.177 13.414a1 1 0 111.414 1.415 1 1 0 01-1.414-1.415zM6 13H4v-2h2V9h2v2h2v2H8v2H6v-2z"
                fill="silver"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 5a7 7 0 000 14h10a7 7 0 100-14H7zm10 2H7a5 5 0 000 10h10a5 5 0 000-10z"
                fill="silver"
              />
            </svg>

            <svg viewBox="0 0 483.049 483.049" className="arrow">
              <path
                fill="#242436"
                d="M121.155 241.524v241.525l240.739-241.525z"
              />
              <path fill="#353550" d="M121.155 0v241.524h240.739z" />
            </svg>

            <span className="internal-txt">Games</span>
          </NavLink>
          <NavLink to="/mellowtunes" className="mainlinks">
            <svg
              width="800"
              height="800"
              className="btns"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                opacity=".4"
                d="M2.58 9.42c-.08 0-.17-.01-.25-.04a.763.763 0 01-.46-.96c.67-1.88 1.83-3.53 3.38-4.78.32-.26.79-.21 1.05.11s.21.79-.11 1.06a9.167 9.167 0 00-2.9 4.11c-.11.31-.4.5-.71.5zM2.58 16.08a.75.75 0 01-.71-.5c-.41-1.17-.62-2.37-.62-3.58 0-.41.34-.75.75-.75s.75.34.75.75c0 1.04.18 2.08.54 3.08.14.39-.07.82-.46.96-.08.03-.17.04-.25.04zM12 22.75c-1.06 0-2.11-.16-3.13-.47a.75.75 0 01-.5-.94c.12-.4.54-.62.94-.5.87.27 1.78.4 2.69.4 5.1 0 9.25-4.15 9.25-9.25 0-.52-.05-1.06-.15-1.63-.07-.41.2-.8.61-.87.4-.07.8.2.87.61.12.66.18 1.28.18 1.9-.01 5.93-4.83 10.75-10.76 10.75zM5.72 20.5a.7.7 0 01-.47-.17c-.57-.46-1.03-.9-1.42-1.35a.757.757 0 01.08-1.06c.32-.27.79-.23 1.06.08.33.38.73.76 1.22 1.16.32.26.37.73.11 1.05a.72.72 0 01-.58.29zM20.24 7.09a.74.74 0 01-.62-.33A9.244 9.244 0 009.31 3.14a.76.76 0 01-.94-.5c-.13-.4.1-.82.5-.94 1.02-.31 2.07-.47 3.13-.47 3.54 0 6.85 1.75 8.86 4.67.23.34.15.81-.19 1.04-.13.11-.28.15-.43.15z"
                fill="#fff"
              />
              <path
                d="M16.03 6.5c-.33-.25-.93-.5-1.89-.24l-3.19.86c-.92.26-1.52 1.04-1.52 2v4.22c-.26-.1-.54-.16-.84-.16-1.29 0-2.34 1.05-2.34 2.34 0 1.29 1.05 2.34 2.34 2.34 1.28 0 2.31-1.03 2.33-2.3 0-.01.01-.02.01-.04v-4.19l4.32-1.18v2.13c-.26-.1-.54-.16-.84-.16-1.29 0-2.34 1.05-2.34 2.34 0 1.29 1.05 2.34 2.34 2.34 1.29 0 2.34-1.05 2.34-2.34V8.25c0-.8-.24-1.39-.72-1.75zm-7.44 9.86c-.46 0-.84-.38-.84-.84 0-.46.38-.84.84-.84.46 0 .84.38.84.84 0 .46-.38.84-.84.84zm5.82-1.06c-.46 0-.84-.38-.84-.84 0-.46.38-.84.84-.84.46 0 .84.38.84.84 0 .46-.38.84-.84.84z"
                fill="silver"
              />
            </svg>

            <svg viewBox="0 0 483.049 483.049" className="arrow">
              <path
                fill="#242436"
                d="M121.155 241.524v241.525l240.739-241.525z"
              />
              <path fill="#353550" d="M121.155 0v241.524h240.739z" />
            </svg>
            <span className="internal-txt">Mellow Tunes</span>
          </NavLink>
          <NavLink to="/IqTest" className="mainlinks">
            <svg
              width="800"
              height="800"
              className="btns"
              viewBox="0 0 256 256"
            >
              <path d="M248 132a56.121 56.121 0 00-32-50.61V72a47.983 47.983 0 00-88-26.493A47.983 47.983 0 0040 72v9.39a56.003 56.003 0 000 101.196V184a47.983 47.983 0 0088 26.493A47.983 47.983 0 00216 184v-1.414A56.067 56.067 0 00248 132zM88 216a32.043 32.043 0 01-31.812-28.557A56.174 56.174 0 0064 188h8a8 8 0 000-16h-8a40.008 40.008 0 01-13.334-77.726 8 8 0 005.333-7.542L56 72a32 32 0 0164 0v76.261A47.803 47.803 0 0088 136a8 8 0 000 16 32 32 0 010 64zm104-44h-8a8 8 0 000 16h8a56.174 56.174 0 007.812-.557A31.999 31.999 0 11168 152a8 8 0 000-16 47.803 47.803 0 00-32 12.261V72a32 32 0 1164 0l.001 14.732a8 8 0 005.333 7.542A40.008 40.008 0 01192 172zM60 128a8 8 0 010-16 20.023 20.023 0 0020-20v-8a8 8 0 0116 0v8a36.04 36.04 0 01-36 36zm144-8a8 8 0 01-8 8 36.04 36.04 0 01-36-36v-8a8 8 0 0116 0v8a20.023 20.023 0 0020 20 8 8 0 018 8z" />
            </svg>

            <svg viewBox="0 0 483.049 483.049" className="arrow">
              <path
                fill="#242436"
                d="M121.155 241.524v241.525l240.739-241.525z"
              />
              <path fill="#353550" d="M121.155 0v241.524h240.739z" />
            </svg>

            <span className="internal-txt">IQ Test</span>
          </NavLink>

          <NavLink to="/Themes" className="mainlinks">
            <svg viewBox="0 0 370.589 370.589">
              <path d="M5.806 224.753c-7.741 7.741-7.741 20.291.002 28.034l10.114 10.114 24.18-9.46-9.112 24.529 50.811 50.812 39.014-22.66-19.858 41.815 16.843 16.844c7.743 7.743 20.293 7.743 28.034.002l91.812-91.812-140.028-140.03-91.812 91.812zM358.83 11.841l-.082-.083c-9.66-9.66-21.981-13.478-35.631-11.043-27.59 4.924-56.519 34.861-77.384 80.087-5.788 12.546-13.997 19.607-25.101 21.588-21.311 3.803-48.293-11.741-64.344-27.792a8.61 8.61 0 00-12.176.001l-16.685 16.686 24.651 24.651a8.197 8.197 0 010 11.594 8.197 8.197 0 01-11.594 0l-24.651-24.651-6.178 6.178a8.61 8.61 0 00-.002 12.178l139.703 139.703c3.361 3.361 8.812 3.36 12.177-.002l34.458-34.458a8.613 8.613 0 00.001-12.177c-16.051-16.051-31.595-43.034-27.792-64.344 1.98-11.103 9.042-19.312 21.588-25.1 45.226-20.865 75.163-49.793 80.087-77.383 2.434-13.652-1.385-25.973-11.045-35.633zm-15.774 36.905c-5.857 5.857-15.354 5.857-21.213 0-5.856-5.858-5.856-15.355 0-21.213 5.858-5.858 15.355-5.858 21.213 0 5.858 5.858 5.858 15.355 0 21.213z" />
            </svg>
            <svg viewBox="0 0 483.049 483.049" className="arrow">
              <path
                fill="#242436"
                d="M121.155 241.524v241.525l240.739-241.525z"
              />
              <path fill="#353550" d="M121.155 0v241.524h240.739z" />
            </svg>

            <span className="internal-txt">Themes</span>
          </NavLink>
          <NavLink to="/PsychExperiments" className="mainlinks">
            <svg
              height="800"
              width="800"
              className="btns"
              viewBox="0 0 512.001 512.001"
            >
              <path
                d="M299.558 340.272v77.233c0 46.554 37.74 84.294 84.294 84.294 46.554 0 84.294-37.74 84.294-84.294v-77.233H299.558z"
                fill="#fff"
              />
              <path
                d="M468.146 263.038c0-46.554-37.74-84.294-84.294-84.294-46.554 0-84.294 37.74-84.294 84.294v77.233h168.589l-.001-77.233z"
                fill="#ff757c"
              />
              <path
                d="M123.113 89.456L68.5 144.069c-32.919 32.919-32.919 86.292 0 119.21 32.919 32.919 86.292 32.919 119.21 0l54.612-54.612L123.113 89.456z"
                fill="#fff"
              />
              <path
                d="M296.934 154.056c32.919-32.919 32.919-86.292 0-119.21-32.919-32.919-86.292-32.919-119.21 0l-54.612 54.612 119.21 119.21 54.612-54.612z"
                fill="#ff757c"
              />
              <g fill="#603813">
                <path d="M478.346 263.039c0-52.105-42.391-94.495-94.495-94.495s-94.495 42.39-94.495 94.495v154.467c0 52.104 42.39 94.495 94.495 94.495 52.105 0 94.495-42.39 94.495-94.495V263.039zm-168.588 0c0-40.855 33.238-74.094 74.094-74.094s74.094 33.239 74.094 74.094v67.033H309.758v-67.033zm148.187 154.466c0 40.855-33.239 74.094-74.094 74.094s-74.094-33.238-74.094-74.094v-67.033h148.189l-.001 67.033zM304.148 161.268c36.843-36.844 36.843-96.792 0-133.635-36.845-36.844-96.793-36.844-133.636 0L61.288 136.856c-36.844 36.844-36.844 96.793 0 133.636 18.421 18.421 42.62 27.632 66.818 27.632s48.395-9.211 66.818-27.632l109.224-109.224zm-123.651 94.799c-28.889 28.89-75.896 28.89-104.784 0-28.89-28.89-28.89-75.896 0-104.784l47.399-47.4 104.785 104.785-47.4 47.399zm61.826-61.825L137.538 89.456l47.4-47.399c28.89-28.89 75.896-28.889 104.784 0 28.89 28.89 28.89 75.896 0 104.784l-47.399 47.401z" />
                <path d="M438.56 436.519c5.634 0 10.2-4.567 10.2-10.2v-2.04c0-5.634-4.567-10.2-10.2-10.2s-10.2 4.567-10.2 10.2v2.04c0 5.634 4.567 10.2 10.2 10.2zM438.56 402.859c5.634 0 10.2-4.567 10.2-10.2v-21.42c0-5.634-4.567-10.2-10.2-10.2s-10.2 4.567-10.2 10.2v21.42c0 5.633 4.567 10.2 10.2 10.2z" />
              </g>
            </svg>

            <svg viewBox="0 0 483.049 483.049" className="arrow">
              <path
                fill="#242436"
                d="M121.155 241.524v241.525l240.739-241.525z"
              />
              <path fill="#353550" d="M121.155 0v241.524h240.739z" />
            </svg>

            <span className="internal-txt">Psych Experiments</span>
          </NavLink>
        </div>
      </div>
      <button className="scroll-to-top" ref={toTop}>
        <svg
          height="28"
          width="28"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 511.867 511.867"
        >
          <path d="M508.827 350.027L263.493 104.373a10.955 10.955 0 00-15.147 0L3.12 350.027a10.623 10.623 0 000 15.04l42.24 42.347a10.955 10.955 0 0015.147 0L255.92 211.68l195.52 195.733a10.623 10.623 0 0015.04 0l42.347-42.347c4.053-4.159 4.053-10.879 0-15.039zM459.013 384.8l-195.52-195.733a10.623 10.623 0 00-15.04 0L52.933 384.8l-27.2-27.307L255.92 126.987l230.293 230.507-27.2 27.306z" />
        </svg>
      </button>
      {showCookieConsent()}
      <LoginModal/>
      <Outlet />
    </>
  );
}