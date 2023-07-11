import React from "react";
import Footer from "../../components/Footer";
import octo from "../../components/Images/Icon3.png";
import useLoader from "../../Hooks/useLoader";
import ScrollSpy from "react-ui-scrollspy";
export default function About() {
  useLoader();
  return (
    <div className="mainContent inAbout mt-2">
      <div id="octo">
        <header>
          <div className="logo-container">
            <img src={octo} alt="Old Logo RIP" className="logo-octo" />
            <span className="text-muted mt-2">Rip Old Octo 2022-2023</span>
          </div>
        </header>
      </div>
      <div className="container">
        <h1>About</h1>
        <div className="row border-top border-light p-3">
          <div className="col-10 border-end border-light scroll-content">
            <ScrollSpy>
              <h2>Intro</h2>
              <section id="idea">
                <h3>The Idea</h3>
              </section>
              <section id="aim">
                <h3>Our Aim</h3>
              </section>
              <section id="team">
                <h3>Our Team</h3>
              </section>
              <section id="license">
                <h3>License</h3>
              </section>
              <section id="tools-used">
                <h3>Tools we used</h3>
              </section>
              <section id="history">
                <h3>Historyof development</h3>
              </section>
              <section id="privacy-policy">
                <h3>Our Privacy Policy</h3>
              </section>
              <section id="start-a-discussion">
                <h3></h3>
              </section>
              <section id="create-story">
                <h3></h3>
              </section>
            </ScrollSpy>
          </div>
          <div className="col-2 scrollspy">
            <h5>Intro</h5>
            <ul>
              <li>
                <a href="#" data-to-scrollspy-id="">
                  Aim/Idea
                </a>
              </li>
            </ul>
            <h5>Tools</h5>
            <ul>
              <li>
                <a href="#" data-to-scrollspy-id="">
                  Aim/Idea
                </a>
              </li>
            </ul>
            <h5></h5>
            <h5>Guides</h5>
            <ul>
              <li>
                <a href="#" data-to-scrollspy-id="">
                  Aim/Idea
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
