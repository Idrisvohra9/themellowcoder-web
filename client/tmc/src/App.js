import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./pages/Layout";
import "./static/css/Original.css";
import Discussion from "./pages/Discussion";
import MusicTab from "./pages/MusicTab";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import ShortBlog from "./pages/shortBlogs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="discuss" element={<Discussion />} />
          <Route path="mellowtunes" element={<MusicTab />} />
          <Route path="explore" element={<Explore />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shortBlogs" element={<ShortBlog />} />

        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
