function getCandidates(board: number[][], row: number, col: number): number[] {
  const foundNumbers: Set<number> = new Set();
  const candidates: number[] = [];

  //checking row

  for (let r = 0; r < 9; r++) {
    if (board[r][col] != 0) {
      foundNumbers.add(board[r][col]);
    }
  }

  //checking column

  for (let c = 0; c < 9; c++) {
    if (board[row][c] != 0) {
      foundNumbers.add(board[row][c]);
    }
  }

  //checking row col

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] != 0) {
        // Digit already in 3x3 sub-box
        foundNumbers.add(board[i][j]);
      }
    }
  }

  //crating candidates array

  for (let d = 1; d <= 9; d++) {
    if (!foundNumbers.has(d)) {
      candidates.push(d);
    }
  }

  return candidates;
}

export function buildCandidatesMAP(initialBoard: number[][]) {
  const map: Map<string, Set<number>> = new Map<string, Set<number>>();

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (initialBoard[i][j] == 0) {
        let key = `${i}-${j}`;

        let candidates = getCandidates(initialBoard, i, j); //this will return array number

        let candidatesSet = new Set<number>(candidates);

        map.set(key, candidatesSet);
      }
    }
  }

  return map;
}

type cell = {
  x: number;
  y: number;
};

type log = {
  event: "TRY" | "PLACE" | "BACKTRACK";
  coordinate: number[];
  value: number;
};

type solveResult = {
  success: boolean;
  eventLog: log[];
};

export function InitializesQueue(candidateMap: Map<string, Set<number>>) {
  let queue: cell[] = [];

  for (let [key, value] of candidateMap) {
    if (value.size == 1) {
      let currantCell: cell = {
        x: Number(key[0]),
        y: Number(key[2]),
      };

      queue.push(currantCell);
    }
  }

  return queue;
}

function updateNeighbors(
  board: number[][],
  candidateMap: Map<string, Set<number>>,
  queue: cell[],
  currentCell: cell,
  value: number,
) {
  const row = currentCell.x;
  const col = currentCell.y;

  for (let r = 0; r < 9; r++) {
    let currentKey = `${r}-${col}`;

    if (!candidateMap.has(currentKey)) {
      continue;
    }

    if (r == row) {
      //skip
      continue;
    }

    //delete the possibility for this list

    const currentSet = candidateMap.get(currentKey);

    if (currentSet?.has(value)) {
      currentSet.delete(value);
      if (currentSet?.size == 1) {
        let tempCell: cell = {
          x: r,
          y: col,
        };
        queue.push(tempCell);
      }

      if (currentSet?.size == 0) {
        return false;
      }
    }
  }

  for (let c = 0; c < 9; c++) {
    let currentKey = `${row}-${c}`;

    if (!candidateMap.has(currentKey)) {
      continue;
    }

    if (c == col) {
      //skip
      continue;
    }

    //delete the possibility for this list

    const currentSet = candidateMap.get(currentKey);

    if (currentSet?.has(value)) {
      currentSet.delete(value);
      if (currentSet?.size == 1) {
        let tempCell: cell = {
          x: row,
          y: c,
        };
        queue.push(tempCell);
      }

      if (currentSet?.size == 0) {
        return false;
      }
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      let currentKey = `${i}-${j}`;
      if (!candidateMap.has(currentKey)) {
        continue;
      }

      if (i == row && j == col) {
        //skip
        continue;
      }

      //delete the possibility for this list

      const currentSet = candidateMap.get(currentKey);

      if (currentSet?.has(value)) {
        currentSet.delete(value);

        if (currentSet?.size == 1) {
          let tempCell: cell = {
            x: i,
            y: j,
          };

          queue.push(tempCell);
        }

        if (currentSet?.size == 0) {
          return false;
        }
      }
    }
  }

  return true;
}

