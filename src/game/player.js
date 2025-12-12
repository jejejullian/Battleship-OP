import { Gameboard } from "./gameboard.js";

export const Player = (type) => {
  const availableMoves = [];
  // Initialize AI Move Pool
  if (type === "computer") {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        availableMoves.push({ x: x, y: y });
      }
    }
  }
  return {
    type: type,
    gameboard: Gameboard(),
    attack(enemy, x, y) {
      return enemy.gameboard.receiveAttack(x, y);
    },
    randomAttack(enemy) {
      // Pick Random Coordinate
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      const move = availableMoves[randomIndex];

      // Remove from Pool (Prevent Repeats)
      availableMoves.splice(randomIndex, 1);

      return this.attack(enemy, move.x, move.y);
    },
  };
};
