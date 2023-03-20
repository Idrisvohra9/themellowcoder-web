import React from "react";
import useLoader from "../Hooks/useLoader";
import { getCookie } from "../tools/cookies";

export default function AdminPanel() {
  useLoader();
  if (getCookie("isAdmin") === "true") {
    return (
      <div className="minContent bg-dark p-2">
        <h2>Welcome to admin Panel {getCookie("username")}</h2>
      </div>
    );
  } else {
    <div className="mainContent bg-danger p-2 d-flex justify-content-center align-items-center">
      <h2>Sorry, You are not authorised for this page.</h2>
    </div>;
  }
}
