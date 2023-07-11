import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useLoader from "../../Hooks/useLoader";

function Mode() {
  useLoader();
  return (
    <Fragment>
      <Helmet>
        <title>Quiz - App Mode</title>
      </Helmet>
      <div id="mode">
        <div className="mode-content">
          <h1>Choose Quiz Mode</h1>
          <div className="mode-buttons">
            <Link className="mode-button" to="/IqTest/play/basic">
              Basic
            </Link> <br />

            <Link className="mode-button" to="/IqTest/play/intermediate">
              Intermediate
            </Link> <br />

            <Link className="mode-button" to="/IqTest/play/advanced">
              Advanced
            </Link> <br />

            <Link className="mode-button" to="/IqTest/instructions">
              Back
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Mode;
