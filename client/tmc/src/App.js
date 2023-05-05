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
import PlanCode from "./pages/PlanCode"
import Themes from "./pages/Themes"
import SignUp from "./pages/SignUp"
import ForgotPass from "./pages/ForgotPass"
import { getCookie, setCookie } from "./tools/cookies";
import Topic from "./pages/Topic";
import CreatePost from "./pages/CreatePost";
import CreateStory from "./pages/CreateStory";
import Admin from "./pages/Admin";
import AdminPanel, { Users, Posts, StoriesList } from "./pages/AdminPanel";
import "./static/css/Responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@mdi/font/css/materialdesignicons.min.css";
import { UserContextProvider } from "./UserContext";
import UpdatePost from "./pages/UpdatePost";
import AboutProfile from "./pages/AboutProfile";
import IqTest from './pages/components/IQTest';
import QuizInstructions from './pages/components/quiz/quizinstruction';
import QuizSummary from './pages/components/quiz/QuizSummary';
import Easy from './pages/components/quiz/easy';
import Mode from './pages/components/quiz/mode';
import Hard from './pages/components/quiz/hard';
import Medium from './pages/components/quiz/medium';
if (getCookie("active-theme") === "") {
  setCookie("active-theme", "Original")
}
// setCookie("active-theme", "Original")
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
              <Route path="manage/:username" element={<AboutProfile />} />
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
            <Route path="PlanCode" element={<PlanCode />} />
            <Route path="IqTest" >
              <Route index element={<IqTest />}/>
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
          <Route path="*" element={<NoPage />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter >
  );
}
