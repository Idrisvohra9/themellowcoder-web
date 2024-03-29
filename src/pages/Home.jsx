import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import useLoader from "../Hooks/useLoader";
export default function Home() {
  useLoader();
  return (
    <div className="">
      <div className="d-flex justify-content-center mt-5 flex-column align-items-center mb-5">
        <h1>themellowcoder or The Mellow Coder</h1>
        <b className="w-75 text-center">
          Is a multi-functional website for developers world-wide with many free
          tools and features that focus on fun with productivity.
        </b>
        <b className="w-75 text-center mt-5">
          <h3>Below are some of the functionality it offers:</h3>
        </b>
      </div>
      <div className="d-flex justify-content-between align-items-center p-5 jumbotron discussion-header-bg">
        <div className="d-flex align-items-start flex-column w-75">
          <Link to="/discuss" className="link">
            <h1>Connect With people</h1>
          </Link>
          <b>
            Share your projects, doubts, or just use the platform to help others
            and connect with others.
          </b>
          <q>
            It is literally true that you can succeed best and quickest by
            helping others to succeed.
          </q>
        </div>
        <div>
          <svg width="800" height="800" viewBox="0 0 64 64" aria-hidden="true">
            <path
              fill="#d8d4cf"
              d="M49.725 16.293c-.027.27-.043.578-.05.912l-3.834 1.831c-.537-.088-3.2.067-7.172-1.893-1.007-.497-1.991-.761-2.936-.761a5.41 5.41 0 00-2.459.595c-1.003-.217-2.448-.773-3.293-.771-1.912.01-6.259 1.567-7.463 1.7-1.178.129-2.391.453-3.612.969-2.219-.646-5.001-1.701-6.491-2.284L2 9v24.41l7.654 3.642c.111-.13.238-.33.376-.578l.237.11c.116.3.244.599.384.896-.84 1.414-.94 3.007-.269 4.392.575 1.185 1.646 2.017 2.839 2.25.065.738.313 1.452.731 2.071.75 1.107 1.942 1.768 3.191 1.768.113 0 .226-.005.338-.018.178.481.439.929.778 1.317.754.867 1.81 1.364 2.896 1.364.08 0 .158-.002.237-.008.138.524.373 1.02.701 1.462.755 1.02 1.92 1.627 3.118 1.627.744 0 1.455-.228 2.082-.655 1.212.778 2.266 1.325 3.201 1.661.469.191.957.289 1.455.289 1.178 0 2.321-.55 3.137-1.512.303-.358.549-.758.729-1.186a3.78 3.78 0 001.087.162c1.252 0 2.439-.613 3.26-1.685a4.715 4.715 0 00.83-1.711c.086.006.171.009.256.009 1.447 0 2.832-.849 3.611-2.216a4.735 4.735 0 00.629-2.336c1.43-.213 2.689-1.23 3.302-2.713.604-1.461.44-3.073-.403-4.417l3.895-2.195c.1.342.198.657.293.913L62 31.098V10.642l-12.275 5.651m-.001 3.037c.062 1.082.175 2.305.321 3.582-.8-1.344-1.81-1.957-3.064-2.262l2.743-1.32m-5.228 23.756c-2.148-.739-6.619-5.995-6.619-5.995h.088c.455-.032 1.438-.511 2.541-.282-1.732-1.488-3.637-.229-4.934-1 .301.965 1.748 1.269 2.119 1.281l4.284 4.982c1.94 2.255.589 5.045-1.356 5.489-1.305-.635-4.99-5.018-4.99-5.018.126-.023.873-.257 1.634-.157-1.757-1.314-3.749-.174-4.931-.999.67 1.655 2.877 1.231 3.108 1.191l2.292 2.926c1.834 2.34.393 5.043-1.555 5.409-1.727-.607-2.848-2.767-2.848-2.767.174-.028.756-.287 1.584-.167-1.473-1.291-3.188-.12-4.219-.855.637 1.388 2.225 1.072 2.314 1.062 1.588 2.501-.059 5.109-2.027 5.187h-.002l-.002.001c-1.182-.205-2.42-1.15-3.818-2.12.48-.532.904-1.467.904-1.467 1.404-2.542-.418-4.79-2.299-4.597 1.526.417 2.67 2.365 1.479 4.528l-.523.88c-.568 1.035-1.455 1.66-2.107 1.583-1.004-.122-2.419-1.588-1.824-3.656.23-.21 2.448-3.603 2.448-3.603 1.525-2.456-.187-4.807-2.073-4.727 1.502.507 2.555 2.521 1.26 4.611l-1.803 2.811c-.615.994-1.411 1.557-2.17 1.453-1.178-.16-2.004-1.597-1.815-3.08-.01.009 1.298-1.454 1.298-1.454 1.738-2.271.25-4.807-1.633-4.94 1.447.674 2.309 2.798.832 4.731l-.638.782c-.7.918-1.543 1.385-2.281 1.201-1.288-.323-1.958-2.733-1.349-3.39.479-.517 1.824-2.154 1.824-2.154 1.737-2.272.251-4.807-1.634-4.942 1.448.676 2.31 2.8.833 4.734l-.638.78c-.704.926-1.55 1.391-2.293 1.202-1.548-.392-2.321-2.782-.84-4.722 0 0-.503-1.598-.73-2.281l-.746-.346c1.749-4.075 4.391-13.069 4.513-16.057 1.288.459 4.688 1.437 5.049 1.439l-.002.002c3.66-1.15 7.496-1.023 9.246-1.699.567-.216 1.695-.23 2.891.454-.747.655-1.453 1.435-2.186 2.162-1.752 1.739-8.266 4.451-7.01 7.303 1.084 2.461 4.137 4.979 9.258 1.026l2.88-.396 4.479 2.21 5.74 5.895c2.047 2.098.888 4.946-1.003 5.556m1.44-6.495c-.658-1.23-2.709-3.247-4.645-4.896l-.012-.012c.893.036 1.83-1.402 3.041-1.513-.846-.646-2.248.1-2.685.218-2.409.648-6.153-2.383-6.153-2.383l-3.582.516s-4.26 5.199-7.849.916c-1.949-2.326 5.114-5.364 6.854-7.093 2.229-2.215 4.215-4.925 7.882-3.079 3.046 1.536 4.246 1.441 8.332 2.152 1.218.213 2.062.771 2.967 1.86.426 3.584 1.115 7.559 1.776 10.325-.341.287-3.264 2.253-5.926 2.989"
            />
          </svg>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center p-5 jumbotron story-header-bg">
        <div>
          <svg width="800" height="800" viewBox="0 0 24 24" fill="none">
            <path
              d="M16.42 7.95a6.253 6.253 0 010 8.84 6.253 6.253 0 01-8.84 0 6.253 6.253 0 010-8.84 6.253 6.253 0 018.84 0z"
              fill="#292D32"
            />
            <path
              opacity=".4"
              d="M8.25 22.39c-.09 0-.19-.02-.28-.05-2.25-.9-4.07-2.49-5.29-4.59a10.6 10.6 0 01-1.341-6.73c.05-.41.44-.7.84-.65.41.05.7.43.65.84-.26 2.02.14 4.02 1.15 5.78a9.104 9.104 0 004.54 3.94c.38.16.57.59.42.98-.11.3-.4.48-.69.48zM5.85 5.23c-.22 0-.44-.1-.59-.29-.26-.33-.2-.8.13-1.05C7.3 2.4 9.58 1.61 12 1.61c2.36 0 4.61.76 6.5 2.2A.749.749 0 1117.59 5 9.111 9.111 0 0012 3.11c-2.08 0-4.05.68-5.69 1.96-.14.11-.3.16-.46.16zM15.75 22.39c-.3 0-.58-.18-.7-.47a.76.76 0 01.42-.98c1.93-.78 3.5-2.14 4.54-3.94a9.044 9.044 0 001.15-5.78c-.05-.41.24-.79.65-.84.4-.05.79.24.84.65.3 2.35-.16 4.68-1.34 6.73-1.21 2.1-3.04 3.68-5.29 4.59-.08.02-.17.04-.27.04z"
              fill="#292D32"
            />
          </svg>
        </div>
        <div className="d-flex align-items-start flex-column w-75">
          <Link to="/stories" className="link">
            <h1>Become a creator of TMC Stories!</h1>
          </Link>
          <b>
            TMC Stories are basically quick informative text with a supportive
            image that expires after 48 hours.
          </b>
          <b>
            It is a fast way to get informed about latest news or advancements
            in the field.
          </b>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center p-5 jumbotron octo-header-bg">
        <div className="d-flex align-items-start flex-column w-75">
          <Link to="/OctoAI" className="link">
            <h1>Meet Octo the AI</h1>
          </Link>
          <b>
            Octo the AI is your virtual assitant that has a huge brain, simple
            answers and soulless stare.
          </b>
        </div>
        <div>
          <svg width="800" height="800" viewBox="0 0 36 36" aria-hidden="true">
            <path
              fill="#553788"
              d="M10 12c3 5 0 10.692-3 9.692s-4 2-1 3 9.465-.465 13-4c1-1 2-1 2-1L10 12z"
            />
            <path
              fill="#553788"
              d="M26 12c-3 5 0 10.692 3 9.692s4 2 1 3-9.465-.465-13-4c-1-1-2-1-2-1L26 12z"
            />
            <path
              fill="#744EAA"
              d="M30.188 16c-3 5 0 10.692 3 9.692s4 2 1 3-9.465-.465-13-4c-1-1-2-1-2-1l11-7.692zM5.812 16c3 5 0 10.692-3 9.692s-4 2-1 3 9.465-.465 13-4c1-1 2-1 2-1L5.812 16z"
            />
            <path
              fill="#9266CC"
              d="M33.188 31.375c-2.729.91-6.425-5.626-4.812-10.578C30.022 17.554 31 13.94 31 11c0-7.18-5.82-11-13-11S5 3.82 5 11c0 2.94.978 6.554 2.624 9.797 1.613 4.952-2.083 11.488-4.812 10.578-3-1-4 3-1 4s8.31-.627 12-4c2.189-2 4.189-2 4.189-2s2 0 4.188 2c3.69 3.373 9 5 12 4s1.999-5-1.001-4z"
            />
            <circle fill="#292F33" cx="14" cy="21" r="2" />
            <circle fill="#292F33" cx="22" cy="21" r="2" />
          </svg>{" "}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center p-5 jumbotron mellowtunes-header-bg">
        <div>
          <svg
            width="800"
            height="800"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
        </div>
        <div className="d-flex align-items-start flex-column w-75">
          <Link to="/mellowtunes" className="link">
            <h1>Listen to mellow tunes while browsing the internet.</h1>
          </Link>
          <b>
            Our music selection updates almost daily and is focused on improving
            your productivity.
          </b>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center p-5 jumbotron planCode-header-bg">
        <div className="d-flex align-items-start flex-column w-75">
          <h1>Our Popular must have tools</h1>
          <Link to="/PlanCode" className="link mt-2">
            <h2>Plan Code</h2>
          </Link>
          <b>
            A simple visual planning (Algorithm) for your upcoming projects.
          </b>
          <svg viewBox="0 0 490 490">
            <path
              d="M10 372.5h405a9.996 9.996 0 007.071-2.929l65-65c1.912-1.913 2.904-4.47 2.905-7.071H490v-245c0-5.522-4.477-10-10-10H10c-5.523 0-10 4.478-10 10v310c0 5.522 4.477 10 10 10zm415-34.143V307.5h30.858L425 338.357zM20 62.5h450v225h-55c-5.523 0-10 4.478-10 10v55H20v-290z"
              fill="silver"
            />
            <path
              d="M350 92.5H250c-5.523 0-10 4.478-10 10v15h-25c-5.523 0-10 4.478-10 10v75h-80v-35h55c5.523 0 10-4.478 10-10v-60c0-5.522-4.477-10-10-10H60c-5.523 0-10 4.478-10 10v60c0 5.522 4.477 10 10 10h45v45c0 5.522 4.477 10 10 10h90v70c0 5.522 4.477 10 10 10h25v10c0 5.522 4.477 10 10 10h100c5.523 0 10-4.478 10-10v-50c0-5.522-4.477-10-10-10H250c-5.523 0-10 4.478-10 10v20h-15v-60h15v10c0 5.522 4.477 10 10 10h100c5.523 0 10-4.478 10-10v-50c0-5.522-4.477-10-10-10H250c-5.523 0-10 4.478-10 10v20h-15v-65h15v15c0 5.522 4.477 10 10 10h100c5.523 0 10-4.478 10-10v-50c0-5.522-4.477-10-10-10zm-280 55v-40h100v40H70zm190 125h80v30h-80v-30zm0-80h80v30h-80v-30zm80-50h-80v-30h80v30zM50 247.5h75v20H50zM50 277.5h75v20H50zM50 307.5h130v20H50z"
              fill="silver"
            />
            <path
              d="M135 247.5h20v20h-20zM380 92.5h25v20h-25zM420 92.5h25v20h-25zM380 122.5h25v20h-25zM420 122.5h25v20h-25zM380 152.5h25v20h-25zM420 152.5h25v20h-25zM380 182.5h25v20h-25zM420 182.5h25v20h-25zM483.162 408.013l-60-20a9.983 9.983 0 00-3.162-.498v-.015H10c-5.523 0-10 4.478-10 10v40c0 5.522 4.477 10 10 10h410.001a9.995 9.995 0 003.161-.513l60-20a10.001 10.001 0 000-18.974zM60 427.5H20v-20h40v20zm350 0H80v-20h330v20zm20-3.874v-12.252l18.377 6.126L430 423.626z"
              fill="silver"
            />
          </svg>
        </div>
        <div>
          <svg width="800" height="800" viewBox="0 0 24 24">
            <g fill="none" fillRule="evenodd">
              <path d="M24 0v24H0V0h24zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018zm.265-.113l-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022zm-.715.002a.023.023 0 00-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092z" />
              <path
                d="M7.527 2.657a7.001 7.001 0 018.26 9.347l4.599 3.893a3.3 3.3 0 11-4.651 4.65l-3.891-4.597a7.001 7.001 0 01-9.35-8.26 1.01 1.01 0 011.72-.432l3.045 3.307 2.297-.845.847-2.3-3.309-3.04a1.01 1.01 0 01.433-1.723z"
                fill="#09244B"
              />
            </g>
          </svg>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center p-5 jumbotron explore-header-bg">
        <div>
          <svg
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52.966 52.966"
          >
            <path d="M51.704 51.273L36.845 35.82c3.79-3.801 6.138-9.041 6.138-14.82 0-11.58-9.42-21-21-21s-21 9.42-21 21 9.42 21 21 21c5.083 0 9.748-1.817 13.384-4.832l14.895 15.491a.998.998 0 001.414.028 1 1 0 00.028-1.414zM21.983 40c-10.477 0-19-8.523-19-19s8.523-19 19-19 19 8.523 19 19-8.524 19-19 19z" />
          </svg>
        </div>
        <div className="d-flex align-items-start flex-column w-75">
          <Link to="/explore" className="link">
            <h1>Find fun new profiles and create one yourself!.</h1>
          </Link>
          <b>
            Unlock full potential of the site by creating a proile and joining
            the community also sign up for that.
          </b>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center p-5 jumbotron themes-header-bg">
        <div className="d-flex align-items-start flex-column w-75">
          <Link to="/Themes" className="link">
            <h1>Change the appearance of the website, Try out new themes.</h1>
          </Link>
          <b>
            We have many themes for you to choose according to your preferences.
          </b>
        </div>
        <div>
          <svg viewBox="0 0 370.589 370.589">
            <path
              fill="#a313a8"
              d="M5.806 224.753c-7.741 7.741-7.741 20.291.002 28.034l10.114 10.114 24.18-9.46-9.112 24.529 50.811 50.812 39.014-22.66-19.858 41.815 16.843 16.844c7.743 7.743 20.293 7.743 28.034.002l91.812-91.812-140.028-140.03-91.812 91.812zM358.83 11.841l-.082-.083c-9.66-9.66-21.981-13.478-35.631-11.043-27.59 4.924-56.519 34.861-77.384 80.087-5.788 12.546-13.997 19.607-25.101 21.588-21.311 3.803-48.293-11.741-64.344-27.792a8.61 8.61 0 00-12.176.001l-16.685 16.686 24.651 24.651a8.197 8.197 0 010 11.594 8.197 8.197 0 01-11.594 0l-24.651-24.651-6.178 6.178a8.61 8.61 0 00-.002 12.178l139.703 139.703c3.361 3.361 8.812 3.36 12.177-.002l34.458-34.458a8.613 8.613 0 00.001-12.177c-16.051-16.051-31.595-43.034-27.792-64.344 1.98-11.103 9.042-19.312 21.588-25.1 45.226-20.865 75.163-49.793 80.087-77.383 2.434-13.652-1.385-25.973-11.045-35.633zm-15.774 36.905c-5.857 5.857-15.354 5.857-21.213 0-5.856-5.858-5.856-15.355 0-21.213 5.858-5.858 15.355-5.858 21.213 0 5.858 5.858 5.858 15.355 0 21.213z"
            />
          </svg>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center p-5 jumbotron games-header-bg">
        <div className="d-flex justify-content-evenly mb-4">
          <svg
            viewBox="0 0 1069 1069"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
          >
            <path fill="none" d="M0 0h1066.67v1066.67H0z" />
            <path d="M434.469 693.912h200.523a186.116 186.116 0 0085.747 109.508 186.168 186.168 0 00141.267 18.598l.106-.029a186.165 186.165 0 00131.64-228.007l-54.48-203.323a186.165 186.165 0 00-228.007-131.64l-.107.029a186.112 186.112 0 00-73.63 39.042c.013-.012-205.608-.012-205.608-.012a186.09 186.09 0 00-73.617-39.031l-.106-.028a186.168 186.168 0 00-228.007 131.64L75.709 593.982a186.168 186.168 0 00131.64 228.007l.107.029a186.169 186.169 0 00141.267-18.598 186.118 186.118 0 0085.746-109.508zm254.788-38.789c-7.111-24.401-29.867-23.713-30.333-23.711-125.182.391-248.387 0-248.387 0-16.192.388-27 11.117-30.332 23.711-2.122 8.02-3.362 12.53-4.992 18.63-2.627 9.835-2.635 9.833-.12.449a123.668 123.668 0 01-151.461 87.445l-.107-.028a123.664 123.664 0 01-87.445-151.461l54.48-203.323a123.669 123.669 0 01151.46-87.446l.107.029a123.654 123.654 0 0155.438 32.007 31.249 31.249 0 0022.097 9.153h230.137a31.247 31.247 0 0022.097-9.153 123.654 123.654 0 0155.438-32.007l.107-.029a123.668 123.668 0 01151.461 87.446l54.48 203.323a123.668 123.668 0 01-87.446 151.461l-.107.028a123.668 123.668 0 01-151.206-86.51l-5.366-20.014zm-254.973 38.789h-.014l-.085.229-.654 1.495c.268-.564.52-1.139.753-1.724zM284.731 460.784h-31.026c-17.247 0-31.25 14.003-31.25 31.25s14.003 31.25 31.25 31.25h31.026v31.026c0 17.247 14.002 31.25 31.25 31.25 17.247 0 31.25-14.003 31.25-31.25v-31.026h31.025c17.248 0 31.25-14.003 31.25-31.25s-14.002-31.25-31.25-31.25h-31.025v-31.026c0-17.247-14.003-31.25-31.25-31.25-17.248 0-31.25 14.003-31.25 31.25v31.026z" />
            <path
              d="M720.632 552.486c0-18.253 14.819-33.073 33.073-33.073 18.254 0 33.073 14.82 33.073 33.073 0 18.254-14.819 33.074-33.073 33.074-18.254 0-33.073-14.82-33.073-33.074zm93.525-93.525c18.254 0 33.074 14.819 33.074 33.073 0 18.254-14.82 33.073-33.074 33.073-18.253 0-33.073-14.819-33.073-33.073 0-18.254 14.82-33.073 33.073-33.073zm-120.904 0c18.253 0 33.073 14.819 33.073 33.073 0 18.254-14.82 33.073-33.073 33.073-18.254 0-33.074-14.819-33.074-33.073 0-18.254 14.82-33.073 33.074-33.073zm27.379-27.379c0-18.254 14.819-33.074 33.073-33.074 18.254 0 33.073 14.82 33.073 33.074 0 18.253-14.819 33.073-33.073 33.073-18.254 0-33.073-14.82-33.073-33.073z"
              fillOpacity=".5"
            />
          </svg>
          <svg width="800" height="800" viewBox="0 0 256 256">
            <path d="M248 132a56.121 56.121 0 00-32-50.61V72a47.983 47.983 0 00-88-26.493A47.983 47.983 0 0040 72v9.39a56.003 56.003 0 000 101.196V184a47.983 47.983 0 0088 26.493A47.983 47.983 0 00216 184v-1.414A56.067 56.067 0 00248 132zM88 216a32.043 32.043 0 01-31.812-28.557A56.174 56.174 0 0064 188h8a8 8 0 000-16h-8a40.008 40.008 0 01-13.334-77.726 8 8 0 005.333-7.542L56 72a32 32 0 0164 0v76.261A47.803 47.803 0 0088 136a8 8 0 000 16 32 32 0 010 64zm104-44h-8a8 8 0 000 16h8a56.174 56.174 0 007.812-.557A31.999 31.999 0 11168 152a8 8 0 000-16 47.803 47.803 0 00-32 12.261V72a32 32 0 1164 0l.001 14.732a8 8 0 005.333 7.542A40.008 40.008 0 01192 172zM60 128a8 8 0 010-16 20.023 20.023 0 0020-20v-8a8 8 0 0116 0v8a36.04 36.04 0 01-36 36zm144-8a8 8 0 01-8 8 36.04 36.04 0 01-36-36v-8a8 8 0 0116 0v8a20.023 20.023 0 0020 20 8 8 0 018 8z" />
          </svg>
        </div>
        <div className="d-flex align-items-center flex-column justify-content-center">
          <h1>Play Games and test your IQ!</h1>
          <Link to="/Games" className="link">
            <h2>Try out Games</h2>
          </Link>
          <b>They improve your focus and reflexes.</b>
          <Link to="/IqTest" className="link mt-3">
            <h2>IQ Tester</h2>
          </Link>
          <b>
            Test your IQ by answering series of questions. Choose a category and
            begin.
          </b>
        </div>
      </div>
      <div className="jumbotron d-flex justify-content-center align-items-center">
        <h1>Stay connected, many more to come.</h1>
      </div>
      <Footer />
    </div>
  );
}
