import React from "react";
import Footer from "./components/Footer";
import octo from "./components/Images/Icon3.png";
export default function About() {
  return (
    <div className="mainContent inAbout">
      <div id="octo">
        <header>
          <div className="container">
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
