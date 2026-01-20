type log = {
  event: "TRY" | "PLACE" | "BACKTRACK";
  coordinate: number[];
  value: number;
};
export default function solveSudoku(board: number[][], event: log[]): log[] {
  function solve(board: number[][]): boolean {
    const n: number = 9;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] == 0) {
          //checking 1-9 digits

          for (let d = 1; d <= 9; d++) {
            event.push({ event: "TRY", coordinate: [i, j], value: d });
            // console.log(board[8]);

            if (isValid(board, i, j, d)) {
              //valid digit
              board[i][j] = d;
              event.push({ event: "PLACE", coordinate: [i, j], value: d });

              if (solve(board)) {
                return true;
              } else {
                board[i][j] = 0;
                event.push({
                  event: "BACKTRACK",
                  coordinate: [i, j],
                  value: d,
                });
              }
            }
          }
          return false;
        }
      }
    }

    return true;
  }

  function isValid(
    board: number[][],
    r: number,
    c: number,
    d: number
  ): boolean {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] == d || board[i][c] == d) {
        return false;
      }
    }
    /// now in grid

    const startRow = Math.floor(r / 3) * 3;
    const startCol = Math.floor(c / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === d) {
          // Digit already in 3x3 sub-box
          return false;
        }
      }
    }

    return true;
  }

  solve(board);
  return event;
}
