import React from "react";
import useLoader from "../../Hooks/useLoader";
import Footer from "../../components/Footer";

export default function Games() {
  useLoader();
  return (
    <div className="mainContent">
      <div className="gradient-bg pt-5">
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <h1 className="mb-4">Game Launcher</h1>
              <p className="lead mb-5">
                Choose your game mode and start playing!
              </p>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="card bg-dark">
                    <div className="card-body">
                      <h5 className="card-title">Single Player</h5>
                      <p className="card-text">
                        Choose this mode to play the game by yourself.
                      </p>
                      <button className="btn btn-primary btn-block">
                        Play
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="card bg-dark">
                    <div className="card-body">
                      <h5 className="card-title">Multiplayer</h5>
                      <p className="card-text">
                        Choose this mode to play with others.
                      </p>
                      <button className="btn btn-primary btn-block">
                        Play
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="card bg-dark">
                    <div className="card-body">
                      <h5 className="card-title">Settings</h5>
                      <p className="card-text">
                        Change game settings such as volume and graphics.
                      </p>
                      <button className="btn btn-secondary btn-block">
                        Open Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
