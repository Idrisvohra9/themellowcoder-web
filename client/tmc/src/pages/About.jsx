import React from "react";
import Footer from "./components/Footer";
import octo from "./components/Images/Icon3.png";
import useLoader from "../Hooks/useLoader";

export default function About() {
  useLoader();
  return (
    <div className="mainContent inAbout">
      <div id="octo">
        <header>
          <div className="logo-container">
            <img src={octo} alt="Old Logo RIP" className="logo-octo" />
          </div>
        </header>
      </div>
      <section id="idea"></section>
      <section id="aim"></section>
      <section id="team"></section>
      <section id="privacy-policy"></section>
      <section id="external-links"></section>
      <Footer />
    </div>
  );
}
