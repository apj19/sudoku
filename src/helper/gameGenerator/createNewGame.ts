// const seed: number[][] = [
//   [6, 4, 2, 1, 5, 7, 9, 3, 8],
//   [9, 3, 1, 2, 8, 6, 5, 7, 4],
//   [7, 8, 5, 3, 9, 4, 1, 6, 2],
//   [1, 6, 8, 5, 2, 3, 7, 4, 9],
//   [3, 5, 4, 7, 1, 9, 8, 2, 6],
//   [2, 7, 9, 6, 4, 8, 3, 1, 5],
//   [8, 2, 3, 4, 7, 5, 6, 9, 1],
//   [4, 9, 6, 8, 3, 1, 2, 5, 7],
//   [5, 1, 7, 9, 6, 2, 4, 8, 3],
// ];

export function sum(a: number, b: number) {
  return a + b;
}

function getRandomIndexIncludingEnd(endIndex: number): number {
  return Math.floor(Math.random() * (endIndex + 1));
}

function fisherYatesShuffleArray(array: number[]): number[] {
  let tempArray = [...array];

  for (let i = tempArray.length - 1; i > 0; i--) {
    let currentIdx = i;
    let randomIdex = getRandomIndexIncludingEnd(i);
    [tempArray[currentIdx], tempArray[randomIdex]] = [
      tempArray[randomIdex],
      tempArray[currentIdx],
    ];
  }
  return tempArray;
}

//this will shuffle in place
function shuffleWithinRowBand(seed: number[][]): number[][] {
  const shuffledBoard: number[][] = seed.map((e) => [...e]);

  const rowBand: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  for (let band of rowBand) {
    const shuffledBand: number[] = fisherYatesShuffleArray(band);
    // console.log("row", band, shuffledBand);

    const originalBoard = shuffledBoard.map((e) => [...e]); //copy just 3 roes

    for (let i = 0; i < band.length; i++) {
      let currentIdx = band[i];
      let shuffledIdx = shuffledBand[i];
      shuffledBoard[currentIdx] = originalBoard[shuffledIdx];
    }
  }

  return shuffledBoard;
}

function shuffleWithinColBand(seed: number[][]): number[][] {
  const shuffledBoard: number[][] = seed.map((e) => [...e]);

  const colBand: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  for (let band of colBand) {
    const shuffledBand: number[] = fisherYatesShuffleArray(band);
    // console.log("col", band, shuffledBand);

    const originalBoard: number[][] = shuffledBoard.map((e) => [...e]);

    for (let i = 0; i < band.length; i++) {
      let currentIdx = band[i];
      let shuffledIdx = shuffledBand[i];
      //   shuffledBoard[currentIdx] = originalBoard[shuffledIdx];
      for (let r = 0; r < 9; r++) {
        shuffledBoard[r][currentIdx] = originalBoard[r][shuffledIdx];
      }
    }
  }

  return shuffledBoard;
}

function shuffleRowBand(previousShuffledBoard: number[][]): number[][] {
  const shuffledBoard: number[][] = previousShuffledBoard.map((e) => [...e]);

  const rowBand: number[] = [0, 1, 2];
  const shuffledRowBand: number[] = fisherYatesShuffleArray(rowBand);
  //   console.log("row band mapping", rowBand, shuffledRowBand);
  //creating copy to shuffle
  const originalBoard = shuffledBoard.map((e) => [...e]);

  const bandMapping = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  for (let i = 0; i < rowBand.length; i++) {
    let currentIdx = rowBand[i];
    let shuffledIdx = shuffledRowBand[i];

    let currentBand = bandMapping[currentIdx];
    let shuffledBand = bandMapping[shuffledIdx];

    for (let b = 0; b < 3; b++) {
      shuffledBoard[currentBand[b]] = originalBoard[shuffledBand[b]];
    }
  }

  return shuffledBoard;
}

function shuffleColBand(previousShuffledBoard: number[][]): number[][] {
  const shuffledBoard: number[][] = previousShuffledBoard.map((e) => [...e]);

  const colBand: number[] = [0, 1, 2];
  const shuffledColBand: number[] = fisherYatesShuffleArray(colBand);
  //   console.log("Col band mapping", colBand, shuffledColBand);
  //creating copy to shuffle
  const originalBoard = shuffledBoard.map((e) => [...e]);

  const bandMapping = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  for (let i = 0; i < 3; i++) {
    let currentIdx = colBand[i];
    let shuffledIdx = shuffledColBand[i];

    let currentBand = bandMapping[currentIdx];
    let shuffledBand = bandMapping[shuffledIdx];

    for (let b = 0; b < 3; b++) {
      let currentCol = currentBand[b];
      let shuffledCol = shuffledBand[b];

      for (let r = 0; r < 9; r++) {
        shuffledBoard[r][currentCol] = originalBoard[r][shuffledCol];
      }
    }
  }

  return shuffledBoard;
}

function shuffleDigits(previousShuffledBoard: number[][]): number[][] {
  const shuffledBoard: number[][] = previousShuffledBoard.map((e) => [...e]);

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const shuffledDigits = fisherYatesShuffleArray(digits);
  //   console.log("digit swap", digits, shuffledDigits);
  const digitMap = new Map<number, number>();

  for (let d = 0; d < digits.length; d++) {
    let d1 = digits[d];
    let d2 = shuffledDigits[d];
    digitMap.set(d1, d2);
  }

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let currentValue = shuffledBoard[r][c];
      shuffledBoard[r][c] = digitMap.get(currentValue) || 0;
    }
  }

  return shuffledBoard;
}

export default function generateNewGame(seed: number[][]) {
  const withinRowBand = shuffleWithinRowBand(seed);
  const withinColBand = shuffleWithinColBand(withinRowBand);
  const rowBand = shuffleRowBand(withinColBand);
  const colBand = shuffleColBand(rowBand);
  const digits = shuffleDigits(colBand);

  return digits;
}
