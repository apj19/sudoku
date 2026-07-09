export default function isPositionFilled(
  board: number[][],
  vlaue: number,
): boolean {
  let cnt = 0;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === vlaue) {
        cnt++;
      }
    }
  }

  console.log(vlaue, cnt);

  if (cnt == 9) {
    return true;
  }

  return false;
}
