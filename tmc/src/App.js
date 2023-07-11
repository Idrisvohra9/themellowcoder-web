import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./pages/Layout";
import About from "./pages/Other/About";
import Discussion from "./pages/Discussion/Discussion";
import MusicTab from "./pages/Other/MusicTab";
import Explore from "./pages/User-Profile/Explore";
import Profile from "./pages/User-Profile/Profile";
import NoPage from "./pages/Other/NoPage";
import Home from "./pages/Home";
import Stories from "./pages/Stories/Stories";
import OctoAI from "./pages/Other/OctoAI"
import Games from "./pages/Other/Games"
import PlanCode from "./pages/PlanCode/PlanCodesMain"
import CreatePlanCode from "./pages/PlanCode/CreatePlanCode"
import PlannedCode from "./pages/PlanCode/PlannedCode";
import Themes from "./pages/Other/Themes"
import SignUp from "./pages/User-Profile/SignUp"
import ForgotPass from "./pages/User-Profile/ForgotPass"
import { getCookie, setCookie } from "./tools/cookies";
import Topic from "./pages/Discussion/Topic";
import CreatePost from "./pages/Discussion/CreatePost";
import CreateStory from "./pages/Stories/CreateStory";
import Admin from "./pages/Admin/Admin";
import AdminPanel, { Users, Posts, StoriesList } from "./pages/Admin/AdminPanel";
import "./static/themes/Responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { UserContextProvider } from "./UserContext";
import UpdatePost from "./pages/Discussion/UpdateTopic";
import ManageProfile from "./pages/User-Profile/ManageProfile";
import IqTest from './pages/IQTester/Modes';
import QuizInstructions from './pages/IQTester/QuizInstructions';
import QuizSummary from './pages/IQTester/QuizSummary';
import Easy from './pages/IQTester/Easy';
import Mode from './pages/IQTester/Modes';
import Hard from './pages/IQTester/Hard';
import Medium from './pages/IQTester/Medium';
if (getCookie("active-theme") === "") {
  setCookie("active-theme", "Original")
}
// setCookie("active-theme", "Original")
require(`./static/themes/${getCookie("active-theme")}.css`);

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
              <Route path="manage/:username" element={<ManageProfile />} />
              <Route path="*" element={<NoPage />} />

            </Route>
            <Route path="stories" >
              <Route index element={<Stories />} />
              <Route path="create" element={<CreateStory />} />
            </Route>
            <Route path="sign-up" element={<SignUp />} />
            <Route path="change-password" element={<ForgotPass />} />
            <Route path="forgot-password" element={<ForgotPass />} />
            <Route path="OctoAI" element={<OctoAI />} />
            <Route path="Games" element={<Games />} />
            <Route path="PlanCodes" >
              <Route index element={<PlanCode />} />
              <Route path="create" element={<CreatePlanCode />} />
              <Route path="*" element={<NoPage />} />
            </Route>
            <Route path="IqTest" >
              <Route index element={<IqTest />} />
              <Route path="instructions" element={<QuizInstructions />} />
              <Route path="modes" element={<Mode />} />
              <Route path="play">
                <Route path="basic" element={<Easy />} />
                <Route path="intermediate" element={<Medium />} />
                <Route path="advanced" element={<Hard />} />
              </Route>
              <Route path="summary" element={<QuizSummary />} />
            </Route>
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
          <Route path="PlanCodes/:id" element={<PlannedCode />} />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter >
  );
}
