import { Player } from "./player.js";
import { Ship } from "./ship.js";
import { SHIP_DATA } from "../ui/fleet.js";

let player1;
let player2;
const gameInfo = document.querySelector("#game-info");

function startGame() {
  player1 = Player("human");
  player2 = Player("computer");

  placeComputerShips(player2);
}

function playRound(x, y) {
  if (player1.gameboard.allShipsSunk() || player2.gameboard.allShipsSunk()) {
    return;
  }

  // Player Turn (Turn Chaining)
  const hitResult = player1.attack(player2, x, y);

  const isPlayerHit = hitResult !== null && hitResult !== undefined;

  if (isPlayerHit) {
    if (player2.gameboard.allShipsSunk()) {
      gameInfo.textContent = "GAME OVER! YOU WIN!";
      return;
    }
    return; 
  }

  // Computer Turn (Auto-attack Loop)
  let computerHit = true;
  while (computerHit) {
    const computerAttackResult = player2.randomAttack(player1);

    // Convert to boolean
    computerHit = computerAttackResult !== null && computerAttackResult !== undefined;

    if (player1.gameboard.allShipsSunk()) {
      gameInfo.textContent = "GAME OVER! YOU LOSE!";
      return;
    }
  }
}

function randomizePlayerOne() {
  // Check if the game has started?
  const isGameStarted = player2.gameboard.shots.length > 0 || player2.gameboard.missedAttacks.length > 0;

  if (isGameStarted) {
    alert("🚫 Permainan sedang berlangsung! Anda tidak bisa mengacak kapal.");
    return;
  }

  if (player1) {
    player1.gameboard.reset();
    placeComputerShips(player1);
  }
}

function placeComputerShips(player) {
  SHIP_DATA.forEach((ship) => {
    let isPlaced = false;
    ship = Ship(ship.length);

    // Random Placement Retry Loop
    while (!isPlaced) {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      let isHorizontal = Math.random() > 0.5;

      isPlaced = player.gameboard.placeShip(ship, x, y, isHorizontal);
    }
  });
}

function getPlayers() {
  return { player1, player2 };
}

export { startGame, playRound, randomizePlayerOne, placeComputerShips, getPlayers };
