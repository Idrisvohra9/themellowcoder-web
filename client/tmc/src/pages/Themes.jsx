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
        <div className="container"></div>
      </div>
      <Footer />
    </div>
  );
}
