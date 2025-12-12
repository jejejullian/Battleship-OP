import { Ship } from "../game/ship";
import { playRound, getPlayers } from "../game/gameController";
import { renderFleet } from "./fleet";

export function renderBoards() {
  const data = getPlayers();
  renderPlayerBoard(data.player1);
  renderComputerBoard(data.player2);

  const randomBtn = document.getElementById("random-btn");
  const isGameStarted = data.player2.gameboard.shots.length > 0 || data.player2.gameboard.missedAttacks.length > 0;

  if (randomBtn) {
    if (isGameStarted) {
      // Disable Button
      randomBtn.disabled = true;
      randomBtn.textContent = "Game Started 🔒";
      randomBtn.classList.add("opacity-50", "cursor-not-allowed", "bg-gray-600");
      randomBtn.classList.remove("bg-blue-500");
    } else {
      // Enable Button
      randomBtn.disabled = false;
      randomBtn.textContent = "Acak Posisi Kapal 🎲";
      randomBtn.classList.remove("opacity-50", "cursor-not-allowed", "bg-gray-600");
      randomBtn.classList.add("bg-blue-500");
    }
  }
}

function renderPlayerBoard(player) {
  const playerBoard = document.querySelector("#player-board");

  playerBoard.innerHTML = "";
  playerBoard.classList.add("grid", "grid-cols-10", "gap-0.5", "w-full", "max-w-md", "mx-auto");

  const board1 = player.gameboard.board;
  board1.forEach((row, x) => {
    row.forEach((cell, y) => {
      const cellDiv = document.createElement("div");

      cellDiv.classList.add("aspect-square", "w-full", "border", "border-gray-600");

      // Render Ships (Draggable)
      if (cell !== null) {
        cellDiv.classList.add("bg-gray-400", "cursor-move");
        cellDiv.draggable = true;

        cellDiv.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("source", "board");
          e.dataTransfer.setData("oldX", x);
          e.dataTransfer.setData("oldY", y);
          e.dataTransfer.setData("text/plain", cell.length);
        });
      }

      // Render Misses
      const missedAttacks = player.gameboard.missedAttacks;
      const isMiss = missedAttacks.some((shot) => {
        return shot.x === x && shot.y === y;
      });

      if (isMiss) {
        cellDiv.classList.add("bg-cyan-500");
      }

      // Render Hits
      const allShot = player.gameboard.shots;
      const isShot = allShot.some((shot) => {
        return shot.x === x && shot.y === y;
      });

      if (cell !== null && isShot) {
        cellDiv.classList.add("bg-red-600");
      }

      // Handle Drop (Placement/Move)
      cellDiv.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      cellDiv.addEventListener("drop", (e) => {
        const source = e.dataTransfer.getData("source");
        const shipLength = e.dataTransfer.getData("text/plain");
        const newShip = Ship(parseInt(shipLength));
        const isHorizontal = e.dataTransfer.getData("ship-horizontal") === "true";

        // Logic: Move Existing Ship
        if (source === "board") {
          const oldX = parseInt(e.dataTransfer.getData("oldX"));
          const oldY = parseInt(e.dataTransfer.getData("oldY"));
          player.gameboard.removeShip(oldX, oldY);

          const isSuccessful = player.gameboard.placeShip(newShip, x, y, isHorizontal);
          if (!isSuccessful) {
            player.gameboard.placeShip(newShip, oldX, oldY, isHorizontal);
          }
        } else {
          const isSuccessful = player.gameboard.placeShip(newShip, x, y, isHorizontal);

          if (isSuccessful == true) {
            renderFleet();
          }
        }

        renderBoards();
      });

      playerBoard.appendChild(cellDiv);
    });
  });
}

function renderComputerBoard(computer) {
  const computerBoard = document.querySelector("#computer-board");

  computerBoard.innerHTML = "";
  computerBoard.classList.add("grid", "grid-cols-10", "gap-0.5", "w-full", "max-w-md", "mx-auto");

  const board2 = computer.gameboard.board;
  board2.forEach((row, x) => {
    row.forEach((cell, y) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("aspect-square", "w-full", "border", "border-gray-600");

      // Calculate Cell State
      const missedAttacks = computer.gameboard.missedAttacks;
      const isMiss = missedAttacks.some((shot) => shot.x === x && shot.y === y);

      const allShot = computer.gameboard.shots;
      const isShot = allShot.some((shot) => shot.x === x && shot.y === y);

      // Interaction Logic (Attack Trigger)
      if (!isMiss && !isShot) {
        cellDiv.classList.add("cursor-pointer", "hover:bg-gray-700");

        cellDiv.addEventListener("click", () => {
          playRound(x, y);
          renderBoards();
        });
      } else {
        cellDiv.classList.add("cursor-not-allowed");
      }

      // Apply Status Colors
      if (isMiss) {
        cellDiv.classList.add("bg-cyan-500");
      }

      if (cell !== null && isShot) {
        cellDiv.classList.add("bg-red-600");
      }

      computerBoard.appendChild(cellDiv);
    });
  });
}
