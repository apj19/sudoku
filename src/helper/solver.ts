type log = {
  event: "TRY" | "PLACE" | "BACKTRACK";
  coordinate: number[];
  value: number;
};
function isValid(board: number[][], r: number, c: number, d: number): boolean {
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

  solve(board);
  return event;
}

export function fullBoardValidityCheck(board: number[][]): boolean {
  const rows = Array.from({ length: 9 }, () => new Set<number>());
  const Cols = Array.from({ length: 9 }, () => new Set<number>());
  const box = Array.from({ length: 9 }, () => new Set<number>());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let currentValue = board[r][c];

      if (rows[r].has(currentValue)) {
        return false;
      } else {
        rows[r].add(currentValue);
      }
      //col check

      if (Cols[c].has(currentValue)) {
        return false;
      } else {
        Cols[c].add(currentValue);
      }
      const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      if (box[boxIdx].has(currentValue)) {
        return false;
      } else {
        box[boxIdx].add(currentValue);
      }
    }
  }

  return true;
}

export function boardSolver(newBoard: number[][]): boolean {
  const board = newBoard.map((e) => [...e]);

  function solve(board: number[][]): boolean {
    const n: number = 9;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] == 0) {
          //checking 1-9 digits

          for (let d = 1; d <= 9; d++) {
            // console.log(board[8]);

            if (isValid(board, i, j, d)) {
              //valid digit
              board[i][j] = d;

              if (solve(board)) {
                return true;
              } else {
                board[i][j] = 0;
              }
            }
          }
          return false;
        }
      }
    }

    return true;
  }

  let res = solve(board);

  // console.log(board);

  return res;
}

export function countSolution(inputBoard: number[][]): number {
  const board = inputBoard.map((e) => [...e]);

  let count = 0;

  function solve(row: number, col: number) {
    if (count > 1) {
      return;
    }

    if (row == 9) {
      count++;
      return;
    }

    //instead of loop calculate nest cell
    let nextRow: number = 0;
    let nextCol: number = 0;

    if (col == 8) {
      nextRow = row + 1;
      nextCol = 0;
    } else {
      nextRow = row;
      nextCol = col + 1;
    }

    if (board[row][col] != 0) {
      solve(nextRow, nextCol);
      return;
    }

    for (let d = 1; d <= 9; d++) {
      if (count > 1) break;
      if (isValid(board, row, col, d)) {
        board[row][col] = d;
        solve(nextRow, nextCol);
        board[row][col] = 0;
      }
    }
  }

  solve(0, 0);
  return count;
}
