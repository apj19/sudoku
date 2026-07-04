import generateNewGame, { sum } from "@/helper/gameGenerator/createNewGame";
import { fullBoardValidityCheck } from "@/helper/solver";
import { expect, test } from "vitest";
const seed: number[][] = [
  [6, 4, 2, 1, 5, 7, 9, 3, 8],
  [9, 3, 1, 2, 8, 6, 5, 7, 4],
  [7, 8, 5, 3, 9, 4, 1, 6, 2],
  [1, 6, 8, 5, 2, 3, 7, 4, 9],
  [3, 5, 4, 7, 1, 9, 8, 2, 6],
  [2, 7, 9, 6, 4, 8, 3, 1, 5],
  [8, 2, 3, 4, 7, 5, 6, 9, 1],
  [4, 9, 6, 8, 3, 1, 2, 5, 7],
  [5, 1, 7, 9, 6, 2, 4, 8, 3],
];

// test("adds 1 + 2 to equal 3", () => {
//   expect(sum(1, 2)).toBe(3);

// });

// test(`bord test  is valid or not`, () => {
//   // const board = generateNewGame(seed);

//   expect(fullBoardValidityCheck(seed)).toBe(true);
// });

Array.from({ length: 10 }).forEach((_, i) => {
  test(`board test ${i + 1} is valid or not`, () => {
    const board = generateNewGame(seed);
    // console.table(board);

    expect(fullBoardValidityCheck(board)).toBe(true);
  });
});
