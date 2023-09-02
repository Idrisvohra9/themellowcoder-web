import React from "react";

export default function GameCard({
  title,
  cardText,
  btnClr = "btn-primary",
  btnText = "Play",
}) {
  return (
    <div className="col-lg-4 mb-3 col-sm-12 ">
      <div className="card text-bg-dark">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{cardText}</p>
          <button className={`btn ${btnClr} btn-block w-75`}>{btnText}</button>
        </div>
      </div>
    </div>
  );
}
