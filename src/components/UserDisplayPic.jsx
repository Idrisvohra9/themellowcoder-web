import React from "react";

export default function UserDisplayPic({ className, dp }) {
  function handleDPError(e) {
    e.target.src = require("./Images/kraken.png");
  }
  return (
    <img
      src={`${process.env.REACT_APP_SERVER}users/${dp}`}
      alt="User DP"
      className={className}
      onError={handleDPError}
    />
  );
}
