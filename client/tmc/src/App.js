import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./pages/Layout";
// import "./static/css/Original.css";
import About from "./pages/About";
import Discussion from "./pages/Discussion";
import MusicTab from "./pages/MusicTab";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import Stories from "./pages/Stories";
import OctoAI from "./pages/OctoAI"
import Games from "./pages/Games"
import PsychExperiment from "./pages/PsychExperiments"
import PlanCode from "./pages/PlanCode"
import IqTest from "./pages/IqTester"
import Themes from "./pages/Themes"
import Img2Webp from "./pages/Img2Webp"
import SignUp from "./pages/SignUp"
import ForgotPass from "./pages/ForgotPass"
import { getCookie } from "./tools/cookies";
import Topic from "./pages/Topic";
import CreatePost from "./pages/CreatePost";
import CreateStory from "./pages/CreateStory";
import Admin from "./pages/Admin";
import AdminPanel from "./pages/AdminPanel";
import "./static/css/Responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// console.log(process.env.REACT_APP_GREET);
require(`./static/css/${getCookie("active-theme")}.css`);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="discuss" >
            <Route index element={<Discussion />} />
            <Route path="topic" element={<Topic />} />
            {/* The above means a post full page */}
            <Route path="create" element={<CreatePost />} />
          </Route>
          <Route path="mellowtunes" element={<MusicTab />} />
          <Route path="explore" element={<Explore />} />
          <Route path="profile" element={<Profile />} />
          <Route path="stories" >
            <Route index element={<Stories />} />
            <Route path="create" element={<CreateStory />} />
          </Route>
          <Route path="sign-up" element={<SignUp />} />
          <Route path="Forgot-Password" element={<ForgotPass />} />
          <Route path="OctoAI" element={<OctoAI />} />
          <Route path="Img2Webp" element={<Img2Webp />} />
          <Route path="Games" element={<Games />} />
          <Route path="PsychExperiments" element={<PsychExperiment />} />
          <Route path="PlanCode" element={<PlanCode />} />
          <Route path="IqTest" element={<IqTest />} />
          <Route path="Themes" element={<Themes />} />
          <Route path="admin">
            <Route index element={<Admin/>}/>
            <Route path="panel" element={<AdminPanel/>}/>
          </Route>
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
