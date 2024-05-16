export const isWinner = (gameBoard, currentMove, currentPlayer) => {
  let board = [...gameBoard];
  board[currentMove] = currentPlayer;

  const winLines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];
  for (let i = 0; i < winLines.length; i++) {
    const line = winLines[i];
    const symbols = line.map((i) => board[i]);
    if (symbols.every((i) => i !== 0 && i === symbols[0])) {
      return true;
    }
  }
  return false;
};

export const isDraw = (gameBoard, currentMove, currentPlayer) => {
  let board = [...gameBoard];
  board[currentMove] = currentPlayer;
  return board.every((i) => i !== 0);
};

const getRandomComputerMove = (gameBoard) => {
  let board = [...gameBoard];
  let validMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === 0) {
      validMoves.push(i);
    }
  }
  let rndMove = Math.floor(Math.random() * validMoves.length);
  return validMoves[rndMove];
};

const getPosition = (gameBoard, moveChecks) => {
  for (let check = 0; check < moveChecks.length; check++) {
    for (let i = 0; i < moveChecks[check].max; i += moveChecks[check].step) {
      let series =
        gameBoard[i + moveChecks[check].indexes[0]].toString() +
        gameBoard[i + moveChecks[check].indexes[1]].toString() +
        gameBoard[i + moveChecks[check].indexes[2]].toString() +
        gameBoard[i + moveChecks[check].indexes[3]].toString();
      switch (series) {
        case "1110":
        case "2220":
          return i + moveChecks[check].indexes[3];
        case "1101":
        case "2202":
          return i + moveChecks[check].indexes[2];
        case "1011":
        case "2022":
          return i + moveChecks[check].indexes[1];
        case "0111":
        case "0222":
          return i + moveChecks[check].indexes[0];
        default:
      }
    }
  }
  return -1;
};

export const getComputerMove = (gameBoard) => {
  let moveChecks = [
    // check for vertical wins
    {
      indexes: [0, 4, 8, 12],
      max: 4,
      step: 1,
    },
    // check for horizontal wins
    {
      indexes: [0, 1, 2, 3],
      max: 16,
      step: 4,
    },
    // check for diagonal wins
    {
      indexes: [0, 5, 10, 15],
      max: 16,
      step: 16,
    },
    // check for diagonal wins
    {
      indexes: [3, 6, 9, 12],
      max: 16,
      step: 16,
    },
  ];
  let pos = getPosition(gameBoard, moveChecks);
  if (pos > -1) {
    return pos;
  }
  pos = getRandomComputerMove(gameBoard);
  return pos;
};
