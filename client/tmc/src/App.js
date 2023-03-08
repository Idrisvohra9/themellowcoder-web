import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./pages/Layout";
import "./static/css/Original.css";
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
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="discuss" element={<Discussion />} />
          <Route path="mellowtunes" element={<MusicTab />} />
          <Route path="explore" element={<Explore />} />
          <Route path="profile" element={<Profile />} />
          <Route path="stories" element={<Stories />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="Forgot-Password" element={<ForgotPass />} />
          <Route path="OctoAI" element={<OctoAI />} />
          <Route path="Img2Webp" element={<Img2Webp />} />
          <Route path="Games" element={<Games />} />
          <Route path="PsychExperiments" element={<PsychExperiment />} />
          <Route path="PlanCode" element={<PlanCode />} />
          <Route path="IqTest" element={<IqTest />} />
          <Route path="Themes" element={<Themes />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
