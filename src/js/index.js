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
  if (["r", "b", "q"].includes(pieceType)) {
    if ((curX === posX || curY === posY) && pieceType !== "b") {
      const positionRangeY = [curY, posY]
        .sort((a, b) => a - b);
      const positionRangeX = [curX, posX]
        .sort((a, b) => a - b);
      // const numbersBetween = arr.slice(positionRangeY[0] + 1, positionRangeY[1]);

      const numbersBetweenHorVer = curX === posX
        ? arr.slice(positionRangeY[0] + 1, positionRangeY[1])
        : arr.slice(positionRangeX[0] + 1, positionRangeX[1]);
      const positionsBetweenHorVer = [];
      numbersBetweenHorVer.forEach((number) => {
        positionsBetweenHorVer.push(curX === posX
          ? { x: curX, y: number }
          : { x: number, y: curY });
      });
      // eslint-disable-next-line no-restricted-syntax
      for (const position of positionsBetweenHorVer) {
        if (pieces.some((piece) => compareCoords(piece.coordinates, position))) {
          return false;
        }
      }
      if (pieceOnTarget) {
        pieceOnTarget.coordinates = { x: -1, y: -1 };
        return true;
      }
      return true;
    }
    if ((curX !== posX && curY !== posY) && pieceType !== "r") {
      if (Math.abs(curX - posX) === Math.abs(curY - posY)) {
        const positionRangeDiaX = [curX, posX]
          .sort((a, b) => a - b);
        const numbersBetweenDia = arr
          .slice(positionRangeDiaX[0] + 1, positionRangeDiaX[1])
          .sort((a, b) => (curX < posX ? a - b : b - a));
        const positionsBetweenDia = numbersBetweenDia.map((number, i) => {
          const offset = i + 1;
          return { x: number, y: curY > posY ? curY - offset : curY + offset };
        });
        // eslint-disable-next-line no-restricted-syntax
        for (const position of positionsBetweenDia) {
          if (pieces.some((piece) => compareCoords(piece.coordinates, position))) {
            return false;
          }
        }
        if (pieceOnTarget) {
          pieceOnTarget.coordinates = { x: -1, y: -1 };
          return true;
        }
        return true;
      }
      return false;
    }
  }
  if (pieceType === "k") {
    console.log("aa");
    if ((posX === curX || posX === curX + 1 || posX === curX - 1)
      && (posY === curY || posY === curY + 1 || posY === curY - 1)) {
      if (pieceOnTarget) {
        pieceOnTarget.coordinates = { x: -1, y: -1 };
        return true;
      }
      return true;
    }
  }
  if (pieceType === "h") {
    if (((posX === curX + 2 || posX === curX - 2)
      && (posY === curY + 1 || posY === curY - 1))
      || ((posX === curX + 1 || posX === curX - 1)
        && (posY === curY + 2 || posY === curY - 2))) {
      if (pieceOnTarget) {
        pieceOnTarget.coordinates = { x: -1, y: -1 };
        return true;
      };
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
