import React from "react";
import useLoader from "../../Hooks/useLoader";
import Footer from "../../components/Footer";
import GameCard from "../../components/GameCard";

export default function Games() {
  useLoader();
  const cards = [
    {
      title: "Single Player",
      cardText: "Choose this mode to play the game by yourself.",
    },
    {
      title: "Multiplayer",
      cardText: "Choose this mode to play with others.",
    },
    {
      title: "Settings",
      cardText: "Change game settings such as volume and graphics.",
      btnClr: "btn-secondary",
      btnText: "Open Settings",
    },
  ];
  return (
    <div className="mainContent">
      <div className="gradient-bg pt-5">
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h1 className="mb-4">Game Launcher</h1>
              <p className="lead mb-5">
                Choose your game mode and start playing!
              </p>
              <div className="row align-content-lg-stretch w-100">
                {cards.map((card, i) => (
                  <GameCard {...card} key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
