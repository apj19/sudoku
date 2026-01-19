export default function connectedCells(row: number, col: number) {
  const cellsArr: string[] = [];

  for (let i = 0; i < 9; i++) {
    //
    cellsArr.push(`${row}${i}`);
    cellsArr.push(`${i}${col}`);
  }

  let rowStart: number = Math.floor(row / 3) * 3;
  let colStart: number = Math.floor(col / 3) * 3;
  for (let i = rowStart; i < rowStart + 3; i++) {
    for (let j = colStart; j < colStart + 3; j++) {
      cellsArr.push(`${i}${j}`);
    }
  }

  return cellsArr;
}

export function sameCells(gameBoard: number[][], cellValue: number) {
  const cellsArr: string[] = [];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (gameBoard[i][j] == cellValue && gameBoard[i][j] != 0) {
        cellsArr.push(`${i}${j}`);
      }
    }
  }

  return cellsArr;
}
