import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./pages/Layout";
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
import AdminPanel, { Users, Posts, StoriesList } from "./pages/AdminPanel";
import "./static/css/Responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { UserContextProvider } from "./UserContext";
// console.log(process.env.REACT_APP_GREET);
import UpdatePost from "./pages/UpdatePost";
import UpdateProfile from "./pages/UpdateProfile";
import AboutProfile from "./pages/AboutProfile";
require(`./static/css/${getCookie("active-theme")}.css`);

export default function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="discuss" >
              <Route index element={<Discussion />} />
              {/* a post full page */}
              <Route path="topic" >
                <Route index element={<Topic />} />
                <Route path="update/:slug" element={<UpdatePost />} />
                <Route path=":slug" exact element={<Topic />} />
                <Route path="*" element={<NoPage />} />
              </Route>
              <Route path="create" element={<CreatePost />} />
            </Route>
            <Route path="mellowtunes" element={<MusicTab />} />
            <Route path="explore" element={<Explore />} />
            <Route path="profile" >
              <Route path=":username" exact element={<Profile />} />
              <Route path="update/:username" element={<UpdateProfile />} />
              <Route path="about/:username" element={<AboutProfile />} />
            </Route>
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
              <Route index element={<Admin />} />
              <Route path="panel/:isAdmin" element={<AdminPanel />}>
                <Route path="Users" element={<Users />} />
                <Route path="storieslist" element={<StoriesList />} />
                <Route path="Posts" element={<Posts />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter >
  );
}
