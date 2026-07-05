import solveSudoku from "@/helper/solver";
import connectedCells, { sameCells } from "@/helper/validationCheck";
import { create, type StateCreator } from "zustand";

//get value    const mainBoard = useGameStore((state) => state.gameBoard);

interface GameBoardSlice {
  gameBoard: number[][];
  initialBoard: number[][];
  solution: number[][];
  setSolution: (solution: number[][]) => void;
  setGameBoard: (newBoard: number[][]) => void;
  updateGameBoardWithCoordinate: (x: number, y: number, value: number) => void;
  setInitialBoard: (newBoard: number[][]) => void;
  startNewGame: (newGame: number[][]) => void;

  updateGameBoard: (x: number, y: number, value: number) => void;
}

interface SelectCellSlice {
  selectedCell: [number, number] | null;
  setSelectedCell: (x: number, y: number) => void;
}

interface HighliteSameCellSlice {
  HighliteSameCell: Set<string>;
  updateHighliteSameCell: (cellValue: number) => void;
}

interface connectCellSlice {
  connectCell: Set<string>;
  updateConnectCell: (x: number, y: number) => void;
}
type log = {
  event: "TRY" | "PLACE" | "BACKTRACK";
  coordinate: number[];
  value: number;
};

interface solverSlice {
  isSolving: boolean;
  speed: number;
  index: number;
  currentActiveCell: log | null;
  eventLog: log[];

  setIsSolving: () => void;
  setSpeed: (newSpeed: number) => void;
  setIndex: (newIdx: number) => void;
  setEventLog: () => void;
  // setCurrentActiveCell: (x: number, y: number) => void;
  nextEvent: () => void;
}

interface mistakeSlice {
  mistakeCount: number;
  updateMistakeCount: () => void;
  maxMistakeCount: number;
  resetMistakeCount: () => void;
}

interface gameDifficultySlice {
  difficulty: "easy" | "medium" | "hard";
  setDifficulty: (getDifficulty: "easy" | "medium" | "hard") => void;
  gameId: number; //this for when game changes it should trigger re render
  incrementGameId: () => void;
}

interface isWrongCellValueSlice {
  isWrongCellValue: [number, number] | null;
  updateIsWrongCellValue: (x: number, y: number) => void;
}

type undoLog = {
  xCoordinate: number;
  yCoordinate: number;
  oldValue: number;
  newValue: number;
};

interface undoSlice {
  undoStack: undoLog[];
  updateUndoStack: (log: undoLog) => void;
  undoAction: () => void;
}

interface TimerSlice {
  timeInSec: number;
  incrementTime: () => void;
  startTimer: boolean;

  timerState: () => void;
}

///Setting only Action Slices

interface EraseActionSlice {
  EraseAction: () => void;
}

type gameStore = GameBoardSlice &
  SelectCellSlice &
  HighliteSameCellSlice &
  connectCellSlice &
  solverSlice &
  gameDifficultySlice &
  isWrongCellValueSlice &
  mistakeSlice &
  undoSlice &
  EraseActionSlice &
  TimerSlice;

type AppSliceCreator<TSlice> = StateCreator<gameStore, [], [], TSlice>;

