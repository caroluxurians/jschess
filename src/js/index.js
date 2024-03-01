import { getPosFromDivId, compareCoords } from "./helperFunctions";
import pieces from "./pieces";

const board = document.querySelector("#gameboard");
const trash = document.querySelector("#trash");

const arr = [0, 1, 2, 3, 4, 5, 6, 7];

let idOfPieceBeingMoved = null;

const clearBoard = () => {
  board.childNodes.forEach((el) => { el.innerHTML = ""; });
  trash.innerHTML = "";
};

const renderPieces = () => {
  pieces.forEach((piece) => {
    const positionDiv = document.getElementById(`d${piece.coordinates.x}${piece.coordinates.y}`);
    const image = document.createElement("img");
    image.setAttribute("src", piece.image);
    image.setAttribute("class", "piece");
    image.setAttribute("id", piece.id);
    if (piece.coordinates.x !== -1 && piece.coordinates.y !== -1) {
      image.style.width = "100%";
      image.style.objectFit = "contain";
      image.setAttribute("draggable", "true");
      image.addEventListener("dragstart", (ev) => {
        idOfPieceBeingMoved = piece.id;
        ev.dataTransfer.setData("image/png", ev.target.id);
      });
      positionDiv.appendChild(image);
    } else {
      trash.appendChild(image);
    }
  });
};

const checkMove = (selectedPiece, possibleNewPosition) => {
  // const pieceType = selectedPiece.id[0];
  // const pieceColor = selectedPiece.id[1];
  // totéž kratší (destrukturalizace):
  const [pieceType, pieceColor] = selectedPiece.id;
  const isPieceBlack = pieceColor === "b";
  const curX = selectedPiece.coordinates.x;
  const curY = selectedPiece.coordinates.y;
  const posX = possibleNewPosition.x;
  const posY = possibleNewPosition.y;
  const pieceOnTarget = pieces
    .find((piece) => compareCoords(piece.coordinates, possibleNewPosition));

  if (pieceType === "p") {
    const direction = isPieceBlack ? -1 : 1;
    if (curX === posX) {
      if (curY === posY + 1 * direction) {
        if (!pieceOnTarget) {
          return true;
        }
      }

      if (curY === (isPieceBlack ? 1 : 6)
        && curY === posY + 2 * direction) {
        if (!pieceOnTarget) {
          return true;
        }
      }
    }
    if (posX + 1 === curX || posX - 1 === curX) {
      if (curY === posY + 1 * direction) {
        if (pieceOnTarget) {
          pieceOnTarget.coordinates = { x: -1, y: -1 };
          return true;
        }
      }
    }
  }
  if (pieceType === "r") {
    if (curX === posX
      || curY === posY) {
      const positionRange = [curY, posY]
        .sort((a, b) => Number(a) - Number(b));
      if (curX === posX) {
        const numbersBetween = arr.slice(positionRange[0] + 1, positionRange[1]);
        console.log(numbersBetween);
        const positionsBetween = [];
        numbersBetween.forEach((number) => {
          positionsBetween.push({ x: curX, y: number });
        });
        console.log(positionsBetween);
        // eslint-disable-next-line no-restricted-syntax
        for (const position of positionsBetween) {
          if (pieces.some((piece) => compareCoords(piece.coordinates, position))) {
            return false;
          }
        }
        if (pieceOnTarget) {
          pieceOnTarget.coordinates = { x: -1, y: -1 };
          return true;
        }
      }
      return true;
    }
  }
  return false;
};

arr.forEach((col) => {
  arr.forEach((row) => {
    const divId = `d${row}${col}`;
    const div = document.createElement("div");
    if ((col + row) % 2 === 1) {
      div.setAttribute("class", "black");
    }
    div.addEventListener("dragenter", (e) => {
      e.preventDefault();
    });
    div.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    div.addEventListener("drop", (e) => {
      const targetDivId = e.target.tagName === "IMG"
        ? e.target.parentElement.id
        : e.target.id;
      const possibleNewPosition = getPosFromDivId(targetDivId);
      const selectedPiece = pieces.find((el) => el.id === idOfPieceBeingMoved);
      const isMoveLegal = checkMove(selectedPiece, possibleNewPosition);
      if (isMoveLegal) {
        selectedPiece.coordinates = possibleNewPosition;
      }
      clearBoard();
      renderPieces();
    });
    div.setAttribute("id", divId);
    board.appendChild(div);
  });
});

renderPieces();