function propagate(
  board: number[][],
  candidateMap: Map<string, Set<number>>,
  queue: cell[],
  //   stats: SolveStats
  event: log[],
): boolean {
  // const queue: cell[] = InitializesQueue(candidateMap);

  if (queue.length == 0) {
    return true;
  }

  while (queue.length != 0) {
    let cell = queue.pop()!;
    //as this will have only one value
    event.push({ event: "PLACE", coordinate: [cell.x, cell.y], value: 0 });

    let candidates = candidateMap.get(`${cell.x}-${cell.y}`)!;
    let singleValue = [...candidates][0];
    event.push({
      event: "PLACE",
      coordinate: [cell.x, cell.y],
      value: singleValue,
    });

    if (!candidates) continue; //  already processed, skip
    if (candidates.size !== 1) continue; //  no longer naked single, skip

    //placing value to board as it is only one candidate
    board[cell.x][cell.y] = singleValue;

    //as this is filed will remove it from map totally
    candidateMap.delete(`${cell.x}-${cell.y}`);
    // stats.cellsForced++;

    //now updated corresponding candidates from cell row, grid

    const isUpdateNeighborsSuccess = updateNeighbors(
      board,
      candidateMap,
      queue,
      cell,
      singleValue,
    );

    //dead end
    if (!isUpdateNeighborsSuccess) {
      return false;
    }
  }

  return true;
}

function findMrv(candidateMap: Map<string, Set<number>>) {
  let maxSize = 10;
  let cell: cell = { x: 0, y: 0 };

  for (let [k, v] of candidateMap) {
    if (v.size < maxSize) {
      let temp: cell = {
        x: Number(k[0]),
        y: Number(k[2]),
      };
      cell = temp;
      maxSize = v.size;
    }
  }

  return cell;
}

// type SolveStats = {
//   nodesExplored: number;
//   backtracks: number;
//   cellsForced: number;
//   try:number,
//   place:number
// };

export function optimalMRV(
  board: number[][],
  candidateMap: Map<string, Set<number>>,
  event: log[],

  initialQueue?: cell[],
) {
  //   stats.nodesExplored++;
  const queue: cell[] = initialQueue ?? InitializesQueue(candidateMap);

  // console.log("=== optimalMRV called ===");
  // console.log("Queue at start:", queue);
  // console.log("CandidateMap size:", candidateMap.size);

  let flag = propagate(board, candidateMap, queue, event);

  if (!flag) {
    // stats.backtracks++;
    // event.push({
    //         event: "BACKTRACK",
    //         coordinate: [cell.x, cell.y],
    //         value: d,
    //       });
    return false;
  }

  //if board solved
  if (candidateMap.size == 0) {
    return true;
  }

  let cell = findMrv(candidateMap);

  const tryCandidates = [...candidateMap.get(`${cell.x}-${cell.y}`)!];

  for (let d of tryCandidates) {
    // event.push({ event: "TRY", coordinate: [i, j], value: d });
    //place
    let boardCopy = board.map((e) => [...e]);
    let mapCopy: Map<string, Set<number>> = new Map();

    for (let [k, v] of candidateMap) {
      let newV = new Set(v);
      mapCopy.set(k, newV);
    }

    boardCopy[cell.x][cell.y] = d;
    event.push({ event: "TRY", coordinate: [cell.x, cell.y], value: d });
    mapCopy.delete(`${cell.x}-${cell.y}`);
    const nqueue: cell[] = [];
    const ok = updateNeighbors(boardCopy, mapCopy, nqueue, cell, d);
    if (!ok) {
      event.push({
        event: "BACKTRACK",
        coordinate: [cell.x, cell.y],
        value: d,
      });
      //   stats.backtracks++;
      continue;
    }

    if (optimalMRV(boardCopy, mapCopy, event, nqueue)) {
      event.push({ event: "PLACE", coordinate: [cell.x, cell.y], value: d });
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          board[r][c] = boardCopy[r][c];
        }
      }
      return true;
    }
    // stats.backtracks++;
    event.push({
      event: "BACKTRACK",
      coordinate: [cell.x, cell.y],
      value: d,
    });

    // board=boardCopy.map((e)=> [...e]);
    // candidateMap=mapCopy;
  }

  return false;
}

export function sudokuOptimalSolver(
  board: number[][],
  eventLog: log[],
): solveResult {
  //create candidates map
  //initalize queue
  //run the algo

  let map = buildCandidatesMAP(board);
  // let queue=InitializesQueue(map);
  let result = optimalMRV(board, map, eventLog);

  return { success: result, eventLog: eventLog };
}