const createGameBoardSlice: AppSliceCreator<GameBoardSlice> = (set, get) => ({
  gameBoard: [],
  initialBoard: [],
  solution: [],
  setSolution: (solution: number[][]) => set(() => ({ solution: solution })),
  setInitialBoard: (newBoard: number[][]) =>
    set(() => ({ initialBoard: newBoard })),
  setGameBoard: (newBoard: number[][]) => set(() => ({ gameBoard: newBoard })),

  updateGameBoardWithCoordinate: (x: number, y: number, value: number) => {
    const { gameBoard, updateHighliteSameCell, solution } = get();
    const updatedBoard: number[][] = gameBoard.map((e) => [...e]);
    if (updatedBoard[x][y] == value) {
      updatedBoard[x][y] = 0;
      updateHighliteSameCell(0);
    } else {
      updatedBoard[x][y] = value;
      updateHighliteSameCell(value);
    }

    //solution check

    if (solution[x][y] !== value) {
      set((state) => ({
        gameBoard: updatedBoard,
        isWrongCellValue: [x, y] as [number, number],
        mistakeCount: state.mistakeCount + 1,
      }));
    } else {
      set({ gameBoard: updatedBoard, isWrongCellValue: null });
    }
  },

  startNewGame: (newGame: number[][]) => {
    const { setGameBoard } = get();

    // setInitialBoard(newGame); //this will save initial state of board
    //set main game board
    setGameBoard(newGame);
    //default select cell state

    set({
      selectedCell: null,
      HighliteSameCell: new Set(),
      connectCell: new Set(),
      isWrongCellValue: null,
      timeInSec: 0,
      startTimer: true,
    });
  },

  updateGameBoard: (x: number, y: number, value: number) => {
    const { updateGameBoardWithCoordinate, gameBoard, updateUndoStack } = get();

    updateGameBoardWithCoordinate(x, y, value);

    let log: undoLog = {
      xCoordinate: x,
      yCoordinate: y,
      oldValue: gameBoard[x][y],
      newValue: value,
    };

    if (gameBoard[x][y] == value) {
      log.newValue = 0;
    } else {
      log.newValue = value;
    }

    //adding to log
    updateUndoStack(log);
  },
});

const createUndoSlice: AppSliceCreator<undoSlice> = (set, get) => ({
  undoStack: [],
  updateUndoStack: (log: undoLog) => {
    const { undoStack } = get();

    const newStack: undoLog[] = [...undoStack];
    newStack.push(log);

    set({ undoStack: newStack });
  },

  undoAction: () => {
    const {
      undoStack,
      updateGameBoardWithCoordinate,
      updateConnectCell,
      setSelectedCell,
    } = get();

    let currentLog = undoStack.pop();

    if (!currentLog) return;
    // set({ isWrongCellValue: null });

    updateGameBoardWithCoordinate(
      currentLog.xCoordinate,
      currentLog.yCoordinate,
      currentLog.oldValue,
    );

    let updatedLog = [...undoStack];
    updateConnectCell(currentLog.xCoordinate, currentLog.yCoordinate);
    setSelectedCell(currentLog.xCoordinate, currentLog.yCoordinate);

    set((state) => ({
      undoStack: updatedLog,
      isWrongCellValue: null,
      mistakeCount: state.mistakeCount - 1,
    }));
  },
});

const createIsWrongCellValueSlice: AppSliceCreator<isWrongCellValueSlice> = (
  set,
) => ({
  isWrongCellValue: null,
  updateIsWrongCellValue: (x: number, y: number) =>
    set({ isWrongCellValue: [x, y] as [number, number] }),
});

const createSelectCellSlice: AppSliceCreator<SelectCellSlice> = (set) => ({
  selectedCell: null,
  setSelectedCell: (x: number, y: number) =>
    set(() => ({ selectedCell: [x, y] as [number, number] })),
});

const gameDifficultySlice: AppSliceCreator<gameDifficultySlice> = (set) => ({
  difficulty: "easy",
  setDifficulty: (getDifficulty) => {
    set(() => ({ difficulty: getDifficulty }));
  },
  gameId: 0,
  incrementGameId: () => set((state) => ({ gameId: state.gameId + 1 })),
});

const createHighliteSameCellSlice: AppSliceCreator<HighliteSameCellSlice> = (
  set,
) => ({
  HighliteSameCell: new Set(),
  updateHighliteSameCell: (cellValue) =>
    set((state) => ({
      HighliteSameCell:
        cellValue == 0
          ? new Set()
          : new Set(sameCells(state.gameBoard, cellValue)),
    })),
});

const createConnectCellSlice: AppSliceCreator<connectCellSlice> = (set) => ({
  connectCell: new Set(),
  updateConnectCell: (x: number, y: number) =>
    set(() => ({ connectCell: new Set<string>(connectedCells(x, y)) })),
});

