export default function gameWonCheck(board: number[][]): boolean {
  let cnt = 0;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == 0) {
        cnt++;
      }
    }
  }

  if (cnt > 0) {
    return false;
  }

  return true;
}
