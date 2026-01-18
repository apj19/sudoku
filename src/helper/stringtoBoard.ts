export default function converttoBoardArray(puzzle: string) {
  let cnt = 0;

  const game: number[][] = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      game[i][j] = Number(puzzle[cnt]);
      cnt++;
    }
  }

  return game;
}
