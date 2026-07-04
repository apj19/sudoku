//this wii generate new game
// interface gameDifficulty {
//   difficulty: "easy" | "medium" | "hard";
// }

import { countSolution } from "../solver";
import { getRandomIndexIncludingEnd } from "./createNewGame";

export function getDifficultyTarget(
  gameDifficulty: "easy" | "medium" | "hard",
) {
  // e--40-45
  //m-46-51
  //h-52-57

  if (gameDifficulty == "easy") {
    return Math.floor(Math.random() * (45 - 40 + 1)) + 40;
  } else if (gameDifficulty == "medium") {
    return Math.floor(Math.random() * (51 - 46 + 1)) + 46;
  } else if (gameDifficulty == "hard") {
    return Math.floor(Math.random() * (57 - 52 + 1)) + 52;
  } else {
    return 46;
  }
}

//we will select first half of board and will calculate its symmetrical  so board looks clean and symmetrical
export function getSymmetricalCoordinate() {
  const coordinate: number[][] = [];

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 9; c++) {
      coordinate.push([r, c]);
    }
  }

  for (let c = 0; c <= 4; c++) {
    coordinate.push([4, c]);
  }

  //   console.log(coordinate);
  // apply fisher yates shuffle
  let tempArray = coordinate.map((e) => [...e]);

  for (let i = tempArray.length - 1; i > 0; i--) {
    let currentIdx = i;
    let randomIdex = getRandomIndexIncludingEnd(i);
    [tempArray[currentIdx], tempArray[randomIdex]] = [
      tempArray[randomIdex],
      tempArray[currentIdx],
    ];
  }

  //   console.log(tempArray);
  return tempArray;
}

// to get other coordinate
function getMirrorCoordinate(row: number, col: number): [number, number] {
  return [8 - row, 8 - col];
}

export function generateNewGame(
  solvedBoard: number[][],
  difficulty: "easy" | "medium" | "hard",
) {
  const board = solvedBoard.map((e) => [...e]);

  const tartCellRemoval = getDifficultyTarget(difficulty);

  const selectShuffledCoordinates = getSymmetricalCoordinate();

  let removedCount = 0;

  //will sect coordinate from array find its mirror and remove 2 cells at atime
  //as it as 41 coordinates and will remove double so will end once we hit target
  // and this will give safety if any coordinate lead infinite will not select that again

  for (let i = 0; i < selectShuffledCoordinates.length; i++) {
    if (removedCount >= tartCellRemoval) {
      break;
    }

    const [r, c] = selectShuffledCoordinates[i];
    const [mirrorR, mirrorC] = getMirrorCoordinate(r, c);

    let isCenter: boolean = false;

    if (r == 4 && c == 4) {
      isCenter = true;
    }

    const cachedCoordinate1 = board[r][c];
    const cachedCoordinate2 = board[mirrorR][mirrorC];

    //remove 2 cell at a time

    board[r][c] = 0;
    board[mirrorR][mirrorC] = 0;

    //unique check
    const solution = countSolution(board);

    //

    if (solution == 1) {
      if (isCenter) {
        removedCount++;
      } else {
        removedCount = removedCount + 2;
      }
    } else {
      board[r][c] = cachedCoordinate1;
      board[mirrorR][mirrorC] = cachedCoordinate2;
    }
  }

  return board;
}
