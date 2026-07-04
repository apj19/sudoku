import generateNewGame from "@/helper/gameGenerator/shuffleSeed";
import { getDifficultyTarget } from "@/helper/gameGenerator/generateNewGame";
import SEED from "@/helper/seed";
import { fullBoardValidityCheck } from "@/helper/solver";
import { expect, test } from "vitest";

const seed = SEED;
// Array.from({ length: 10 }).forEach((_, i) => {
//   test(`board test ${i + 1} is valid or not`, () => {
//     const board = generateNewGame(seed);
//     // console.table(board);clear

//     expect(fullBoardValidityCheck(board)).toBe(true);
//   });
// });

// test("difficulty in between", () => {
//   let diff = getDifficultyTarget("easy");

//   expect(diff).toBeGreaterThanOrEqual(40);
//   expect(diff).toBeLessThanOrEqual(45);
// });
