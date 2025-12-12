export const Gameboard = () => {
  const board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  const missedAttacks = [];
  const ships = [];
  const shots = [];

  return {
    board: board,
    missedAttacks: missedAttacks,
    shots: shots,
    ships: ships,

    placeShip(ship, x, y, isHorizontal) {
      // Boundary Check
      if (isHorizontal) {
        if (y + ship.length > 10) return false;
      } else {
        if (x + ship.length > 10) return false;
      }

      // Collision Check
      for (let i = 0; i < ship.length; i++) {
        if (isHorizontal ? board[x][y + i] !== null : board[x + i][y] !== null) {
          return false;
        }
      }

      // Placement
      for (let i = 0; i < ship.length; i++) {
        isHorizontal ? (board[x][y + i] = ship) : (board[x + i][y] = ship);
      }

      ships.push(ship);
      return true;
    },

    removeShip(x, y) {
      const shipToRemove = this.board[x][y];

      if (shipToRemove === null) {
        return;
      }

      // Clear Ship Reference
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (this.board[i][j] === shipToRemove) {
            this.board[i][j] = null;
          }
        }
      }
    },

    receiveAttack(x, y) {
      // Prevent Duplicates
      const isAlreadyshot = shots.some((shot) => {
        return shot.x === x && shot.y === y;
      });
      if (isAlreadyshot) {
        return;
      } else {
        shots.push({ x: x, y: y });
      }

      // Handle Hit or Miss
      const target = this.board[x][y];
      if (target !== null) {
        target.hit();
      } else {
        missedAttacks.push({ x: x, y: y });
      }
      return target;
    },

    allShipsSunk() {
      return ships.every((ship) => ship.isSunk());
    },

    reset() {
      board.forEach((row) => row.fill(null));
      ships.length = 0;
    },
  };
};
