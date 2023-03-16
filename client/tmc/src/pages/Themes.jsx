import React from "react";
import useLoader from "../Hooks/useLoader";
import { getCookie } from "../tools/cookies";
import Footer from "./components/Footer";
export default function Themes() {
  useLoader();
  return (
    <div className="mainContent">
      <div className="mt-2 ms-3 me-3">
        <div className="d-fex justify-content-between align-items-center">
          <h1>Available Themes</h1>
          {getCookie("cookie-consent") === "false" ? (
            <div>
              Unable to save your theme preferences as you have declined the{" "}
              <span
                onClick={() =>
                  document
                    .querySelector(".cookie-consent")
                    .classList.add("show")
                }
                className="text-info c-point"
              >
                cookie consent
              </span>{" "}
              please click to accept it.
            </div>
          ) : (
            <div>Set the theme that matches your vibe!</div>
          )}
        </div>
        <div className="container">
          <div
            id="carouselExampleCaptions"
            className="carousel slide mt-5"
            data-bs-ride="false"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="" className="d-block w-100" alt="" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>
                    Some representative placeholder content for the first slide.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="" className="d-block w-100" alt="" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>
                    Some representative placeholder content for the second
                    slide.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="" className="d-block w-100" alt="" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>
                    Some representative placeholder content for the third slide.
                  </p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
