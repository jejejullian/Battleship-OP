import "./style.css";
import { startGame } from "./game/gameController";
import { renderBoards } from "./ui/board";
import { renderFleet } from "./ui/fleet";

const restartBtn = document.querySelector("#restart-btn");
restartBtn.addEventListener("click", () => {
  const gameInfo = document.querySelector("#game-info");

  startGame();
  renderBoards();
  renderFleet();
  gameInfo.textContent = "Prepare your fleet, Commander!";
});

startGame();
renderFleet();
renderBoards();
