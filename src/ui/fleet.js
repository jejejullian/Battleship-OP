  import { getPlayers, randomizePlayerOne } from "../game/gameController";
  import { renderBoards } from "./board";

  const rotateBtn = document.querySelector("#rotate-btn");
  let isHorizontal = true;

  // Ship Data Constants
  export const SHIP_DATA = [
    { name: "Carrier", length: 5 },
    { name: "Battleship", length: 4 },
    { name: "Cruiser", length: 3 },
    { name: "Submarine", length: 3 },
    { name: "Destroyer", length: 2 },
  ];

  export function renderFleet() {
    const shipDock = document.querySelector("#ship-dock");
    shipDock.innerHTML = "";
    shipDock.style.display = "flex";
    shipDock.style.gap = "1rem";

    // Handle Orientation Styles
    isHorizontal ? (shipDock.style.flexDirection = "column") : (shipDock.style.flexDirection = "row");

    // --- Button Random (MOBILE/TABLET) 📱 ---
    const randomBtn = document.createElement("button");
    randomBtn.textContent = "Acak Posisi Kapal 🎲";

    randomBtn.classList.add(
      "block", "md:hidden",
      "w-full", "mb-4", "p-2",
      "bg-blue-500", "text-white", "font-bold", "rounded"
    );

    randomBtn.addEventListener("click", () => {
      randomizePlayerOne(); 
      renderBoards();     
      renderFleet(); 
    });

    shipDock.appendChild(randomBtn);
    // ---------------------------------------------------

    const { player1 } = getPlayers();
    const placedShips = player1 ? player1.gameboard.ships : [];

    // Create a Copy of SHIP List
    let shipsToRender = [...SHIP_DATA];

    // Filter Out Placed Ships
    placedShips.forEach((placedShips) => {
      const index = shipsToRender.findIndex((s) => s.length === placedShips.length);

      if (index !== -1) {
        shipsToRender.splice(index, 1);
      }
    });

    shipsToRender.forEach((ship) => {
      const divShip = document.createElement("div");
      divShip.classList.add("hidden", "md:block", "bg-gray-400", "mb-2", "cursor-move");
      divShip.id = ship.name;
      divShip.draggable = true;
      divShip.dataset.length = ship.length;

      isHorizontal ? (divShip.style.width = ship.length * 2 + "rem") : (divShip.style.width = 2 + "rem");

      isHorizontal ? (divShip.style.height = 2 + "rem") : (divShip.style.height = ship.length * 2 + "rem");

      divShip.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", divShip.dataset.length);
        e.dataTransfer.setData("ship-id", divShip.id);
        e.dataTransfer.setData("ship-horizontal", isHorizontal);
      });

      shipDock.appendChild(divShip);
    });
  }

  rotateBtn.addEventListener("click", () => {
    isHorizontal = !isHorizontal;
    renderFleet();
  });