// interface solverSlice{
//   isSolving:boolean,
//   speed:number,
//   index:number,
//   currentActiveCell:  [number, number] | null;
//   eventLog:log[],

//   setIsSolving:()=>void,
//   setSpeed:(newSpeed:number)=> void
//   setIndex:(newIdx:number)=> void
//   setEventLog:()=> void
// }

const createSolverSlice: AppSliceCreator<solverSlice> = (set, get) => ({
  isSolving: false,
  speed: 400,
  index: -1,
  currentActiveCell: null,
  eventLog: [],
  setIsSolving: () => set((state) => ({ isSolving: !state.isSolving })),
  setSpeed: (newSpeed: number) => set(() => ({ speed: newSpeed })),
  setIndex: (newIdx: number) => set(() => ({ index: newIdx })),

  setEventLog: () =>
    set((state) => ({
      eventLog: solveSudoku(
        state.gameBoard.map((e) => [...e]),
        [],
      ),
    })),
  // setCurrentActiveCell: (x: number, y: number) =>
  //   set(() => ({ currentActiveCell: [x, y] as [number, number] })),

  nextEvent: () => {
    const { index, eventLog, gameBoard } = get();
    const newIndex = index + 1;

    if (newIndex >= eventLog.length) {
      // console.log(eventLog);
      set({ isSolving: false });
      return;
    }

    const currentEvent = eventLog[newIndex];
    const newBoard = gameBoard.map((e) => [...e]);
    //setting current event value
    const [currX, currY] = currentEvent.coordinate;

    newBoard[currX][currY] = currentEvent.value;

    set({
      gameBoard: newBoard,
      index: newIndex,
      currentActiveCell: currentEvent,
    });
  },
});

const createMistakeSlice: AppSliceCreator<mistakeSlice> = (set) => ({
  mistakeCount: 0,
  maxMistakeCount: 3,
  updateMistakeCount: () => {
    set((state) => ({ mistakeCount: state.mistakeCount + 1 }));
  },
  resetMistakeCount: () => {
    set(() => ({ mistakeCount: 0 }));
  },
});

const createTimerSlice: AppSliceCreator<TimerSlice> = (set) => ({
  timeInSec: 0,
  incrementTime: () => {
    set((state) => ({ timeInSec: state.timeInSec + 1 }));
  },
  startTimer: true,
  timerState: () => {
    set((state) => ({ startTimer: !state.startTimer }));
  },
});

//below are action slices

const createEraseActionSlice: AppSliceCreator<EraseActionSlice> = (
  set,
  get,
) => ({
  EraseAction: () => {
    const { selectedCell, initialBoard, gameBoard, setGameBoard } = get();

    if (!selectedCell) return;

    const [x, y] = selectedCell;

    if (initialBoard[x][y] != 0) return; //default value so return

    if (gameBoard[x][y] == 0) return; //cell is empty

    const newGameBoard = gameBoard.map((e) => [...e]);
    newGameBoard[x][y] = 0;

    setGameBoard(newGameBoard);

    set({
      HighliteSameCell: new Set(),
      isWrongCellValue: null,
    });
  },
});

//here we combine slice
export const useGameStore = create<gameStore>()((...a) => ({
  ...createGameBoardSlice(...a),
  ...createSelectCellSlice(...a),
  ...createHighliteSameCellSlice(...a),
  ...createConnectCellSlice(...a),
  ...createSolverSlice(...a),
  ...gameDifficultySlice(...a),
  ...createIsWrongCellValueSlice(...a),
  ...createMistakeSlice(...a),
  ...createUndoSlice(...a),
  ...createEraseActionSlice(...a),
  ...createTimerSlice(...a),
}));

// updateHighliteCells(new Set(sameCells(updatedBoard, Number(cellValue))));
// gameDifficultySlice;
// createUndoSlice
