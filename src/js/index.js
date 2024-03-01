const board = document.querySelector("#gameboard");
const trash = document.querySelector("#trash");

const arr = [0, 1, 2, 3, 4, 5, 6, 7];

const getPosFromDivId = (id) => ({ x: Number(id[1]), y: Number(id[2]) });
const compareCoords = (set1, set2) => set1.x === set2.x && set1.y === set2.y;

const pieces = [
  {
    id: "pw1",
    image: "/pawnWhite.png",
    position: "a2",
    coordinates: {
      x: 0,
      y: 6,
    },
  },
  {
    id: "pw2",
    image: "/pawnWhite.png",
    position: "b2",
    coordinates: {
      x: 1,
      y: 6,
    },
  },
  {
    id: "pw3",
    image: "/pawnWhite.png",
    position: "c2",
    coordinates: {
      x: 2,
      y: 6,
    },
  },
  {
    id: "pw4",
    image: "/pawnWhite.png",
    position: "d2",
    coordinates: {
      x: 3,
      y: 6,
    },
  },
  {
    id: "pw5",
    image: "/pawnWhite.png",
    position: "e2",
    coordinates: {
      x: 4,
      y: 6,
    },
  },
  {
    id: "pw6",
    image: "/pawnWhite.png",
    position: "f2",
    coordinates: {
      x: 5,
      y: 6,
    },
  },
  {
    id: "pw7",
    image: "/pawnWhite.png",
    position: "g2",
    coordinates: {
      x: 6,
      y: 6,
    },
  },
  {
    id: "pw8",
    image: "/pawnWhite.png",
    position: "h2",
    coordinates: {
      x: 7,
      y: 6,
    },
  },
  {
    id: "pb1",
    image: "/pawnBlack.png",
    position: "a7",
    coordinates: {
      x: 0,
      y: 1,
    },
  },
  {
    id: "pb2",
    image: "/pawnBlack.png",
    position: "b7",
    coordinates: {
      x: 1,
      y: 1,
    },
  },
  {
    id: "pb3",
    image: "/pawnBlack.png",
    position: "c7",
    coordinates: {
      x: 2,
      y: 1,
    },
  },
  {
    id: "pb4",
    image: "/pawnBlack.png",
    position: "d7",
    coordinates: {
      x: 3,
      y: 1,
    },
  },
  {
    id: "pb5",
    image: "/pawnBlack.png",
    position: "e7",
    coordinates: {
      x: 4,
      y: 1,
    },
  },
  {
    id: "pb6",
    image: "/pawnBlack.png",
    position: "f7",
    coordinates: {
      x: 5,
      y: 1,
    },
  },
  {
    id: "pb7",
    image: "/pawnBlack.png",
    position: "g7",
    coordinates: {
      x: 6,
      y: 1,
    },
  },
  {
    id: "pb8",
    image: "/pawnBlack.png",
    position: "h7",
    coordinates: {
      x: 7,
      y: 1,
    },
  },
  {
    id: "rw1",
    image: "/rookWhite.png",
    position: "a1",
    coordinates: {
      x: 0,
      y: 7,
    },
  },
  {
    id: "rw2",
    image: "/rookWhite.png",
    position: "h1",
    coordinates: {
      x: 7,
      y: 7,
    },
  },
  {
    id: "rb1",
    image: "/rookBlack.png",
    position: "a8",
    coordinates: {
      x: 0,
      y: 0,
    },
  },
  {
    id: "rb2",
    image: "/rookBlack.png",
    position: "h8",
    coordinates: {
      x: 7,
      y: 0,
    },
  },
  {
    id: "hw1",
    image: "/horseWhite.png",
    position: "b1",
    coordinates: {
      x: 1,
      y: 7,
    },
  },
  {
    id: "hw2",
    image: "/horseWhite.png",
    position: "g1",
    coordinates: {
      x: 6,
      y: 7,
    },
  },
  {
    id: "hb1",
    image: "/horseBlack.png",
    position: "b8",
    coordinates: {
      x: 1,
      y: 0,
    },
  },
  {
    id: "hb2",
    image: "/horseBlack.png",
    position: "g8",
    coordinates: {
      x: 6,
      y: 0,
    },
  },
  {
    id: "bw1",
    image: "/bishopWhite.png",
    position: "c1",
    coordinates: {
      x: 2,
      y: 7,
    },
  },
  {
    id: "bw2",
    image: "/bishopWhite.png",
    position: "f1",
    coordinates: {
      x: 5,
      y: 7,
    },
  },
  {
    id: "bb1",
    image: "/bishopBlack.png",
    position: "c8",
    coordinates: {
      x: 2,
      y: 0,
    },
  },
  {
    id: "bb2",
    image: "/bishopBlack.png",
    position: "f8",
    coordinates: {
      x: 5,
      y: 0,
    },
  },
  {
    id: "qw",
    image: "/queenWhite.png",
    position: "d1",
    coordinates: {
      x: 3,
      y: 7,
    },
  },
  {
    id: "qb",
    image: "/queenBlack.png",
    position: "d8",
    coordinates: {
      x: 3,
      y: 0,
    },
  },
  {
    id: "kw",
    image: "/kingWhite.png",
    position: "e1",
    coordinates: {
      x: 4,
      y: 7,
    },
  },
  {
    id: "kb",
    image: "/kingBlack.png",
    position: "e8",
    coordinates: {
      x: 4,
      y: 0,
    },
  },
];

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
